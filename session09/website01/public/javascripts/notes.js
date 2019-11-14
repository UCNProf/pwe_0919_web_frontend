var notesElm, notecontentElm;

var newnoteClick = e => {
	var request = new Request('/api/notes', {method: 'POST', headers: {'Content-type':'application/json'} , body: '{"title": "New note from JS", "content":"Content from JS"}'});
	fetch(request).then(response => {
		return response.json();
	}).then(result => {
		console.log(result);
	});
};

var noteElmClick = e => {
	e.preventDefault();
	if (e.target.nodeName == 'A') {
		var uuid = e.target.getAttribute('href');
		fetch(`api/notes/${uuid}`).then(response => {
			return response.json();
		}).then(note => {
			console.log(note);
			notecontentElm.innerHTML = note.content;
		});
	}
};



document.addEventListener('DOMContentLoaded', e => {
	document.querySelector('button#newnote').addEventListener('click', newnoteClick);
	notesElm = document.querySelector('ul#notes');
	notecontentElm = document.querySelector('div#notecontent');

	notesElm.addEventListener('click', noteElmClick);
});