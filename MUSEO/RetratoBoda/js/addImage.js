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

const dragImageLeft = document.getElementById('draggeable-image-left');
const btnFileLeft = document.getElementById("file-left");
const imageLeft = document.getElementById('image-left');
btnFileLeft.addEventListener('change', function () {
    const newProtrait = this.files[0];

    if (newProtrait) {
        const reader = new FileReader();
        reader.addEventListener('load', function () {
            imageLeft.setAttribute('src', reader.result);
            dragImageLeft.style = "height: 200px; width: fit-content;";
        });
        reader.readAsDataURL(newProtrait);
    }
});

const dragImageRight = document.getElementById('draggeable-image-right');
const btnImageRight = document.getElementById("file-right");
const imageRight = document.getElementById('image-right');
btnImageRight.addEventListener('change', function () {
    const newProtrait = this.files[0];

    if (newProtrait) {
        const reader = new FileReader();
        reader.addEventListener('load', function () {
            imageRight.setAttribute('src', reader.result);
            dragImageRight.style = "height: 200px; width: fit-content";
        });
        reader.readAsDataURL(newProtrait);
    }
});

/* observadores de ambas imagenes al cambiar de tamaño*/
let observerL = new ResizeObserver(function (mutations) {
    currentHL = childL.clientHeight;
    imageLeft.style = "height: "+ currentHL +"px; width: fit-content;";
});

let observerR = new ResizeObserver(function (mutations) {
    currentHR = childR.clientHeight;
    imageRight.style = "height: "+ currentHR +"px; width: fit-content;";
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

