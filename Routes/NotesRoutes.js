const express = require("express");
const bodyParser = require("body-parser"); //Middleware for data passing
const client = require("../connection");

const fs = require("fs");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

client.connect();

//Working
router.get("/", (req, res) => {
  client.query(`Select * from note`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    }
    console.log(err);
  });
});

// //Working
router.post("/", (req, res) => {
  //Fetching the data through middleware
  const note = req.body.note;

  console.log(note);

  let insertQuery = `insert into note(id,title,description) values(${note.id},'${note.title}','${note.description}')`;

  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("Insertion is successful");
    } else {
      console.log(err);
    }
  });
});

//Working
// This route is used to update the notes in storage file
router.put("/:id", (req, res) => {
  const updateId = req.params.id; //Fetching the id
  const newNote = req.body.updatedNote; //Fetching the description of frontend code but for rapidAPI VSCODE Extension just use req.body.

  let updateQuery = `update note set title='${newNote.title}', description='${newNote.description}' where id='${updateId}'`;

  client.query(updateQuery, (err, result) => {
    if (!err) {
      res.send("Updated successfully");
    } else {
      console.log(err);
    }
  });
});

//Working
router.delete("/:id", (req, res) => {
  const deleteId = req.params.id; // Fetching the id from the url

  let deleteQuery = `delete from note where id='${deleteId}'`;

  client.query(deleteQuery, (err, result) => {
    if (!err) {
      res.send("Deleted successfully");
    } else {
      console.log(err);
    }
  });
});

//************************ */ WITH FILE SYSTEM /******************************* */
// //Working
// router.get("/", (req, res) => {
//   const getData = JSON.parse(fs.readFileSync("./Storage/NotesDB.json"));
//   res.send(getData);
// });

// //Working
// router.post("/", (req, res) => {
//   //Fetching the data through middleware
//   const data = {
//     id: req.body.id,
//     title: req.body.title,
//     desc: req.body.description,
//   };

//   // Reading data from notesDB Json file
//   const getData = JSON.parse(fs.readFileSync("./Storage/NotesDB.json"));

//   //Storing the new Data into the file
//   let oldNotes = getData.notes;
//   oldNotes.push(data);

//   const finalData = fs.writeFileSync(
//     "./Storage/NotesDB.json",
//     JSON.stringify({ notes: oldNotes }),
//     "utf-8"
//   );

//   res.end();
// });

// //Working
// // This route is used to update the notes in storage file
// router.put("/:id", (req, res) => {
//   const updateId = req.params.id; //Fetching the id
//   const newDesc = req.body.description; //Fetching the description

//   const getData = JSON.parse(fs.readFileSync("./Storage/NotesDB.json"));

//   let oldNotes = getData.notes;

//   const noteIndex = oldNotes.findIndex((note) => note.id == updateId);

//   oldNotes[noteIndex].desc = newDesc;

//   const finalData = fs.writeFileSync(
//     "./Storage/NotesDB.json",
//     JSON.stringify({ notes: oldNotes }),
//     "utf-8"
//   );

//   res.end();
// });

// //Working
// router.delete("/:id", (req, res) => {
//   const deleteId = req.params.id; // Fetching the id from the url

//   const getData = JSON.parse(fs.readFileSync("./Storage/NotesDB.json")); //fetching all the notes from the json file

//   let oldNotes = getData.notes;

//   const noteIndex = oldNotes.findIndex((note) => note.id == deleteId);

//   oldNotes.splice(noteIndex, 1);

//   const finalData = fs.writeFileSync(
//     "./Storage/NotesDB.json",
//     JSON.stringify({ notes: oldNotes }),
//     "utf-8"
//   );

//   res.end();
// });

module.exports = router;
