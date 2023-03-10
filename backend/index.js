const BASE_API_URL = "/api/v1";

module.exports = (app) =>{
    var contacts = [
        {
            name : "pepa",
            phone: 12345
        },
        {
            name : "pablo",
            phone: 6789
        }
    ];

    db.insert(contacts);
    console.log("Insertado 2");

    app.get(BASE_API_URL+"/contacts", (request,response) => {
        console.log("New GET to /contacts");
        db.find({}, (err, contacts)=>{
            if(err){
                console.log("Error para dar los contactos");
                response.sendStatus(500);
            }else{
                console.log("Dados los contactos");
                response.json(contacts.map((c)=>{
                    delete c._id;
                    return c;
                }));
            }
        });
        response.json(contacts);
    });
        
        
    app.post(BASE_API_URL+"/contacts", (request,response) => {
        var newContact = request.body;        
        
        console.log(`newContact = ${JSON.stringify(newContact, null, 2)}`);
           
        console.log("New POST to /contacts");
        
        db.insert(newContact);
        
        response.sendStatus(201);
    });

    app.delete(BASE_API_URL+"/contacts/:name", (request,response) => {
        var name = request.params.name;        
           
        console.log("New DELETE to /contacts");
        
        db.remove({"name" : name}, {},(err, numRemoved)=>{
            if(err){
                console.log("Error para borrar el contacto");
                response.sendStatus(500);
            }else{
                console.log("Borrado contacto");
                response.json(200);
            }
        });
    });
};


