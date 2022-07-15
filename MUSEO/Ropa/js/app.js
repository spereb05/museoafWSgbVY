var margenError = 50;
var pTop = 0, pLeft = 0;
var takenTop = false;
    takenDown = false;

/**
 * Drag
 */
window.onload = function () {
    initDragElement();
};

// provincia = [targetTop, targetLeft, id, origenTop, origenLeft, zindex, rotation, posicion, estado]
var image1 = [85, 595, 'draggeable-image-1', 420, 95, -1, 10, 'top', false];
var image2 = [85, 595, 'draggeable-image-2', 310, 60, -4, -10, 'top', false];
var image3 = [85, 595, 'draggeable-image-3', 185, 65, -7, 5, 'top', false];
var image4 = [430, 595, 'draggeable-image-4', 420, 1095, -1, 10, 'down', false];
var image5 = [430, 595, 'draggeable-image-5', 310, 1150, -4, -10, 'down', false];
var image6 = [430, 595, 'draggeable-image-6', 185, 1090, -7, 5, 'down', false];

var arrayImages = [image1, image2, image3, image4, image5, image6];

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
                document.getElementById("columna-cajon2").style.zIndex = -100;
                elmnt.style.zIndex = 100;
                break;
            case image4[2]:
            case image5[2]:
            case image6[2]:
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


        if (imageDrag[7] == 'top' && takenTop){
            relocate(imageDrag);
        } else if (imageDrag[7] == 'down' && takenDown) {
            relocate(imageDrag);
        } else if (pTop >= imageDrag[0] - margenError && pTop <= imageDrag[0] + margenError && pLeft >= imageDrag[1] - margenError && pLeft <= imageDrag[1] + margenError){
            if (imageDrag[7] == 'top') {
                takenTop = true;
                imageDrag[8] = true;
            } else{
                takenDown = true;
                imageDrag[8] = true;
            }
            elmnt.style.top = imageDrag[0] + "px";
            elmnt.style.left = imageDrag[1] + "px";
            elmnt.style.transform = 'rotate(0deg)';
            elmnt.style.zIndex = 90;
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
        elmnt.style.transform = 'rotate('+imageDrag[6]+'deg)';

        if (imageDrag[7] == 'top' && imageDrag[8]) {
            takenTop = false;
            imageDrag[8] = false;
        } else if (imageDrag[7] == 'down' && imageDrag[8]){
            takenDown = false;
            imageDrag[8] = false;
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
