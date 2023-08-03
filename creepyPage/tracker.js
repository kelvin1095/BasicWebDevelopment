// Browser & OS
// It looks like its possible to track the browser and OS the person is using via navigator.userAgent.

const page = document;
const Browser = document.getElementById("Browser");

const browserOS = navigator.userAgent;
browserOSInfo = `${browserOS}`;
Browser.innerHTML = browserOSInfo;

// Screen Size
const screenSize = document.getElementById("ScreenSize");

const screenX = window.screen.height;
const screenY = window.screen.width;

screenSizeInfo = `${screenX} x ${screenY}`;
screenSize.innerHTML = screenSizeInfo;

// Browser Size

const browserSize = document.getElementById("browserSize");

const updatewebpage = function () {
  var browserX = window.innerHeight;
  var browserY = window.innerWidth;

  var browserSizeInfo = `${browserX} x ${browserY}`;
  browserSize.innerText = browserSizeInfo;
};

updatewebpage();
// window.onresize = updatewebpage;
window.addEventListener("resize", updatewebpage, false);

//  Mouse

const pageX = document.getElementById("x");
const pageY = document.getElementById("y");

const updateMouseDisplay = function (event) {
  pageX.innerText = "The X coordinate of the mouse is: " + event.pageX;
  pageY.innerText = "The Y coordinate of the mouse is: " + event.pageY;
};

page.addEventListener("mousemove", updateMouseDisplay, false);

// Keyboard

const lastKeyPressed = document.getElementById("LastKey");

const updateKeyboardDisplay = function (event) {
  lastKeyPressed.innerText = "The last key pressed was: " + event.key;
};

page.addEventListener("keydown", updateKeyboardDisplay, false);
