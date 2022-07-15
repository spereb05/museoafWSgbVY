const btnShowHide = document.getElementById("btn-show-hide");
btnShowHide.addEventListener("click", () => {
    if (btnShowHide.innerHTML === "Ocultar imagenes") {
        document.getElementById("fill-portrait-left").style.zIndex = "-1";
        document.getElementById("fill-portrait-right").style.zIndex = "-1";

        btnShowHide.innerHTML = "Mostrar imagenes";
    } else {
        document.getElementById("fill-portrait-left").style.zIndex = "10";
        document.getElementById("fill-portrait-right").style.zIndex = "10";

        btnShowHide.innerHTML = "Ocultar imagenes";
    }
});

const fillPortraitLeft = document.getElementById('fill-portrait-left');
const btnPortLeft = document.getElementById("file-left");
const portraitLeft = document.getElementById('portrait-left');
btnPortLeft.addEventListener('change', function () {
    const newProtrait = this.files[0];

    if (newProtrait) {
        const reader = new FileReader();
        reader.addEventListener('load', function () {
            portraitLeft.setAttribute('src', reader.result);
            fillPortraitLeft.style = "height: 200px; width: fit-content;";
        });
        reader.readAsDataURL(newProtrait);
    }
    j = 0;
});

const fillPortraitRight = document.getElementById('fill-portrait-right');
const btnPortRight = document.getElementById("file-right");
const portraitRight = document.getElementById('portrait-right');
btnPortRight.addEventListener('change', function () {
    const newProtrait = this.files[0];

    if (newProtrait) {
        const reader = new FileReader();
        reader.addEventListener('load', function () {
            portraitRight.setAttribute('src', reader.result);
            fillPortraitRight.style = "height: 200px; width: fit-content";
        });
        reader.readAsDataURL(newProtrait);
    }
    i = 0;
});

/* observadores de ambas imagenes al cambiar de tamaño*/
let observerL = new ResizeObserver(function (mutations) {
    //currentHL = childL.clientHeight;
    if(j==0) {
        setVariablesL(currentHL, currentWL);
        j+= 1;
    }
    portraitLeft.style = "height: "+ currentHL +"px; width: fit-content;";
});

let observerR = new ResizeObserver(function (mutations) {
    //currentHR = childR.clientHeight;
    if(i==0) {
        setVariablesR(currentHR, currentWR);
        i+= 1;
    }
    portraitRight.style = "height: "+ currentHR +"px; width: fit-content;";
});

let childR = document.querySelector('#fill-portrait-right');
observerR.observe(childR, { attributes: true });
let childL = document.querySelector('#fill-portrait-left');
observerL.observe(childL, { attributes: true });

/*Datos actuales e iniciales de la altura y ancho de las imagenes*/
//var currentHL = childL.clientHeight;
//var currentHR = childR.clientHeight;

var i = 0;
var j = 0;

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
    var portraits = document.getElementsByClassName("fill-portrait");
    var elmnt = null;
    var currentZIndex = 100;

    for (var i = 0; i < portraits.length; i++) {
        var portrait = portraits[i];
        var header = getHeader(portrait);

        portrait.onmousedown = function () {
            this.style.zIndex = "" + ++currentZIndex;
        };

        if (header) {
            header.parentPortrait = portrait;
            header.onmousedown = dragMouseDown;
        }
    }

    /**
     * Guarda la posicion X e Y del raton antes de ser arrastrado.
     * Si soltamos o movemos el raton llamara a sus respectivas funciones
     * @param {*} e 
     */
    function dragMouseDown(e) {
        elmnt = this.parentPortrait;

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
        var headerItems = element.getElementsByClassName("fill-portrait-header");

        if (headerItems.length === 1) {
            return headerItems[0];
        }

        return null;
    }
}

