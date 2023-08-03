const randomColour = function () {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

// Box 1

const box1 = document.getElementById("Box1");

function changeColourBox1() {
  console.log("mouse was clicked in Box1!");
  box1.style.backgroundColor = randomColour();
  // if (box1.style.backgroundColor === "greenyellow") {
  //   box1.style.backgroundColor = "";
  // } else {
  //   box1.style.backgroundColor = "greenyellow";
  // }
}

box1.addEventListener("click", changeColourBox1, false);

// Box 2

const box2 = document.getElementById("Box2");

function changeColourBox2() {
  console.log("mouse was double clicked in Box2!");
  box2.style.backgroundColor = randomColour();
}

box2.addEventListener("dblclick", changeColourBox2, false);

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

// Box 4

const box4 = document.getElementById("Box4");

function mouseDownColourBox4() {
  console.log("mouse pressed in Box4!");
  box4.style.backgroundColor = randomColour();
}

function mouseUpColourBox4() {
  console.log("mouse released in Box4!");
  box4.style.backgroundColor = randomColour();
}

box4.addEventListener("mousedown", mouseDownColourBox4, false);
box4.addEventListener("mouseup", mouseUpColourBox4, false);

// Box 5

const box5 = document.getElementById("Box5");

function mouseOverColourBox5() {
  console.log("mouse over in Box5!");
  box5.style.backgroundColor = randomColour();
}

box5.addEventListener("mouseover", mouseOverColourBox5, false);
