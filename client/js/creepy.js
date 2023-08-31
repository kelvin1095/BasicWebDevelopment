// Browser & OS
// It looks like its possible to track the browser and OS the person is using via navigator.userAgent.

const page = document;
const Browser = document.getElementById("Browser");

const browserOS = navigator.userAgent;
const browserOSInfo = `${browserOS}`;
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
  var browserInX = window.innerHeight;
  var browserInY = window.innerWidth;
  var browserOutX = window.outerHeight;
  var browserOutY = window.outerWidth;

  var browserSizeInfo = `
  Outer Browser Size: ${browserOutX} x ${browserOutY}
  Inner Browser Size: ${browserInX} x ${browserInY}
  `;
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

// Other stuff browsers can track

console.log("How many touch points does your device support?", navigator.maxTouchPoints);
console.log("How many threads does your device have?", navigator.hardwareConcurrency);
console.log("What is your main UI language?", navigator.language);

console.log("How many pixels from left of main screen?", window.screenLeft);
console.log("How many pixels from top of main screen?", window.screenTop);
console.log("value scroll in x direction", window.scrollX);
console.log("value scroll in y direction", window.scrollY);

console.log("Device Pixel Ratio", window.devicePixelRatio);
console.log("Timezone:", Intl.DateTimeFormat().resolvedOptions().timeZone);

console.log("Dark mode detector", window.matchMedia("(prefers-color-scheme: dark)").matches);
