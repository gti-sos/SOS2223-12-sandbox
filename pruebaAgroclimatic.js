//tests en el package.json -> "npx newman run ./tests/backend.json -e ./tests/env/localhost.json"
var express = require("express");
var cool = require("cool-ascii-faces");
//const { request, response } = require("express");
console.log(cool());
// Lab6
var bodyParser = require("body-parser");

var backendA = require('./backendA/index-aml');

var app = express();
var port = process.env.PORT || 12345;

// Inicio API Lab6
app.use(bodyParser.json());

//const BASE_API_URL = "/api/v1";

// Lab7
app.use("/",express.static("./publicAgroclimatic"));



//Lab7
backendA(app);

//var agroclimatic = [];

/*
app.get(BASE_API_URL+"/agroclimatic/loadInitialData", (req, res) => {
    if (agroclimatic.length == 0) {
      agroclimatic.push({
        province: "Sevilla",
        year: 2021,
        maximun_temperature: 37.57,
        minimun_temperature: 18.77,
        medium_temperature: 27.57 
    },{
        province: "Huelva",
        year: 2020,
        maximun_temperature: 36.42,
        minimun_temperature: 17.55,
        medium_temperature: 27.19
    },{
        province: "Sevilla",
        year: 2021,
        maximun_temperature: 36.16,
        minimun_temperature: 18.69,
        medium_temperature: 27.57
    },{
        province: "Huelva",
        year: 2021,
        maximun_temperature: 34.63,
        minimun_temperature: 17.62,
        medium_temperature: 26.11
    },{
        province: "Sevilla",
        year: 2021,
        maximun_temperature: 34.69,
        minimun_temperature: 17.55,
        medium_temperature: 26.05
    },{
        province: "Sevilla",
        year: 2020,
        maximun_temperature: 37.76,
        minimun_temperature: 16.95,
        medium_temperature: 27.23
    },{
        province: "Huelva",
        year: 2021,
        maximun_temperature: 34.68,
        minimun_temperature: 16.62,
        medium_temperature: 25.52
    },{
        province: "Sevilla",
        year: 2020,
        maximun_temperature: 36.56,
        minimun_temperature: 18.5,
        medium_temperature: 27.19
    },{
        province: "Huelva",
        year: 2020,
        maximun_temperature: 37.3,
        minimun_temperature: 18.5,
        medium_temperature: 27.72,
    },{
        province: "Huelva",
        year: 2020,
        maximun_temperature: 37.77,
        minimun_temperature: 18.3,
        medium_temperature: 27.76
    });
      res.json(agroclimatic)
      //res.json('Se han creado ' + datos_random.length + ' datos');
      console.log("Se han creado datos")
    } else {
      res.json('El arreglo ya contiene datos');
      //res.json(datos_random)
      console.log('El arreglo ya contiene datos')
    }
});
*/

// Caritas Lab5
app.get("/faces", (request, response) =>{
    response.send(cool());
    console.log("Nueva carita");
});

app.listen(port);
console.log("Servidor funcionando...");