const express = require("express");
const bodyParser = require("body-parser"); //Middleware for data passing
const fs = require("fs");

// const notesRoutes = require("./Routes/NotesRoutes");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


// //Working
app.get("/notes", (req, res) => {
  const getData = JSON.parse(fs.readFileSync("./Storage/NotesDB.json"));
  res.send(getData);
});

//Working
app.post("/notes", (req, res) => {
  //Fetching the data through middleware
  const data = {
    id: req.body.id,
    title: req.body.title,
    desc: req.body.description,
  };

  // Reading data from notesDB Json file
  const getData = JSON.parse(fs.readFileSync("./Storage/NotesDB.json"));

  let oldNotes = getData.notes;
  oldNotes.push(data);

  const finalData = fs.writeFileSync(
    "./Storage/NotesDB.json",
    JSON.stringify({ notes: oldNotes }),
    "utf-8"
  );

  res.end();
});

//Working
app.put("/notes/:id", (req, res) => {

  const updateId = req.params.id; //Fetching the id from URL.

  const newDesc = req.body.description;

  const getData = JSON.parse(fs.readFileSync("./Storage/NotesDB.json"));

  let oldNotes = getData.notes;

  const noteIndex = oldNotes.findIndex((note) => note.id == updateId);

  oldNotes[noteIndex].desc = newDesc;

  const finalData = fs.writeFileSync(
    "./Storage/NotesDB.json",
    JSON.stringify({ notes: oldNotes }),
    "utf-8"
  );

  res.end();
});

//Working
app.delete("/notes/:id", (req, res) => {

  const deleteId = req.params.id; // Fetching the id from the url

  const getData = JSON.parse(fs.readFileSync("./Storage/NotesDB.json")); //fetching all the notes from the json file

  let oldNotes = getData.notes;

  const noteIndex = oldNotes.findIndex((note) => note.id == deleteId);

  oldNotes.splice(noteIndex, 1);

  const finalData = fs.writeFileSync(
    "./Storage/NotesDB.json",
    JSON.stringify({ notes: oldNotes }),
    "utf-8"
  );

  res.end();
});

app.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});
