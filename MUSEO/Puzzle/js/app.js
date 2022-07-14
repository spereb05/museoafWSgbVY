var margenError = 8;
var pTop = 0, pLeft = 0;

// provincia = [targetTop, targetLeft, id, origenTop, origenLeft]
var madrid = [270, 340, document.querySelector('#madrid'), 0, 0];
var teruel = [261, 451, document.querySelector('#teruel'), 100, 0];

madrid[2].click(dragElement(madrid));
teruel[2].click(dragElement(teruel));

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    //Cuando pulsamos el raton, ejecuta la funcion dragMouseDown
    elmnt[2].onmousedown = dragMouseDown;

    /**
     * Guarda la posicion X e Y del raton antes de ser arrastrado.
     * Si soltamos o movemos el raton llamara a sus respectivas funciones
     * @param {*} e 
     */
    function dragMouseDown(e) {
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
        e = e || window.event;
        e.preventDefault();

        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        pTop = elmnt[2].offsetTop - pos2;
        pLeft = elmnt[2].offsetLeft - pos1;
        elmnt[2].style.top = (elmnt[2].offsetTop - pos2) + "px";
        elmnt[2].style.left = (elmnt[2].offsetLeft - pos1) + "px";
    }

    /**
     * Si la posicion final del elemento es la deseada , se borra la instancia y se añade un nuevo elemento al codigo html.
     * En caso contrario la instancia vuelve a su posicion original
     */
    function closeDragElement() {
        if (pTop >= elmnt[0] - margenError && pTop <= elmnt[0] + margenError && pLeft >= elmnt[1] - margenError && pLeft <= elmnt[1] + margenError) {
            var srcAntiguo = elmnt[2].src;
            $(elmnt[2]).remove();

            var img = document.createElement("img");
            img.src = srcAntiguo;
            img.style = "position: absolute; user-select: none; -webkit-user-select: none; -webkit-user-drag: none; width: 100px; z-index: 10; left:" + elmnt[1] + "px; top:" + elmnt[0] + "px";
            $("#mapa").append(img);
        } else {
            elmnt[2].style.top = elmnt[3] + "px";
            elmnt[2].style.left = elmnt[4] + "px";
        }

        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}