const monthName = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getTime = function () {
  const d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth();
  let day = d.getDate();
  let dayOfWeek = d.getDay();
  let hour = d.getHours().toString().padStart(2, "0");
  let minute = d.getMinutes().toString().padStart(2, "0");
  let seconds = d.getSeconds().toString().padStart(2, "0");

  theDate = `${dayName[dayOfWeek]} ${day} ${monthName[month]} ${year}`;
  theTime = `${hour}:${minute}:${seconds}`;

  document.querySelector("#Date").innerHTML = theDate;
  document.querySelector("#Time").innerHTML = theTime;
};

setInterval(getTime, 1000);
