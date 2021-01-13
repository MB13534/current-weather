const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const https = require("https");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const city = req.body.city;
  const units = req.body.units;
  const id = "887492552845e66575d053eda04068d3";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    id +
    "&units=" +
    units;

  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;

      res.set("Content-Type", "text/html");
      res.write(
        "The temp in " + city + " is: " + temp + "\nIt is: " + description
      );
      res.send();
    });
  });
});

app.listen(port, function () {
  console.log("Our app is running on http://localhost:" + port);
});
