var image1 = null,
    image2 = null,
    image3 = null;
var arrayImages = null;

var colocacionCorrecta = false;

var targetRight = [461, 561],
    targetLeft = [461, 218],
    targetMiddle = [466, 384];

var margenError = 50;
var pTop = 0, pLeft = 0;
var takenLeft = false,
    takenMiddle = false,
    takenRight = false;

window.onload = function () {
    initDragElement();

    // barriles = [targetTop, targetLeft, id, origenTop, origenLeft, posicion, target correcto, posicion]
    image1 = [461, 561, 'draggeable-image-1', 450, 60, "right", false, null];
    image2 = [461, 218, 'draggeable-image-2', 550, 20, "left", false, null];
    image3 = [466, 384, 'draggeable-image-3', 560, 790, "middle", false, null];
    arrayImages = [image1, image2, image3];
};

/**
 * BOTON Y SEMAFORO
 */
var timer = null;
document.getElementById("btn-mesa").onclick = function () {
    clear();
    colocacionBarriles();
    console.log(colocacionCorrecta);
    if (colocacionCorrecta) {
        document.getElementById("verde").style.backgroundColor = "rgb(128, 209, 128)";
        document.getElementById("verde").style.boxShadow = "0px 0px 20px 3px rgb(35, 148, 20) inset, 0px 0px 20px 3px rgb(35, 148, 20)";
    } else {
        document.getElementById("roja").style.backgroundColor = "rgb(235, 144, 144)";
        document.getElementById("roja").style.boxShadow = "0px 0px 20px 3px rgb(211, 35, 35) inset, 0px 0px 20px 3px rgb(211, 35, 35) ";
    }
    timer = setTimeout(reinicio, 5000);
};

function clear() {
    clearTimeout(timer);
    reinicio();
}

function reinicio() {
    document.getElementById("verde").style = "";
    document.getElementById("roja").style = "";
}

/**
 * Drag
 */

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

        pTop = elmnt.offsetTop - pos2;
        pLeft = elmnt.offsetLeft - pos1;
        elmnt.style.top = elmnt.offsetTop - pos2 + "px";
        elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
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

        /**
         * Posicion izquierda
         */
        if (pTop >= targetLeft[0] - margenError && pTop <= targetLeft[0] + margenError && pLeft >= targetLeft[1] - margenError && pLeft <= targetLeft[1] + margenError) {
            if (!takenLeft) {
                elmnt.style.top = targetLeft[0] + "px";
                elmnt.style.left = targetLeft[1] + "px";

                if (imageDrag[5] == "left") {
                    imageDrag[6] = true;
                } else {
                    imageDrag[6] = false;
                }
                
                if (imageDrag[7] == "left") {
                    takenLeft = false;
                } else if (imageDrag[7] == "middle") {
                    takenMiddle = false;
                } else if (imageDrag[7] == "right") {
                    takenRight = false;
                }

                imageDrag[7] = "left";
                takenLeft = true;
            } else {
                relocate(elmnt, imageDrag);
            }
        }

        /**
         * Posicion medio
         */
        else if (pTop >= targetMiddle[0] - margenError && pTop <= targetMiddle[0] + margenError && pLeft >= targetMiddle[1] - margenError && pLeft <= targetMiddle[1] + margenError) {
            if (!takenMiddle) {
                elmnt.style.top = targetMiddle[0] + "px";
                elmnt.style.left = targetMiddle[1] + "px";

                if (imageDrag[5] == "middle") {
                    imageDrag[6] = true;
                } else {
                    imageDrag[6] = false;
                }
                
                if (imageDrag[7] == "left") {
                    takenLeft = false;
                } else if (imageDrag[7] == "middle") {
                    takenMiddle = false;
                } else if (imageDrag[7] == "right") {
                    takenRight = false;
                }

                imageDrag[7] = "middle";
                takenMiddle = true;
            } else {
                relocate(imageDrag, imageDrag);
            }
        }

        /**
         * Posicion derecha
         */
        else if (pTop >= targetRight[0] - margenError && pTop <= targetRight[0] + margenError && pLeft >= targetRight[1] - margenError && pLeft <= targetRight[1] + margenError) {
            if (!takenRight) {
                elmnt.style.top = targetRight[0] + "px";
                elmnt.style.left = targetRight[1] + "px";

                if (imageDrag[5] == "right") {
                    imageDrag[6] = true;
                } else {
                    imageDrag[6] = false;
                }
                
                if (imageDrag[7] == "left") {
                    takenLeft = false;
                } else if (imageDrag[7] == "middle") {
                    takenMiddle = false;
                } else if (imageDrag[7] == "right") {
                    takenRight = false;
                }

                imageDrag[7] = "right";
                takenRight = true;

            } else {
                relocate(elmnt, imageDrag);
            }
        } else {
            relocate(elmnt, imageDrag);
        }

        if (imageDrag[5] == imageDrag[7] == "right" && imageDrag[6]) {
            image1[6] = imageDrag[6];
        } else if (imageDrag[5] == imageDrag[7] == "left" && imageDrag[6]) {
            image2[6] = imageDrag[6];
        } else if (imageDrag[5] == imageDrag[7] == "middle" && imageDrag[6]) {
            image3[6] = imageDrag[6];
        }

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

function relocate(elmnt, imageDrag) {
    elmnt.style.top = imageDrag[3] + "px";
    elmnt.style.left = imageDrag[4] + "px";
    elmnt.style.zIndex = "";

    if (imageDrag[7] == "left") {
        takenLeft = false;
    } else if (imageDrag[7] == "middle") {
        takenMiddle = false;
    } else if (imageDrag[7] == "right") {
        takenRight = false;
    }

    imageDrag[6] = false;
    imageDrag[7] = null;
}

function colocacionBarriles() {
    if (image1[6] && image2[6] && image3[6]) {
        colocacionCorrecta = true;
    } else {
        colocacionCorrecta = false;
    }
}