const express = require("express");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is open on port ${PORT}`);
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./db/public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./db/public/index.html"));
});
