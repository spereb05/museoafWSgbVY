var arrayImages = null;

var targetTop = [163, [100, 165, 230, 295, 360]],
    targetCenter = [263, [100, 165, 230, 295, 360]],
    targetBottom = [360, [100, 165, 230, 295, 360]];

var margenError = 30;
var pTop = 0, pLeft = 0;

var takenTop = [false, false, false, false, false],
    takenCenter = [false, false, false, false, false],
    takenBottom = [false, false, false, false, false];

/**
 * 
 * DRAG
 * 
 */
window.onload = function () {
    initDragElement();

    //botes = [id, origenTop, origenLeft]
    arrayImages = [
        ['draggeable-image-1', 605, 400],
        ['draggeable-image-2', 680, 70],
        ['draggeable-image-3', 680, 120],
        ['draggeable-image-4', 680, 170],
        ['draggeable-image-5', 680, 220],
        ['draggeable-image-6', 680, 270],
        ['draggeable-image-7', 680, 330],
        ['draggeable-image-8', 680, 370],
        ['draggeable-image-9', 680, 420],
        ['draggeable-image-10', 605, 90],
        ['draggeable-image-11', 605, 140],
        ['draggeable-image-12', 605, 190],
        ['draggeable-image-13', 605, 240],
        ['draggeable-image-14', 605, 290],
        ['draggeable-image-15', 605, 340]
    ];
};

/**
 * BOTON Y CRONOMETRO
 */
var timer = null;
document.getElementById("btn-inicio").onclick = function () {
    var t = 1;
    relocate();
    timer = setInterval(myTimer,1000);

    function myTimer() {
        if (t < 15){
            console.log(t++);
        } else {
            clearInterval(timer);
            comprobar();
        }
    }

    function comprobar() {
        var x = 0,
            completo = true;
        while (x < takenTop.length) {
            if(!takenTop[x] || !takenCenter[x] || !takenBottom[x]){
                completo = false;
            }
            x++;
        }
    
        if (completo) {
            alert("COMPLETO. ¡¡ENHORABUENA!!");
            relocate();
        } else {
            alert("SIGUE PROBANDO");
            relocate();
        }
        t = 1;
    }

    function relocate() {
        clearInterval(timer);
        var x = 0;
        while (x < arrayImages.length) {
            document.getElementById(arrayImages[x][0]).style.top = arrayImages[x][1] + "px";
            document.getElementById(arrayImages[x][0]).style.left = arrayImages[x][2] + "px";
            document.getElementById(arrayImages[x][0]).style.zIndex = "";
            document.getElementById(arrayImages[x][0]).style.pointerEvents = "";
            x++;
        }

        x = 0;
        while (x < takenTop.length) {
            takenTop[x] = false;
            takenCenter[x] = false;
            takenBottom[x] = false;
            x++;
        }
        
    }
};


function initDragElement() {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    var draggeables = document.getElementsByClassName("draggeable");
    var elmnt = null;
    var pointers = document.querySelectorAll('.draggeable-header');
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

        pointers.forEach(pointer => {
            pointer.style.cursor = 'grabbing';
        });

        pTop = elmnt.offsetTop - pos2;
        pLeft = elmnt.offsetLeft - pos1;
        elmnt.style.top = elmnt.offsetTop - pos2 + "px";
        elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
        pointers.forEach(pointer => {
            pointer.style.cursor = '';
        });

        var i = 0;
        var imageDrag = null;
        while (i < arrayImages.length && imageDrag == null) {
            if (elmnt.id == arrayImages[i][0]) {
                imageDrag = arrayImages[i];
            }
            i++;
        }

        /**
         * Posicion TOP
         */
        if (pTop >= targetTop[0] - margenError && pTop <= targetTop[0] + margenError) {
            var j = 0,
                done = false;
            while(j < targetTop[1].length && !done){
                if (pLeft >= targetTop[1][j] - margenError && pLeft <= targetTop[1][j] + margenError){
                    if (!takenTop[j]) {
                        elmnt.style.top = targetTop[0] + "px";
                        elmnt.style.left = targetTop[1][j] + "px";

                        takenTop[j] = true;
                        document.getElementById(imageDrag[0]).style.pointerEvents = "none";
                        
                    } else {
                        relocate(elmnt, imageDrag);
                    }

                    done = true;
                } else {
                    relocate(elmnt, imageDrag);
                }
                j++;
            }
        }

        /**
         * Posicion CENTER
         */
        else if (pTop >= targetCenter[0] - margenError && pTop <= targetCenter[0] + margenError) {
            var j = 0,
                done = false;
            while(j < targetCenter[1].length && !done){
                if (pLeft >= targetCenter[1][j] - margenError && pLeft <= targetCenter[1][j] + margenError){
                    if (!takenCenter[j]) {
                        elmnt.style.top = targetCenter[0] + "px";
                        elmnt.style.left = targetCenter[1][j] + "px";

                        takenCenter[j] = true;
                        document.getElementById(imageDrag[0]).style.pointerEvents = "none";
                        
                    } else {
                        relocate(elmnt, imageDrag);
                    }

                    done = true;
                } else {
                    relocate(elmnt, imageDrag);
                }
                j++;
            }
        }


        /**
         * Posicion BOTTOM
         */
        else if (pTop >= targetBottom[0] - margenError && pTop <= targetBottom[0] + margenError) {
            var j = 0,
                done = false;
            while(j < targetBottom[1].length && !done){
                if (pLeft >= targetBottom[1][j] - margenError && pLeft <= targetBottom[1][j] + margenError){
                    if (!takenBottom[j]) {
                        elmnt.style.top = targetBottom[0] + "px";
                        elmnt.style.left = targetBottom[1][j] + "px";

                        takenBottom[j] = true;
                        document.getElementById(imageDrag[0]).style.pointerEvents = "none";
                        
                    } else {
                        relocate(elmnt, imageDrag);
                    }

                    done = true;
                } else {
                    relocate(elmnt, imageDrag);
                }
                j++;
            }
        } 
        /**
         * Ninguna posicion correcta. El elemento vuelve a su posicion de origen
         */
        else {
            relocate(elmnt, imageDrag);
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
    elmnt.style.top = imageDrag[1] + "px";
    elmnt.style.left = imageDrag[2] + "px";
    elmnt.style.zIndex = "";
}