var margenError = 50;
var pTop = 0, pLeft = 0;
var takenTop = false,
    takenDown = false;

/**
 * 
 * DESCAGAR TRAJE
 * 
 */
const btnDescargar = document.getElementById("btn-descargar");
const divDescarga = document.getElementById("columna-percha");
btnDescargar.onclick = function () {
    let div = divDescarga;
    html2canvas(div).then(function (canvas) {
        var link = document.createElement('a');
        link.download = 'filename.png';
        link.href = canvas.toDataURL("image/jpeg", 1.0);
        link.click();
    })
};

/**
 * 
 * MOSTRAR BOTON CAMBIO DE IMAGEN
 * 
 */
const drag = document.getElementById('draggeable-image-portrait');
const button = document.getElementById('input-image');
drag.addEventListener('mouseenter', function () {
    button.style.display = "block";
});

drag.addEventListener('mouseleave', function () {
    button.style.display = "none";
});


/**
 * 
 * CAMBIAR IMAGEN
 * 
 */
const imageP = document.getElementById('image-portrait');
const btnImage = document.getElementById("file");
btnImage.addEventListener('change', function () {
    const newProtrait = this.files[0];

    if (newProtrait) {
        const reader = new FileReader();
        reader.addEventListener('load', function () {
            imageP.setAttribute('src', reader.result);
            drag.style = "height: 200px; width: fit-content";
        });
        reader.readAsDataURL(newProtrait);
    }
});

/**
 * 
 * REDIMENSIONAR
 * 
 */
const imagePortrait = document.getElementById('image-portrait');
/* observadores del retrato al cambiar de tamaño*/
let observer = new ResizeObserver(function (mutations) {
    currentH = child.clientHeight;
    imagePortrait.style = "height: " + currentH + "px; width: fit-content;";
});

let child = document.querySelector('#draggeable-image-portrait');
observer.observe(child, { attributes: false });

/*Datos actuales e iniciales de la altura y ancho de las imagenes*/
var currentH = child.clientHeight;

/**
 * 
 * DRAG
 * 
 */
window.onload = function () {
    initDragElement();
};

// piezaTraje = [targetTop, targetLeft, id, origenTop, origenLeft, zindex, rotation, posicion, estado]
var image1 = [85, 595, 'draggeable-image-1', 440, 95, -1, 10, 'top', false];
var image2 = [85, 595, 'draggeable-image-2', 330, 60, -4, -10, 'top', false];
var image3 = [85, 595, 'draggeable-image-3', 215, 65, -7, 5, 'top', false];
var image4 = [85, 595, 'draggeable-image-4', 95, 110, -10, -7, 'top', false];
var image5 = [85, 595, 'draggeable-image-5', 0, 45, -13, 0, 'top', false];
var image6 = [430, 595, 'draggeable-image-6', 440, 1095, -1, 10, 'down', false];
var image7 = [430, 595, 'draggeable-image-7', 330, 1150, -4, -10, 'down', false];
var image8 = [430, 595, 'draggeable-image-8', 215, 1090, -7, 5, 'down', false];
var image9 = [430, 595, 'draggeable-image-9', 95, 1145, -10, -7, 'down', false];
var image10 = [430, 595, 'draggeable-image-10', 0, 1090, -13, 0, 'down', false];
var image11 = [null, null, 'draggeable-image-portrait', null, null, null, null, '', null];

var arrayImages = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11];

function initDragElement() {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    var portraits = document.getElementsByClassName("draggeable");
    var elmnt = null;

    for (var i = 0; i < portraits.length; i++) {
        var portrait = portraits[i];
        var header = getHeader(portrait);

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

        pTop = elmnt.offsetTop - pos2;
        pLeft = elmnt.offsetLeft - pos1;
        elmnt.style.top = elmnt.offsetTop - pos2 + "px";
        elmnt.style.left = elmnt.offsetLeft - pos1 + "px";

        switch (elmnt.id) {
            case image1[2]:
            case image2[2]:
            case image3[2]:
            case image4[2]:
            case image5[2]:
                document.getElementById("columna-cajon2").style.zIndex = -100;
                elmnt.style.zIndex = 100;
                break;
            case image6[2]:
            case image7[2]:
            case image8[2]:
            case image9[2]:
            case image10[2]:
                document.getElementById("columna-cajon1").style.zIndex = -100;
                elmnt.style.zIndex = 100;
                break;
            default:
                console.log('default');
        }
    }

    function closeDragElement() {
        var i = 0;
        var imageDrag = null;
        while (i < arrayImages.length && imageDrag == null) {
            if (elmnt.id == arrayImages[i][2]) {
                imageDrag = arrayImages[i];
            }
            i++;
        }

        if (imageDrag[7] == 'top' && takenTop) {
            relocate(imageDrag);
        } else if (imageDrag[7] == 'down' && takenDown) {
            relocate(imageDrag);
        } else if (pTop >= imageDrag[0] - margenError && pTop <= imageDrag[0] + margenError && pLeft >= imageDrag[1] - margenError && pLeft <= imageDrag[1] + margenError) {
            if (imageDrag[7] == 'top') {
                takenTop = true;
                imageDrag[8] = true;
            } else {
                takenDown = true;
                imageDrag[8] = true;
            }
            elmnt.style.top = imageDrag[0] + "px";
            elmnt.style.left = imageDrag[1] + "px";
            elmnt.style.transform = 'rotate(0deg)';
            elmnt.style.zIndex = 90;
            $("#"+elmnt.id).appendTo($("#columna-percha"));
        } else {
            relocate(imageDrag);
        }
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }

    function relocate(imageDrag) {
        elmnt.style.top = imageDrag[3] + "px";
        elmnt.style.left = imageDrag[4] + "px";
        elmnt.style.zIndex = imageDrag[5];
        elmnt.style.transform = 'rotate(' + imageDrag[6] + 'deg)';

        if (imageDrag[7] == 'top' && imageDrag[8]) {
            takenTop = false;
            imageDrag[8] = false;
            $("#"+elmnt.id).appendTo($("#columna-cajon1"));
        } else if (imageDrag[7] == 'down' && imageDrag[8]) {
            takenDown = false;
            imageDrag[8] = false;
            $("#"+elmnt.id).appendTo($("#columna-cajon2"));
        }

        if (imageDrag[7] == 'top') {
            document.getElementById("columna-cajon2").style.zIndex = -30;
        } else {
            document.getElementById("columna-cajon1").style.zIndex = -30;
        }
    }
}

function getHeader(element) {
    var headerItems = element.getElementsByClassName("draggeable-header");

    if (headerItems.length === 1) {
        return headerItems[0];
    }

    return null;
}
