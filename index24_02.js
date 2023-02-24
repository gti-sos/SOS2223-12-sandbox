// VIERNES 24 DE FEBRERO:
// crear rama -> git checkout -b "nombre"
// crear nuevo paquete/modulo -> npm (NO HACE FALTA HACER ESTE -> CON HACER EL DE ABAJO YA VALE)
// inicializar en una carpeta -> npm init (0,0,0), despues pegar la url del repositorio, 
// saltar la siguiente opción y como autor el que quieras
// 
// dentro del archivo json: en la sección de scripts: "start": "node (nombre archivo)"
// instalar un paquete interesante: npm install cool-ascii-faces
//

var cool = require("cool-ascii-faces");
console.log(cool());

//////////////////////////////////////////////////////////////////////////////////////
var express = require("express");
var port = 12345;
var app = express();

app.get("/faces", (request, response) =>{
    response.send(cool());
    console.log("New request");
});

app.listen(port);
console.log("Servidor funcionando...");