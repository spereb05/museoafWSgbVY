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

const btnPortLeft = document.getElementById("file-left");
const portraitLeft = document.getElementById('portrait-left');
btnPortLeft.addEventListener('change', function () {
    const newProtrait = this.files[0];

    if (newProtrait) {
        const reader = new FileReader();
        reader.addEventListener('load', function () {
            portraitLeft.setAttribute('src', reader.result);
        });
        reader.readAsDataURL(newProtrait);
    }
    var currentH = child.clientHeight;
    var currentW = child.clientWidth;

    const initH = currentH;
    const initW = currentW;
});

const btnPortRight = document.getElementById("file-right");
const portraitRight = document.getElementById('portrait-right');
btnPortRight.addEventListener('change', function () {
    const newProtrait = this.files[0];

    if (newProtrait) {
        const reader = new FileReader();
        reader.addEventListener('load', function () {
            portraitRight.setAttribute('src', reader.result);
        });
        reader.readAsDataURL(newProtrait);
    }

    currentH = child.clientHeight;
    currentW = child.clientWidth;

    initH = currentH;
    initW = currentW;
});

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

let observer = new ResizeObserver(function (mutations) {
    
    currentH = child.clientHeight;
    currentW = child.clientWidth;
    console.log('h:' + initH , ' || w: '+ initW + '\nnH: ' + currentH + 'nH: ' + currentW);
});

let child = document.querySelector('#fill-portrait-right');
observer.observe(child, { attributes: true });

var currentH = child.clientHeight;
var currentW = child.clientWidth;

const initH = currentH;
const initW = currentW;