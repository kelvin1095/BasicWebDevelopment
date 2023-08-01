const randomColour = function () {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

//  Mouse

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

// Box 1

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

// Box 2

const box2 = document.getElementById("Box2");

function changeColourBox2() {
  console.log("mouse was clicked in Box2!");
  box2.style.backgroundColor = randomColour();
}

function resetColourBox2() {
  console.log("mouse was double clicked in Box2!");
  box2.style.backgroundColor = "";
}

box2.addEventListener("click", changeColourBox2, false);
box2.addEventListener("dblclick", resetColourBox2, false);

// Box 3

const box3 = document.getElementById("Box3");

function mouseEnterColourBox3() {
  console.log("mouse entered Box3!");
  box3.style.backgroundColor = randomColour();
}

function mouseExitColourBox3() {
  console.log("mouse exited Box3!");
  box3.style.backgroundColor = randomColour();
}

box3.addEventListener("mouseenter", mouseEnterColourBox3, false);
box3.addEventListener("mouseleave", mouseExitColourBox3, false);
