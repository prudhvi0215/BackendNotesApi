const express = require("express");
const bodyParser = require("body-parser"); //Middleware for data passing
const fs = require("fs");

console.log(bodyParser);

const router = express.Router();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

//Working
router.get("/", (req, res) => {
  const getData = JSON.parse(fs.readFileSync("../Storage/NotesDB.json"));
  res.send(getData);
});

//Working
router.post("/", (req, res) => {
  //Fetching the data through middleware
  const data = {
    id: req.body.id,
    title: req.body.title,
    desc: req.body.description,
  };

  // Reading data from notesDB Json file
  const getData = JSON.parse(fs.readFileSync("../Storage/NotesDB.json"));

  //Storing the new Data into the file
  let oldNotes = getData.notes;
  oldNotes.push(data);

  const finalData = fs.writeFileSync(
    "../Storage/NotesDB.json",
    JSON.stringify({ notes: oldNotes }),
    "utf-8"
  );

  res.end();
});

//Working
// This route is used to update the notes in storage file
router.put("/:id", (req, res) => {
  const updateId = req.params.id; //Fetching the id
  const newDesc = req.body.description; //Fetching the description

  const getData = JSON.parse(fs.readFileSync("../Storage/NotesDB.json"));

  let oldNotes = getData.notes;

  const noteIndex = oldNotes.findIndex((note) => note.id == updateId);

  oldNotes[noteIndex].desc = newDesc;

  const finalData = fs.writeFileSync(
    "../Storage/NotesDB.json",
    JSON.stringify({ notes: oldNotes }),
    "utf-8"
  );

  res.end();
});

//Working
router.delete("/:id", (req, res) => {
  const deleteId = req.params.id; // Fetching the id from the url

  const getData = JSON.parse(fs.readFileSync("../Storage/NotesDB.json")); //fetching all the notes from the json file

  let oldNotes = getData.notes;

  const noteIndex = oldNotes.findIndex((note) => note.id == deleteId);

  oldNotes.splice(noteIndex, 1);

  const finalData = fs.writeFileSync(
    "../Storage/NotesDB.json",
    JSON.stringify({ notes: oldNotes }),
    "utf-8"
  );

  res.end();
});

module.exports = router;
