const notes = require('express').Router();
const path = require("path");
const { readAppend, readFileData, writeFile } = require('../helpers/fshelpers');
const { v4: uuidv4 } = require('uuid');


notes.get('/', (req, res) => {
  readFileData(path.join(__dirname, '../db/db.json'))
  .then((data) => res.json(JSON.parse(data)))
});


notes.post('/', (req, res) => {

  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAppend(newNote, path.join(__dirname, '../db/db.json'));
    res.json('Note added');
  } 
  
  else {
    res.json('Error in posting Note');
  }

});

notes.get('/:id', (req, res) => {
  const notesId = req.params.id;
  readFileData(path.join(__dirname, '../db/db.json'))
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((notes) => notes.id === notesId);
      return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID');
    });
});

notes.delete('/:id', (req, res) => {
  const notesID = req.params.id;
  
  readFileData(path.join(__dirname, '../db/db.json'))
  .then((data) => JSON.parse(data))
  .then((json) => {
    const result = json.filter((notes) => notes.id !== notesID);

    writeFile(path.join(__dirname, '../db/db.json'), result);
    res.json(`Item has been deleted`);
  });
});


module.exports = notes;
