var express = require("express");
var port = process.env.PORT || 12345;
var app = express();

// Lab6
var bodyParser = require("body-parser");

var cool = require("cool-ascii-faces");
console.log(cool());

// Inicio API Lab6
app.use(bodyParser.json());

var agroclimatic = [
    {
        province: "Sevilla",
        zone: "Los Palacios y Villafranca",
        date: "04/07/2021",
        maximun_temperature: 37.57,
        minimun_temperature: 18.77,
        medium_temperature: 27.57,
        maximun_humidity: 80.3,
        minimun_humidity: 21.45,
        medium_humidity: 52.3
    },
    {
        province: "Sevilla",
        zone: "Los Palacios y Villafranca",
        date: "05/07/2021",
        maximun_temperature: 36.42,
        minimun_temperature: 17.55,
        medium_temperature: 27.19,
        maximun_humidity: 87.8,
        minimun_humidity: 25.9,
        medium_humidity: 53.55
    }
];


const BASE_API_URL = "/api/v1";

app.get(BASE_API_URL+"/agroclimatic", (request,response) => {
    response.json(agroclimatic);
    console.log("New GET to /agroclimatic");
    });
    
    
app.post(BASE_API_URL+"/agroclimatic", (request,response) => {
    var newAgroclimatic = request.body;
    
    
    console.log(`newAgroclimatic = ${JSON.stringify(newAgroclimatic, null, 2)}`);
       
    console.log("New POST to /newAgroclimatic");
    
    agroclimatic.push(newAgroclimatic);
    
    response.sendStatus(201);
});


// Caritas Lab5
app.get("/faces", (request, response) =>{
    response.send(cool());
    console.log("Nueva carita");
});

app.listen(port);
console.log("Servidor funcionando...");