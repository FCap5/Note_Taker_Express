const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = 8080;

const apiNotes = require("./routes/notes");
const htmlRoutes = require("./routes/htmlRoutes");

//app.use("api/notes", apiNotes);
app.use("/", htmlRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening at port http://localhost:${PORT}`);
});
