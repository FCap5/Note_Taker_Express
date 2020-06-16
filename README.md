# Note_Taker_Express

## Getting Comfortable with Node and Express

For this homework assignment, we were provided the front end code. The assignment was to create clean backend code to handle the GET, POST, and DELETE ajax calls from the front end javascript. This was our first assignment where we weren't provided any backend starter code. Personally, I felt that I learned a lot more working on this assignment than the previous homework assignment.

## Routing

The first step for this homework was laying out my routes. First I built my folder structure. I had my public folder, which encompassed all of the provided front-end code. Next I built a routes folder, for my apiRoutes.js and htmlRoutes.js folders. These to files would handle the ajax requests and url requests respectively. I then created a db "database" folder for my json data.

With the structure built out, I turned to my server.js file. With my folder structure in place, this file was fairly straightforward:

```
app.use(express.static("db/public"));

const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);
```

These five lines of code handled the my routes.

## HTML Routes

I started working on this code in my server.js file, which I found was an easier way to check my code as I worked. I could isolate if my code was working, without having to worry if I had handled my route properly. I should have done this with my apiRoutes, too. But, I didn't and, as I'll explain later, it cost me a lot of time over some seriouslly silly syntax errors.

There were only two routes I needed to handle, which made life pretty easy. Express's router middleware is pretty useful!

```
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
```

## API Routes

I'll start by saying that I wasted about 45 minutes on these routes because istead of typing module.exportS, I made it singular and it broke the code. It was a nerve-wracking time for me. But it was a period of personal growth and exploration. I file that under the category of "Mistakes I'll Never Make Again."

The actual functionality of these routes was much more difficult than the html routes. I started by creating a class to handle note submissions.

Next, I addressed the get request. Because the front-end js handled the validation for whether or not there were notes saved in the DB, all I needed to do was send the db to the frontend.

```
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
```

The post method was similar. I took the req data and created a new instance of the Notebook class and assigned the ID with uuid, which automatically assigns a unique ID. I then pushed that obejct to an array, stringified it, and used fs.writeFile to overwrite the previous db file with the new data.

```
router.post("/notes", (req, res) => {
  //set id to UUID to generate ID
  const Note = new Notebook(uuid.v4(), req.body.title, req.body.text);
  //push new note to json array
  json.push(Note);

  //create new file with stringified json array and return
  return fs.writeFile("./db/db.json", JSON.stringify(json), (err) => {
    if (err) throw err;
  });
});
```

The delete request was the most difficult of the three. I had to take the ID parameter from the front-end, then loop through the db to see if the ID parameter provided matched one in the database. If so, I spliced it out and returned a new db file to the front-end.

```
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
});
```

## Not quite finished

There is still one persisting issue I need to resolve. The app isn't auto-refreshing after each click event. This is to say that, to show the changes, such as add note or delete note, only show up if I manually refresh the page. Once that's corrected, this app should be fully functional.
