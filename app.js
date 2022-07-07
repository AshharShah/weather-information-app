const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

const https = require("https");
const { urlencoded } = require("express");
var lat;
var long;

// app.get("/", function (req, res) {
//   https.get(url, function (response) {
//     console.log(response.statusCode);
//     response.on("data", function (data) {
//       const weather_data = JSON.parse(data);
//       const temp = weather_data.main.temp;
//       const disc = weather_data.weather[0].description;
//       const icon = weather_data.weather[0].icon;
//       const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
//       res.write(
//         "<h1>The temprature in Japan Shuzenji is " + temp + " degrees.</h1>"
//       );
//       res.write("<p>The weather is: " + disc + " </p>");
//       res.write("<img src=" + imgURL + "></img>");
//     });
//   });
// });

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  lat = req.body.lat;
  long = req.body.long;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    long +
    "&appid=YOUR APP ID";
  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const weather_data = JSON.parse(data);
      console.log(weather_data);
      const temp = weather_data.main.temp;
      const disc = weather_data.weather[0].description;
      const icon = weather_data.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      const city = weather_data.name;
      res.write(
        "<h1>The temprature in " + city + " is " + temp + " degrees.</h1>"
      );
      res.write("<p>The weather is: " + disc + " </p>");
      res.write("<img src=" + imgURL + "></img>");
      res.send();
    });
  });
});

app.listen(port, function () {
  console.log("Running on Port: " + port);
});
