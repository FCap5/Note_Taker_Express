const uuid = require("uuid");
const fs = require("fs");
class Notebook {
  constructor(id, title, text) {
    this.id = id;
    this.title = title;
    this.text = text;
  }

  /*   getNotes() {
    router.get("/notes", (req, res) => {
      console.log("hello");
      res.sendFile(
        path.join(__dirname, "..", "db", "db.json"),
        "utf8",
        (err, data) => {
          if (err) throw err;
        }
      );
    });
  } */

  //getNotes()
  //inside of this function, read from the db.json file and display
  //

  //inside of this function, add to the db.json file (appendSync)
  //
  //deleteNotes() {}

  //Inside of this file, delete from the DB json file by ID
  //  /api/notes/:id
}

module.exports = Notebook;
