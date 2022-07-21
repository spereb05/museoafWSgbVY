var pareja1 = ["texto-moneda-mexico","peso"];
var pareja2 = ["texto-moneda-espana","euro"];
var pareja3 = ["texto-capital-mexico","ciudad-de-mexico"];
var pareja4 = ["texto-capital-espana","madrid"];
var pareja5 = ["texto-platos-mexico","comida-mexicana"];
var pareja6 = ["texto-platos-leon","cocido"];
var pareja7 = ["texto-habitantes-mexico","mapa-mundo-mexico"];
var pareja8 = ["texto-habitantes-espana","mapa-mundo-espana"];
var pareja9 = ["texto-nombre-mexico","mexico"];
var pareja10 = ["texto-nombre-espana","espana"];

var arrayParejas = [pareja1, pareja2, pareja3, pareja4, pareja5, pareja6, pareja7, pareja8, pareja9, pareja10];

var pregunta = null,
    respuesta = null;

function select(id) {
    var imagenSrc = document.getElementById(id).getElementsByClassName("imagen")[0].attributes[0].nodeValue;
    var tipo = document.getElementById(id).className;
        tipo = tipo.substring(tipo.indexOf(' ') + 1);

    var selectedImg = document.createElement("img");
    selectedImg.src = imagenSrc;
    selectedImg.className = "selectedImg";

    if(tipo == "texto" && pregunta == null) {
        document.getElementById("seleccion-superior").appendChild(selectedImg);
        selectedImg.id = "selectedImg-superior";
        pregunta = id;
        
    } else if (tipo == "respuesta" && pregunta == null){
        alert("Selecciona una pregunta.");

    } else if (tipo == "respuesta" && pregunta != null && respuesta == null) {
        document.getElementById("seleccion-inferior").appendChild(selectedImg);
        selectedImg.id = "selectedImg-inferior";
        respuesta = id;
        
        var i = 0, done = false;
        while(i < arrayParejas.length && !done){
            if(arrayParejas[i][0] == pregunta && arrayParejas[i][1] == respuesta) {
                document.getElementById("seleccion-superior").style.borderColor = "rgb(97, 175, 25)";
                document.getElementById("seleccion-superior").style.borderRightColor = "rgb(88, 218, 88)";
                document.getElementById("seleccion-superior").style.borderTopColor = "rgb(88, 218, 88)";

                document.getElementById("seleccion-inferior").style.borderColor = "rgb(97, 175, 25)";
                document.getElementById("seleccion-inferior").style.borderRightColor = "rgb(88, 218, 88)";
                document.getElementById("seleccion-inferior").style.borderTopColor = "rgb(88, 218, 88)";

                setTimeout(descubrir, 2000);
                done = true;
            } else if (arrayParejas[i][0] == pregunta && arrayParejas[i][1] != respuesta){
                
                document.getElementById("seleccion-superior").style.borderColor = "black";
                document.getElementById("seleccion-superior").style.borderRightColor = "rgb(110, 110, 110)";
                document.getElementById("seleccion-superior").style.borderTopColor = "rgb(110, 110, 110)";

                document.getElementById("seleccion-inferior").style.borderColor = "black";
                document.getElementById("seleccion-inferior").style.borderRightColor = "rgb(110, 110, 110)";
                document.getElementById("seleccion-inferior").style.borderTopColor = "rgb(110, 110, 110)";

                setTimeout(error, 2000);
                done = true;
            }
            i++;
        }
    }
}

function descubrir() {
    document.getElementById("seleccion-superior").style = "";
    document.getElementById("seleccion-inferior").style = "";

    document.getElementById("selectedImg-superior").remove();
    document.getElementById("selectedImg-inferior").remove();

    document.getElementById(pregunta).style.opacity = "1";
    document.getElementById(pregunta).style.pointerEvents = "none";
    document.getElementById(respuesta).style.opacity = "1";
    document.getElementById(respuesta).style.pointerEvents = "none";

    var styles = `
    #` + pregunta + ` .portada {
        display: none;
    }
    
    #` + respuesta + ` .portada {
        display: none
    }
    
    #` + pregunta + `:hover,
    #` + respuesta + `:hover {
        box-shadow: 1px 1px 15px rgb(255, 255, 255);
        cursor: auto;
    }`;

    var styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    pregunta = null;
    respuesta = null;
}

function error() {
    document.getElementById("seleccion-superior").style = "";
    document.getElementById("seleccion-inferior").style = "";

    document.getElementById("selectedImg-inferior").remove();
    
    respuesta = null;
}