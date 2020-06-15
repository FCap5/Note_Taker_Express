const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const Notebook = require("../db/Notebook");
const json = require("../db/db");

//const Notebook = require("./db/Notebook");
//require class file to use functions

router.get("/notes", (req, res) => {
  return res.sendFile(
    path.join(__dirname, "..", "db", "db.json"),
    "utf8",
    (err, data) => {
      if (err) throw err;
    }
  );
});

router.post("/notes", (req, res) => {
  const Note = new Notebook(uuid.v4(), req.body.title, req.body.text);
  json.push(Note);
  const jsonString = JSON.stringify(json);
  return fs.writeFile("./db/db.json", jsonString, (err) => {
    if (err) throw err;
  });
});

router.delete("/notes/:id", (req, res) => {
  json.forEach((note) => {
    if (req.params.id === note.id) {
      const index = json.findIndex((ind) => ind.id === req.params.id);
      json.splice(index, 1);
    }
  });
  console.log(json);
  fs.writeFileSync("./db/db.json", "", (err) => {
    if (err) throw err;
  });
  fs.writeFileSync("./db/db.json", JSON.stringify(json), (err) => {
    if (err) throw err;
  });
});
module.exports = router;
