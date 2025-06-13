var randomNumber1 = Math.floor(Math.random() * 6) + 1;
var randomDiceImage = "dice" + randomNumber1 + ".png";
var imageSource = "./images/" + randomDiceImage;
document.querySelector(".img1").setAttribute("src", imageSource);

var randomNumber2 = Math.floor(Math.random() * 6) + 1;
var randomDiceImage1 = "dice" + randomNumber2 + ".png";
var imageSource1 = "./images/" + randomDiceImage1;
document.querySelector(".img2").setAttribute("src", imageSource1);

if (randomNumber1 > randomNumber2) {
  document.querySelector("h1").innerHTML = "🚩 Player 1 Wins!";
} else if (randomNumber2 > randomNumber1) {
  document.querySelector("h1").innerHTML = "Player 2 Wins! 🚩";
} else {
  document.querySelector("h1").innerHTML = "Draw!";
}