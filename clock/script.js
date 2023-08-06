const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const meridiem = ["AM", "PM"];

const getTime = function () {
  const d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth();
  var day = d.getDate();
  var dayOfWeek = d.getDay();
  var hour = d.getHours().toString().padStart(2, "0");
  var minute = d.getMinutes().toString().padStart(2, "0");
  var seconds = d.getSeconds().toString().padStart(2, "0");

  theDate = `${dayName[dayOfWeek]} ${day} ${monthName[month]} ${year}`;
  theTime = `${hour % 12 || 12}:${minute}:${seconds} ${meridiem[+(hour >= 12)]}`;

  document.querySelector("#Date").innerHTML = theDate;
  document.querySelector("#Time").innerHTML = theTime;
};

setInterval(getTime, 1000);
