const router = require("express").Router();

router.get("/api/notes", (req, res) => {
  console.log("This worked");
});

router.post("/api/notes", (req, res) => {
  console.log("This also worked");
});

router.delete("/api/notes", (req, res) => {
  console.log("This worked, too");
});

module.export = router;
