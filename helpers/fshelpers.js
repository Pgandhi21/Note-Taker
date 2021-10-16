const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readFileData = util.promisify(fs.readFile);

const writeFile = (filepath, data) =>
  fs.writeFile(filepath, JSON.stringify(data, null, 4), (err) => {
    err ? console.error(err) : console.info(`Data added to Database`);
  });

const readAppend = (newData, filepath) => {
  fs.readFile(filepath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const dbData = JSON.parse(data);
      dbData.push(newData);
      writeFile(filepath, dbData);
    }
  });
};

module.exports = { readFileData, writeFile, readAppend };
