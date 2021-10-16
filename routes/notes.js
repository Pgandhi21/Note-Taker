const notes = require('express').Router();
const path = require("path");
const { readAppend, readFileData } = require('../helpers/fshelpers');
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

module.exports = notes;
