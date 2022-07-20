document.querySelector("#btn-hacer-pasaporte").onclick = function() {
    document.querySelector("#intro-video").style.display = "none";
    document.querySelector("#rellenar-pasaporte").style.display = "block";
    document.querySelector("#div-botones").style.display = "block";
};

var select = document.getElementById("acompanado-esposa");
select.addEventListener("change", function() {
    if (select.value == "si") {
        document.querySelector("#nombre-esposa").style.display = "block";
    } else {
        document.querySelector("#nombre-esposa").style.display = "none";
    }
});

var today = new Date();
var currentDate = today.getDate()+' / '+(today.getMonth()+1)+' / '+today.getFullYear();
document.getElementById("fecha-expedicion").innerHTML = currentDate;

var mes = null, dia = null;
if(today.getMonth()+1 < 10) {
    mes = "0" + (today.getMonth()+1);
} else {
    mes = today.getMonth()+1;
} 

if(today.getDate() < 10) {
    dia = "0" + today.getDate();
} else {
    dia = today.getDate();
}

var currentDateFormat = today.getFullYear()+'-'+  mes +'-'+ dia;
document.getElementById("fecha-nacimiento").max = currentDateFormat;

/**
 * 
 * OCULTAR FOTOS DETRAS DEL PASAPORTE
 * 
 */
const btnShowHide = document.getElementById("btn-show-hide");
btnShowHide.addEventListener("click", () => {
    if (btnShowHide.innerHTML === "Ocultar imagenes") {
        document.getElementById("draggeable-image-left").style.zIndex = "-1";
        document.getElementById("draggeable-image-right").style.zIndex = "-1";

        btnShowHide.innerHTML = "Mostrar imagenes";
    } else {
        document.getElementById("draggeable-image-left").style.zIndex = "10";
        document.getElementById("draggeable-image-right").style.zIndex = "10";

        btnShowHide.innerHTML = "Ocultar imagenes";
    }
});

/**
 * 
 * MOSTRAR BOTON CAMBIO DE IMAGEN
 * 
 */
 const dragR = document.getElementById('draggeable-image-right');
 const buttonR = document.getElementById('input-image-right');
 dragR.addEventListener('mouseenter', function () {
     buttonR.style.display = "block";
 });
 
 dragR.addEventListener('mouseleave', function () {
     buttonR.style.display = "none";
 });
 
 const dragL = document.getElementById('draggeable-image-left');
 const buttonL = document.getElementById('input-image-left');
 dragL.addEventListener('mouseenter', function () {
     buttonL.style.display = "block";
 });
 
 dragL.addEventListener('mouseleave', function () {
     buttonL.style.display = "none";
 });

/**
 * 
 * CAMBIAR IMAGEN
 * 
 */
 const imageRight = document.getElementById('image-right');
 const btnImageRight = document.getElementById("file-right");
 btnImageRight.addEventListener('change', function () {
     const newProtrait = this.files[0];
 
     if (newProtrait) {
         const reader = new FileReader();
         reader.addEventListener('load', function () {
             imageRight.setAttribute('src', reader.result);
             dragR.style = "height: 200px; width: fit-content";
         });
         reader.readAsDataURL(newProtrait);
     }
 });
 
 const imageLeft = document.getElementById('image-left');
 const btnImageLeft = document.getElementById("file-left");
 btnImageLeft.addEventListener('change', function () {
     const newProtrait = this.files[0];
 
     if (newProtrait) {
         const reader = new FileReader();
         reader.addEventListener('load', function () {
             imageLeft.setAttribute('src', reader.result);
             dragL.style = "height: 200px; width: fit-content";
         });
         reader.readAsDataURL(newProtrait);
     }
 });
 
 
 /**
  * 
  * REDIMENSIONAR
  * 
  */
 let observerL = new ResizeObserver(function (mutations) {
     currentHL = childL.clientHeight;
     imageLeft.style = "height: " + currentHL + "px; width: fit-content;";
 });
 
 let observerR = new ResizeObserver(function (mutations) {
     currentHR = childR.clientHeight;
     imageRight.style = "height: " + currentHR + "px; width: fit-content;";
 });
 
 let childR = document.querySelector('#draggeable-image-right');
 observerR.observe(childR, { attributes: false });
 let childL = document.querySelector('#draggeable-image-left');
 observerL.observe(childL, { attributes: false });
 
 /*Datos actuales e iniciales de la altura y ancho de las imagenes*/
 var currentHL = childL.clientHeight;
 var currentHR = childR.clientHeight;
 
 /**
  * Drag
  */
 window.onload = function () {
     initDragElement();
 };
 
 function initDragElement() {
     var pos1 = 0,
         pos2 = 0,
         pos3 = 0,
         pos4 = 0;
     var draggeables = document.getElementsByClassName("draggeable");
     var elmnt = null;
     var currentZIndex = 100;
 
     for (var i = 0; i < draggeables.length; i++) {
         var drag = draggeables[i];
         var header = getHeader(drag);
 
         drag.onmousedown = function () {
             this.style.zIndex = "" + ++currentZIndex;
         };
 
         if (header) {
             header.parentdrag = drag;
             header.onmousedown = dragMouseDown;
         }
     }
 
     /**
      * Guarda la posicion X e Y del raton antes de ser arrastrado.
      * Si soltamos o movemos el raton llamara a sus respectivas funciones
      * @param {*} e 
      */
     function dragMouseDown(e) {
         elmnt = this.parentdrag;
 
         e = e || window.event;
         e.preventDefault();
         pos3 = e.clientX;
         pos4 = e.clientY;
 
         document.onmouseup = closeDragElement;
         document.onmousemove = elementDrag;
     }
 
     /**
      * Calcula las nuevas posiciones del raton y con ello calcula la posicion del elemnto arrastrado
      * @param {*} e 
      */
     function elementDrag(e) {
         if (!elmnt) {
             return;
         }
 
         e = e || window.event;
         e.preventDefault();
 
         pos1 = pos3 - e.clientX;
         pos2 = pos4 - e.clientY;
         pos3 = e.clientX;
         pos4 = e.clientY;
 
         elmnt.style.top = elmnt.offsetTop - pos2 + "px";
         elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
     }
 
     function closeDragElement() {
         /* stop moving when mouse button is released:*/
         document.onmouseup = null;
         document.onmousemove = null;
     }
 
     function getHeader(element) {
         var headerItems = element.getElementsByClassName("draggeable-header");
 
         if (headerItems.length === 1) {
             return headerItems[0];
         }
 
         return null;
     }
 }
 