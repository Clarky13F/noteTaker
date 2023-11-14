const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const dbPath = "./db/db.json";

module.exports = function (app) {
  app.get("/api/notes", (req, res) => {
    const fileContents = fs.readFileSync(dbPath, "utf8");
    if (fileContents.length > 0) {
      const notes = JSON.parse(fileContents);
      res.json(notes);
    } else {
      res.json("[]")
    }
  });

  app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    const fileContents = fs.readFileSync(dbPath, "utf8");
    if (fileContents.length == 0) {
      fs.writeFileSync(dbPath, "[]");
    }
    const notes = JSON.parse(fs.readFileSync(dbPath, "utf8"));
    newNote.id = uuidv4();
    notes.push(newNote);
    fs.writeFileSync(dbPath, JSON.stringify(notes));
    res.json(newNote);
  });

  app.delete("/api/notes/:id", (req, res) => {
    const noteId = req.params.id;
    const notes = JSON.parse(fs.readFileSync(dbPath, "utf8"));
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    fs.writeFileSync(dbPath, JSON.stringify(updatedNotes));
    res.json({ message: "Note deleted" });
  });
};
