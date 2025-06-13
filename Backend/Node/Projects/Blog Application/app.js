const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

// Set up EJS as view engine
app.set("view engine", "ejs");

// Serve static files (like CSS)
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory data
let posts = [];
let idCounter = 1;

// Home Page
app.get("/", (req, res) => {
  res.render("home", { posts });
});

// Compose Page
app.get("/compose", (req, res) => {
  res.render("compose");
});

// Handle New Post Submission
app.post("/compose", (req, res) => {
  const post = {
    id: idCounter++,
    title: req.body.title,
    content: req.body.content,
  };
  posts.push(post);
  res.redirect("/");
});

// Edit Post Page
app.get("/edit/:id", (req, res) => {
  const post = posts.find((p) => p.id == req.params.id);
  if (post) {
    res.render("edit", { post });
  } else {
    res.redirect("/");
  }
});

// Handle Edited Post Submission
app.post("/edit/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id == req.params.id);
  if (index !== -1) {
    posts[index].title = req.body.title;
    posts[index].content = req.body.content;
  }
  res.redirect("/");
});

// Handle Delete Post
app.post("/delete/:id", (req, res) => {
  posts = posts.filter((p) => p.id != req.params.id);
  res.redirect("/");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
