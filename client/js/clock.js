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

// const weatherJsonFilePath = "http://reg.bom.gov.au/fwo/IDN60901/IDN60901.94768.json";
// fetch(weatherJsonFilePath)
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error(`Failed to fetch JSON file: ${response.status} ${response.statusText}`);
//     }
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.error("An error occurred while fetching or parsing the JSON file:", error);
//   });

// const sydneyWeather = () => {
//   return new Promise((resolves, rejects) => {
//     const api = "https://cors-anywhere.herokuapp.com/http://reg.bom.gov.au/fwo/IDN60901/IDN60901.94768.json";
//     const request = new XMLHttpRequest();
//     request.open("GET", api);
//     request.onload = () => {
//       if (request.status === 200) {
//         resolves(JSON.parse(request.response));
//       } else {
//         rejects(Error(request.statusText));
//       }
//     };
//     request.onerror = (err) => rejects(err);
//     request.send();
//   });
// };

// sydneyWeather().then(
//   (weatherData) => console.log(weatherData),
//   (err) => console.log(new Error("Can't load weather"))
// );

// const sydneyTime = () => {
//   return new Promise((resolves, rejects) => {
//     const api =
//       "https://cors-anywhere.herokuapp.com/https://www.timeapi.io/api/Time/current/zone?timeZone=Australia/Sydney";
//     const request = new XMLHttpRequest();
//     request.open("GET", api);
//     request.onload = () => {
//       if (request.status === 200) {
//         resolves(JSON.parse(request.response));
//       } else {
//         rejects(Error(request.statusText));
//       }
//     };
//     request.onerror = (err) => rejects(err);
//     request.send();
//   });
// };

// sydneyTime().then(
//   (weatherData) => console.log(weatherData),
//   (err) => console.log(new Error("Can't load time"))
// );

// const sydneyTime = () => {
//   return new Promise((resolves, rejects) => {
//     const api = "http://api.open-notify.org/astros.json";
//     const request = new XMLHttpRequest();
//     request.open("GET", api);
//     request.onload = () => {
//       if (request.status === 200) {
//         resolves(JSON.parse(request.response));
//       } else {
//         rejects(Error(request.statusText));
//       }
//     };
//     request.onerror = (err) => rejects(err);
//     request.send();
//   });
// };

// sydneyTime().then(
//   (weatherData) => console.log(weatherData),
//   (err) => console.log(new Error("Can't load time"))
// );
