const randomColour = function () {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

const page = document;
const pageX = document.getElementById("x");
const pageY = document.getElementById("y");

function updateDisplay(event) {
  pageX.innerText = "The X coordinate of the mouse is: " + event.pageX;
  pageY.innerText = "The Y coordinate of the mouse is: " + event.pageY;
  // console.log("X: " + event.pageX);
  // console.log("Y: " + event.pageY);
}

page.addEventListener("mousemove", updateDisplay, false);

const box1 = document.getElementById("Box1");
function changeColourBox1() {
  console.log("mouse was clicked in Box1!");
  if (box1.style.backgroundColor === "greenyellow") {
    box1.style.backgroundColor = "";
  } else {
    box1.style.backgroundColor = "greenyellow";
  }
}

box1.addEventListener("click", changeColourBox1, false);

// The hover effect disappears once clicked on, I think the work around is the use the mouseenter and mouseleave events

const box2 = document.getElementById("Box2");
function changeColourBox1() {
  console.log("mouse was clicked in Box2!");
  if (box2.style.backgroundColor === "") {
    box2.style.backgroundColor = randomColour();
  } else {
    box2.style.backgroundColor = "";
  }
}

box2.addEventListener("click", changeColourBox1, false);
