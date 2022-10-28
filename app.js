const express = require("express");
const cors = require("cors");

const notesRoutes = require("./Routes/NotesRoutes"); //Notes Route

const app = express();

app.use(express.json());

app.use(cors());

app.use("/notes", notesRoutes); //notes routes and its respective handler

app.listen(4000, () => {
  console.log("listening on http://localhost:4000");
});
