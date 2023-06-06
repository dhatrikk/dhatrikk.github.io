

var namez =["Aastha","Dhatrik","Joe","johnny","Rhodes","sins","jack"];


function Greet(name) {
    if (name[0] == "j" || name[0] == "J") {
        console.log("Goodbye " + name);
    }
    else {
        console.log("Hello " + name);
    }
}


for (var i = 0; i < namez.length; i++) {
    Greet(namez[i]);
}
