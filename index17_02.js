//VIERNES 17 DE FEBRERO:
// var a;
var a = 1;

console.log(a);

////////////////////////////////////////////////////////////////////////////

var myInteger = 1;
var myDouble = 2.1;
var myString = "Alvaro"
var myBoolean = true;

myResult = myDouble + "1";
// concatena todo aunque sea de diferente tipo.
console.log(myResult);

////////////////////////////////////////////////////////////////////////////

// con parseInt te asegura que transforma de manera correcta los datos.
var UserInput = "1"; // aun estando como string lo reconoce como integer.
myResult2 = myDouble + parseInt(UserInput);

console.log(myResult2);

////////////////////////////////////////////////////////////////////////////

function log(msg){
    console.log(msg)
}

log("la clase de hoy");

///////////////////////////////////////////////////////////////////////////

var numbers = [1, 2, 3, 4, 5]

for(var i=0; i < numbers.length; i++){
    log(numbers[i])
}
// es lo mismo que el for de arriba.
numbers.forEach(log);

//////////////////////////////////////////////////////////////////////////
//callBack: una función que se le pasa como parámetro otra función.

numbers.forEach(function log(msg){
    console.log("v2:" +msg);
});

numbers.forEach(function (msg){
    console.log("v3:" +msg);
});

numbers.forEach((msg) => {
    console.log("v4:" +msg);
});
//imprimen lo mismo.

//////////////////////////////////////////////////////////////////////////

numbers.filter((n) =>{
    return n > 2;
}).forEach(log);

/////////////////////////////////////////////////////////////////////////
// Separar los métodos porque asi juntos no funcionan.
numbers.filter((n) =>{
    return n > 2;
}).map((n) =>{
    return n + 1;
}).reduce((a, n) =>{
    return n + a;
});


