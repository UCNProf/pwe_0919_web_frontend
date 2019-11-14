// Global variables
var notesElm, notecontentElm, notetitleElm, statusMessageElm;
var currentNote;

var sendRequest = request => {
	fetch(request).then(response => {
		return response.json();
	}).then(result => {
		let event = new CustomEvent(request.eventName, {detail: result});
		document.dispatchEvent(event);
	});
};

/* ----- CRUD start ----- */

var readNote = uuid => {
	let request = new Request(`/api/notes/${uuid}`, {method: 'GET'});
	request.eventName = 'readNote';
	sendRequest(request);
};

var createNote = note => {
	let request = new Request('/api/notes', {method: 'POST', headers: {'Content-type':'application/json'} , body: JSON.stringify(note) });
	request.eventName = 'createNote';
	sendRequest(request);
};

var updateNote = note => {
	let request = new Request(`/api/notes/${note.uuid}`, {method: 'PUT', headers: {'Content-type':'application/json'} , body: JSON.stringify(note) });
	request.eventName = 'updateNote';
	sendRequest(request);
};

var deleteNote = uuid => {
	let request = new Request(`/api/notes/${uuid}`, {method: 'DELETE'});
	request.eventName = 'deleteNote';
	sendRequest(request);
};

/* ----- CRUD end ----- */

/* ----- UI actions start ----- */

var newnoteClick = e => {
	currentNote = {};
	notetitleElm.innerText = '';
	notecontentElm.innerHTML = '';
};

var savenoteClick = e => {
	currentNote.title = notetitleElm.innerText;
	currentNote.content = notecontentElm.innerHTML;
	if(currentNote.uuid) {
		updateNote(currentNote);
	} else {
		createNote(currentNote);
	}
};

var noteElmClick = e => {
	e.preventDefault();
	if (e.target.nodeName == 'A') {
		var uuid = e.target.getAttribute('href');
		switch(e.target.rel){
			case 'readNote':
				readNote(uuid);
				break;
			case 'deleteNote':
				deleteNote(uuid);
				break;
		}
	}
};
/* ----- UI actions end ----- */

/* ----- update UI start ----- */

var updateUiNote = e => {
	let note = e.detail.note;
	notetitleElm.innerText = note.title;
	notecontentElm.innerHTML = note.content;
};

var updateUiNoteList = e => {
	let uuid = e.detail.note.uuid;
	notesElm.querySelectorAll('li').forEach(li => {li.classList.remove('current');});
	notesElm.querySelector(`li[data-uuid='${uuid}']`).classList.add('current');
};

var updateUiRemoveNoteList = e => {
	let uuid = e.detail.uuid;
	notesElm.querySelector(`li[data-uuid='${uuid}']`).innerHTML = '';
};

var updateUicreateNote = e => {
	let note = e.detail.note;
	notesElm.innerHTML += `<li data-uuid="${note.uuid}"><a href="${note.uuid}" rel="readNote">${note.title}</a><a href="${note.uuid}" rel="deleteNote">x</a></li>`;
};

var updateUiStatusMessage = e => {
	statusMessageElm.innerText = e.detail.status;
	statusMessageElm.classList.add('highlight');
	setTimeout(() => {statusMessageElm.classList.remove('highlight');}, 2000);
};
/* ----- update UI end ----- */

/* update the "state" of the application */
var updateCurrentNote = e => {
	currentNote = e.detail.note;
};


document.addEventListener('DOMContentLoaded', e => {
	// menu button actions
	document.querySelector('button#newnote').addEventListener('click', newnoteClick);
	document.querySelector('button#savenote').addEventListener('click', savenoteClick);

	// global elements
	notesElm = document.querySelector('ul#notes');
	notetitleElm = document.querySelector('div#notetitle');
	notecontentElm = document.querySelector('div#notecontent');
	statusMessageElm = document.querySelector('div#statusmessage');

	notesElm.addEventListener('click', noteElmClick);

	// eventlisteners
	document.addEventListener('readNote', updateUiNote);
	document.addEventListener('readNote', updateUiNoteList);
	document.addEventListener('readNote', updateCurrentNote);

	document.addEventListener('createNote', updateUicreateNote);
	document.addEventListener('createNote', updateUiNoteList);
	document.addEventListener('createNote', updateCurrentNote);
	document.addEventListener('createNote', updateUiStatusMessage);

	document.addEventListener('updateNote', updateUiStatusMessage);
	
	document.addEventListener('deleteNote', updateUiStatusMessage);
	document.addEventListener('deleteNote', updateUiRemoveNoteList);
});