// Clase viernes 3 de Marzo.
var express = require("express");
var cool = require("cool-ascii-faces");
console.log(cool());

var bodyParser = require("body-parser");

var port = process.env.PORT || 12345; //var port = 12345; 
var app = express();

app.use(bodyParser.json());

var contacts = [
    {
        name : "pepe",
        phone: 12345
    },
    {
        name : "pablo",
        phone: 6789
    }
];


const BASE_API_URL = "/api/v1";


app.get(BASE_API_URL+"/contacts", (request,response) => {
response.json(contacts);
console.log("New GET to /contacts");
});


app.post(BASE_API_URL+"/contacts", (request,response) => {
    var newContact = request.body;


    console.log(`newContact = ${JSON.stringify(newContact, null, 2)}`);
   
    console.log("New POST to /contacts");

    contacts.push(newContact);

    response.sendStatus(201);
});


app.get("/faces", (request, response) =>{
    response.send(cool());
    console.log("New request");
});


app.listen(port);
console.log("Servidor funcionando...");