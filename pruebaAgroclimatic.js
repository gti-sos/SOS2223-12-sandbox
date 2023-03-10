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
        year: 2021,
        maximun_temperature: 37.57,
        minimun_temperature: 18.77,
        medium_temperature: 27.57,
    },
    {
        province: "Huelva",
        date: 2020,
        maximun_temperature: 36.42,
        minimun_temperature: 17.55,
        medium_temperature: 27.19,
    }
];


const BASE_API_URL = "/api/v1";
// https://www.golinuxcloud.com/cannot-set-headers-after-they-are-sent-to-client/
// se pone status para que no salgan errores de headers.
// GET entero HECHO
/*
app.get(BASE_API_URL+"/agroclimatic", (request,response) => {
    response.json(agroclimatic);
    console.log("New GET to /agroclimatic");
    response.status(200);
    });
*/ 
// GET entero verson Pablo
app.get(BASE_API_URL+"/agroclimatic", (request,response) => {
    console.log("New GET to /agroclimatic");
    borrado.find({}, (err, agroclimatic)=>{
        if(err){
            console.log(`Error geting /agroclimatic: ${err}`);
            response.sendStatus(500);
        }else{
            console.log(`Agroclimatic returned ${agroclimatic.length}`);
            response.json(agroclimatic.map((c)=>{
                delete c._id;
                return c;
            }));  
        }
    });
    
});
// POST nuevo HECHO version pablo
app.post(BASE_API_URL+"/agroclimatic", (request,response) => {
    var newAgroclimatic = request.body;
    
    console.log(`newAgroclimatic = ${JSON.stringify(newAgroclimatic, null, 2)}`);
       
    console.log("New POST to /newAgroclimatic");
    
    borrado.insert(newAgroclimatic);
    
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
app.get(BASE_API_URL+"/agroclimatic/:country?year=2021", (request,response) => {
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
// GET sevilla y zona HECHO -> NO HACE FALTA
app.get(BASE_API_URL+"/agroclimatic/:country/:zona", (request,response) => {
    var country = request.params.country;
    var zona = request.params.zona;
    console.log(agroclimatic);
    var filtro = agroclimatic.filter(x => x.province == country &&  x.zone == zona);
    response.json(filtro);
    console.log("New GET to /agroclimatic/Sevilla/LosPalaciosyVillafranca");
    response.status(200);
    
});

// PUT sevilla HECHO no va con version de pablo
app.put(BASE_API_URL+"/agroclimatic/:country", (request,response) => {
    var country = request.params.country;
    var body = request.body;
    agroclimatic = agroclimatic.map(x => {
        if (x.province === country){
            x.year = body.year;
            x.maximun_temperature = body.maximun_temperature;
            x.minimun_temperature = body.minimun_temperature;
            x.medium_temperature = body.medium_temperature;
        }
        return x;
    })
    
    console.log("New PUT to /agroclimatic/Sevilla");
    response.sendStatus(200);
});

// DELETE sevilla MAL
var Datastore = require('nedb');
var borrado = new Datastore();

borrado.insert(agroclimatic);
app.delete(BASE_API_URL+"/agroclimatic/:province", (request,response) =>{
    var province = request.params.province; 
    console.log("New DELETE to /agroclimatic");

    borrado.remove({"province" : province}, {},(err, numRemoved)=>{
        if(err){
            console.log("Error para borrar el dato");
            response.sendStatus(500);
        }else{
            console.log("Borrado dato");
            response.json(200);
        }
    });
});

// Caritas Lab5
app.get("/faces", (request, response) =>{
    response.send(cool());
    console.log("Nueva carita");
});

app.listen(port);
console.log("Servidor funcionando...");