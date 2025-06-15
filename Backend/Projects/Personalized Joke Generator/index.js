const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Home page route
app.get("/", (req, res) => {
  res.render("home");
});

// Joke fetch route
app.post("/joke", async (req, res) => {
  const userName = req.body.name;

  try {
    const response = await axios.get("https://v2.jokeapi.dev/joke/Any?type=single");
    const joke = response.data.joke;

    res.render("joke", { name: userName, joke });
  } catch (error) {
    console.error(error.message);
    res.render("joke", {
      name: userName,
      joke: "Oops! Couldn't fetch a joke at the moment. Please try again later.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Personalized Joke Generator is running at http://localhost:${PORT}`);
});
