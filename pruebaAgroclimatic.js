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
        zone: "LosPalaciosyVillafranca",
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
        zone: "LosPalaciosyVillafranca",
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
// https://www.golinuxcloud.com/cannot-set-headers-after-they-are-sent-to-client/
// se pone status para que no salgan errores de headers.
// GET entero HECHO
app.get(BASE_API_URL+"/agroclimatic", (request,response) => {
    response.json(agroclimatic);
    console.log("New GET to /agroclimatic");
    response.status(200);
    });
    
// POST nuevo HECHO
app.post(BASE_API_URL+"/agroclimatic", (request,response) => {
    var newAgroclimatic = request.body;
    
    console.log(`newAgroclimatic = ${JSON.stringify(newAgroclimatic, null, 2)}`);
       
    console.log("New POST to /newAgroclimatic");
    
    agroclimatic.push(newAgroclimatic);
    
    response.sendStatus(201);
});

// PUT HECHO
app.put(BASE_API_URL+"/agroclimatic", (request,response) =>{
    console.log("New PUT to /agroclimatic");
    response.sendStatus(405);
});

// DELETE DUDA
app.delete(BASE_API_URL+"/agroclimatic", (request,response) =>{
    console.log("New DELETE to /agroclimatic");
    agroclimatic = [];
    response.sendStatus(200);
});

// GET sevilla HECHO
app.get(BASE_API_URL+"/agroclimatic/:country", (request,response) => {
    var country = request.params.country;
    var filtro = agroclimatic.filter(x => x.province == country);
    response.json(filtro);
    console.log("New GET to /agroclimatic/Sevilla");
    response.status(200);
});

// GET estadistica concreta
app.get(BASE_API_URL+"/agroclimatic/:country?medium_temperature=27.19", (request,response) => {
    var country = request.params.country;
    var m_t = request.params.medium_temperature;
    var filtro = agroclimatic.filter(x => x.province == country && x.medium_temperature == m_t);
    response.json(filtro);
    console.log("New GET to /agroclimatic/Sevilla?medium_temperature=27.19");
    response.status(200);
});

// POST sevilla HECHO
app.post(BASE_API_URL+"/agroclimatic/:country", (request,response) =>{
    console.log("New POST to /agroclimatic/Sevilla");
    response.sendStatus(405);
});
/*
// POST con los datos igual que otro MAL
app.post(BASE_API_URL+"/agroclimatic/:country", (request,response) =>{
    var country = request.params.country;
    var filtro = agroclimatic.filter(x => x.province == country);
    if(filtro in agroclimatic)
    response.sendStatus(409);
    
    console.log("New POST to /agroclimatic/datos_iguales");    
});
*/
// GET sevilla y zona HECHO
app.get(BASE_API_URL+"/agroclimatic/:country/:zona", (request,response) => {
    var country = request.params.country;
    var zona = request.params.zona;
    console.log(agroclimatic);
    var filtro = agroclimatic.filter(x => x.province == country &&  x.zone == zona);
    response.json(filtro);
    console.log("New GET to /agroclimatic/Sevilla/LosPalaciosyVillafranca");
    response.status(200);
    
});

// PUT sevilla HECHO
app.put(BASE_API_URL+"/agroclimatic/:country/:zona", (request,response) => {
    var country = request.params.country;
    var zona = request.params.zona;
    var body = request.body;
    agroclimatic = agroclimatic.map(x => {
        if (x.province === country && x.zone===zona){
            x.maximun_temperature = body.maximun_temperature;
            x.minimun_temperature = body.minimun_temperature;
            x.medium_temperature = body.medium_temperature;
        }
        return x;
    })
    
    console.log("New PUT to /agroclimatic/Sevilla/LosPalaciosyVillafranca");
    response.sendStatus(200);
});

// DELETE sevilla MAL
app.delete(BASE_API_URL+"/agroclimatic/:country", (request,response) =>{
    var country = request.params.country;
    var filtro = agroclimatic.filter(x => x.province == country);
    agroclimatic.pop(filtro);
    console.log("New DELETE to /agroclimatic/Sevilla");
    response.sendStatus(200);
});

// Caritas Lab5
app.get("/faces", (request, response) =>{
    response.send(cool());
    console.log("Nueva carita");
});

app.listen(port);
console.log("Servidor funcionando...");