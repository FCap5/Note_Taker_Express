const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const Notebook = require("../db/Notebook");
const json = require("../db/db");

//render notes on page load (when .get on /notes is called)
router.get("/notes", (req, res) => {
  //send json file
  //index.js handles if file is empty
  return res.sendFile(
    path.join(__dirname, "..", "db", "db.json"),
    "utf8",
    (err, data) => {
      if (err) throw err;
    }
  );
});

//when post method called, create new instane of class Notebook
router.post("/notes", (req, res) => {
  //set id to UUID to generate ID
  const Note = new Notebook(uuid.v4(), req.body.title, req.body.text);
  //push new note to json array
  json.push(Note);

  //create new file with stringified json array and return
  fs.writeFile("./db/db.json", JSON.stringify(json), (err) => {
    if (err) throw err;
  });
  res.send(json);
});

//when delete method called
//identify by ID
router.delete("/notes/:id", (req, res) => {
  //loop through objects in JSON
  json.forEach((note) => {
    //if id provided matches id of note
    if (req.params.id === note.id) {
      //get index of note
      const index = note.id;
      //delete that note from json
      json.splice(index, 1);
    }
  });
  //write over previously existing db.json with new stringified json array
  fs.writeFile("./db/db.json", JSON.stringify(json), (err) => {
    if (err) throw err;
  });
  res.send(json);
});

module.exports = router;
