const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.use(express.static("db/public"));

const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");

/* app.get("/api/notes", (req, res) => {
  console.log("hello");
  res.sendFile(__dirname + "/db/db.json", "utf8", (err, data) => {
    if (err) throw err;
  });
}); */

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening at port http://localhost:${PORT}`);
});
