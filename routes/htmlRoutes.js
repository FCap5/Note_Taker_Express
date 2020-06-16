const router = require("express").Router();
const path = require("path");

//handle url notes
router.get("/notes", (req, res) => {
  const fileName = path.join(__dirname, "../db/public/notes.html");
  return res.sendFile(fileName);
});

//handle al other urls
router.get("*", (req, res) => {
  const filePath = path.join(__dirname, "../db/public/index.html");
  return res.sendFile(filePath);
});

module.exports = router;
