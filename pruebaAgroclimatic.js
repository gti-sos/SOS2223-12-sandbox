var express = require("express");
var port = process.env.PORT || 12345;
var app = express();

// Lab6
var bodyParser = require("body-parser");

var cool = require("cool-ascii-faces");
const { request, response } = require("express");
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
        year: 2020,
        maximun_temperature: 36.42,
        minimun_temperature: 17.55,
        medium_temperature: 27.19,
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

// GET sevilla HECHO
app.get(BASE_API_URL+"/agroclimatic/:province", (request,response) => {
    var province = request.params.province;
    var filtro = agroclimatic.filter(x => x.province == province);
    response.json(filtro);
    console.log("New GET to /agroclimatic/Sevilla");
    response.status(200);
});

// GET sevilla año
app.get(BASE_API_URL+"/agroclimatic/:province/:year", (request,response) => {
    const province = request.params.province;
    const year = request.params.year;
    var filtro = agroclimatic.filter(x => x.province == province && x.year == year);
    console.log("New GET to /agroclimatic/:province/:year");
    console.log(filtro);
    response.json(filtro);
    response.status(200);
});

// GET recurso inexistente
app.get(!BASE_API_URL+"/agroclimatic", (request, response) =>{
    console.log("New GET to /agroclimatic");
    response.status(404);
});

// POST dato
app.post(BASE_API_URL + "/agroclimatic", (request, response) => {
    var newAgroclimatic = request.body;
    var newAgroclimaticStr = JSON.stringify(newAgroclimatic);
    var expectedParams = 5;

    if (Object.keys(newAgroclimatic).length !== expectedParams) {
        response.status(400).send("El número de parámetros es incorrecto");

    }else if (agroclimatic.some(x => JSON.stringify(x) === newAgroclimaticStr)) {
        response.status(409).send("El elemento ya existe");

    } else {
        console.log(`newAgroclimatic = ${JSON.stringify(newAgroclimatic, null, 2)}`);
        console.log("New POST to /agroclimatic");
        agroclimatic.push(newAgroclimatic);
        response.sendStatus(201);
    }
});

// POST prohibido
app.post(BASE_API_URL+"/agroclimatic/:province", (request, response) =>{
    console.log("New POST to /agroclimatic/:province");
    response.sendStatus(405);
});

// PUT 1 si hay 1, si hay mas de 1 se actualizan todos
app.put(BASE_API_URL + "/agroclimatic/:province", (request, response) => {
    var province = request.params.province;
    var body = request.body;
    var updated = false;
    agroclimatic = agroclimatic.map(x => {
        if (x.province === province) {
            x.year = body.year;
            x.maximun_temperature = body.maximun_temperature;
            x.minimun_temperature = body.minimun_temperature;
            x.medium_temperature = body.medium_temperature;
            updated = true;
        }
        return x;
    });

    if (updated) {
        console.log("New PUT to /agroclimatic/:province");
        response.sendStatus(200);
    } else {
        console.log("No se ha encontrado el objeto con la provincia especificada");
        response.status(400).send("No se ha encontrado el objeto con la provincia especificada");
    }
});

// PUT mismo id (13.b.i.1) => FALLA ALGO NO ESTA DEL TODO.
app.put(BASE_API_URL+"/agroclimatic/:province/:year", (request, response) => {
    const province = request.params.province;
    const year = request.params.year;
    const body = request.body;
  
    // Buscar el objeto en la matriz 
    const objeto = agroclimatic.find(x => x.province == province && x.year == year);
  
    if (!objeto) {
      // Si el objeto no se encuentra, devolver un código de respuesta 404 Not Found
      response.status(404).send("El objeto no existe");
    } else {
      // Si se encuentra el objeto, actualizar sus propiedades y devolver un código de respuesta 200 OK

      objeto.maximun_temperature = body.maximun_temperature;
      objeto.minimun_temperature = body.minimun_temperature;
      objeto.medium_temperature = body.medium_temperature;
      response.sendStatus(200);
    }
  
    console.log("New PUT to /agroclimatic/:province/:year");
});

// PUT prohibido HECHO
app.put(BASE_API_URL+"/agroclimatic", (request,response) =>{
    console.log("New PUT to /agroclimatic");
    response.sendStatus(405);
});

// PUT que actualiza solo el primer elemento que tenga la provincia pasada por la url -> NO HACE FALTA PERO PARA TENERLO.
/*app.put(BASE_API_URL + "/agroclimatic/:province", (request, response) => {
    var province = request.params.province;
    var body = request.body;
    var updated = false;
    
    for (var i = 0; i < agroclimatic.length; i++) {
        if (agroclimatic[i].province === province) {
            agroclimatic[i].year = body.year;
            agroclimatic[i].maximun_temperature = body.maximun_temperature;
            agroclimatic[i].minimun_temperature = body.minimun_temperature;
            agroclimatic[i].medium_temperature = body.medium_temperature;
            updated = true;
            break;
        }
    }

    if (updated) {
        console.log("New PUT to /agroclimatic/:province");
        response.sendStatus(200);
    } else {
        console.log("No se ha encontrado el objeto con la provincia especificada");
        response.status(400).send("No se ha encontrado el objeto con la provincia especificada");
    }
});
*/

// DELETE entero
app.delete(BASE_API_URL+"/agroclimatic", (request, response) => {
    if (!request.body || Object.keys(request.body).length === 0) {
        agroclimatic = [];
        response.status(200).send("Los datos se han borrado correctamente");
    }else{
        const { year, province } = request.body;

    // Buscar el objeto en la matriz 
        const objectIndex = agroclimatic.findIndex(x => x.year === year && x.province === province);

        if (objectIndex.length === -1) {
    // Si el objeto no se encuentra, devolver un código de respuesta 404 Not Found
        response.status(404).send("El objeto no existe");
        } else {
    // Si se encuentra el objeto, eliminarlo de la matriz y devolver un código de respuesta 200 OK
            agroclimatic.splice(objectIndex, 1);
            response.sendStatus(200);
        }
    }
    //console.log("New DELETE to /agroclimatic");
});

// DELETE provincia
app.delete(BASE_API_URL+"/agroclimatic/:province", (request, response) => {
    const province = request.params.province;
    const filtro = agroclimatic.filter(r => r.province === province);
  
    if (filtro.length === 0) {
        response.status(404).json(`No se encontraron datos para ${province}`);
    } else {
        const dato = agroclimatic.filter(r => r.province !== province);
        const borrar = dato.length !== agroclimatic.length;
        agroclimatic = dato;

        if (borrar) {
            response.status(204).send("Se ha borrado la provincia");
        } else {
            response.status(404).send(`No se encontraron datos que coincidan con los criterios de eliminación para ${province}`);
        }
    }
    console.log("New DELETE to /agroclimatic/:province");
});

// Caritas Lab5
app.get("/faces", (request, response) =>{
    response.send(cool());
    console.log("Nueva carita");
});

app.listen(port);
console.log("Servidor funcionando...");