const router = require("express").Router();
const path = require("path");

router.get("/notes", (req, res) => {
  const fileName = path.join(__dirname, "../db/public/notes.html");
  res.sendFile(fileName);
});

router.get("*", (req, res) => {
  const filePath = path.join(__dirname, "../db/public/index.html");
  res.sendFile(filePath);
});

module.exports = router;
