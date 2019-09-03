const fs = require("fs");
const YAML = require("yamljs");

// get data
let data = YAML.load('data.yaml');

console.log(data);

// save data
let json_data = JSON.stringify(data);

fs.writeFile('data.json', json_data, (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});

/*
fs.readFile('data.yaml', 'utf-8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
*/