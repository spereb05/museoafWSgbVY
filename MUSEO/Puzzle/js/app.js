var margenError = 8;
var pTop = 0, pLeft = 0;

window.onload = function () {
    loadImages();

    // provincia = [targetTop, targetLeft, id, origenTop, origenLeft, width, rotation, parentDiv]
    var image1 = [310, 540, document.querySelector('#image-1'), 0, 0, 150, 3, document.querySelector('#item-draggeable-1')];
    var image2 = [343, 748, document.querySelector('#image-2'), 100, 0, 175, 2, document.querySelector('#item-draggeable-2')];
    var image3 = [218, 777, document.querySelector('#image-3'), 0, 0, 150, 1, document.querySelector('#item-draggeable-3')];
    var image4 = [170, 621, document.querySelector('#image-4'), 100, 0, 120, 3, document.querySelector('#item-draggeable-4')];
    var image5 = [76, 775, document.querySelector('#image-5'), 0, 0, 230, 1, document.querySelector('#item-draggeable-5')];
    var image6 = [146, 665, document.querySelector('#image-6'), 0, 0, 150, 2, document.querySelector('#item-draggeable-6')];
    var image7 = [341, 614, document.querySelector('#image-7'), 100, 0, 205, 2, document.querySelector('#item-draggeable-7')];
    var image8 = [210, 133, document.querySelector('#image-8'), 0, 0, 166, 3, document.querySelector('#item-draggeable-8')];
    var image9 = [350, 210, document.querySelector('#image-9'), 100, 0, 207, 1, document.querySelector('#item-draggeable-9')];
    var image10 = [220, 247, document.querySelector('#image-10'), 0, 0, 230, 1.5, document.querySelector('#item-draggeable-10')];
    var image11 = [163, 552, document.querySelector('#image-11'), 100, 0, 125, 1.5, document.querySelector('#item-draggeable-11')];
    var image12 = [365, 433, document.querySelector('#image-12'), 0, 0, 178, 3, document.querySelector('#item-draggeable-12')];
    var image13 = [465, 173, document.querySelector('#image-13'), 100, 0, 155, -3, document.querySelector('#item-draggeable-13')];
    var image14 = [496, 275, document.querySelector('#image-14'), 0, 0, 200, 0, document.querySelector('#item-draggeable-14')];
    var image15 = [483, 537, document.querySelector('#image-15'), 100, 0, 200, 0, document.querySelector('#item-draggeable-15')];
    var image16 = [455, 608, document.querySelector('#image-16'), 0, 0, 198, 1, document.querySelector('#item-draggeable-16')];
    var image17 = [297, 74, document.querySelector('#image-17'), 100, 0, 175, 0, document.querySelector('#item-draggeable-17')];
    var image18 = [150, 398, document.querySelector('#image-18'), 0, 0, 185, 2, document.querySelector('#item-draggeable-18')];
    var image19 = [152, 303, document.querySelector('#image-19'), 100, 0, 130, -2.5, document.querySelector('#item-draggeable-19')];
    var image20 = [258, 372, document.querySelector('#image-20'), 0, 0, 208, 2, document.querySelector('#item-draggeable-20')];
    var image21 = [347, 306, document.querySelector('#image-21'), 100, 0, 219, 2, document.querySelector('#item-draggeable-21')];
    var image22 = [516, 401, document.querySelector('#image-22'), 0, 0, 170, 3.5, document.querySelector('#item-draggeable-22')];
    
    image1[2].click(dragElement(image1));
    image2[2].click(dragElement(image2));
    image3[2].click(dragElement(image3));
    image4[2].click(dragElement(image4));
    image5[2].click(dragElement(image5));
    image6[2].click(dragElement(image6));
    image7[2].click(dragElement(image7));
    image8[2].click(dragElement(image8));
    image9[2].click(dragElement(image9));
    image10[2].click(dragElement(image10));
    image11[2].click(dragElement(image11));
    image12[2].click(dragElement(image12));
    image13[2].click(dragElement(image13));
    image14[2].click(dragElement(image14));
    image15[2].click(dragElement(image15));
    image16[2].click(dragElement(image16));
    image17[2].click(dragElement(image17));
    image18[2].click(dragElement(image18));
    image19[2].click(dragElement(image19));
    image20[2].click(dragElement(image20));
    image21[2].click(dragElement(image21));
    image22[2].click(dragElement(image22));
};



function loadImages() {
    for (var i = 0; i < 22; i++) {
        var newDiv = document.createElement("div");
        newDiv.className = "item-draggeable";
        newDiv.id = "item-draggeable-" + (i + 1);
        $("#carrousel").append(newDiv);

        var newImg = document.createElement("img");
        if (i < 9) {
            newImg.src = "../images/0" + (i + 1) + ".png";
        } else {
            newImg.src = "../images/" + (i + 1) + ".png";
        }
        newImg.className = "element";
        newImg.id = "image-" + (i + 1);
        $("#" + newDiv.id).append(newImg);
    }
}





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

        
        elmnt[2].style.width = elmnt[5] + "px";
        elmnt[2].style.zIndex = "100";
        elmnt[2].style.transform = "rotate(" + elmnt[6] + "deg)";
    }

    /**
     * Si la posicion final del elemento es la deseada , se borra la instancia y se añade un nuevo elemento al codigo html.
     * En caso contrario la instancia vuelve a su posicion original
     */
    function closeDragElement() {
        //$(elmnt[5]).remove();
        if (pTop >= elmnt[0] - margenError && pTop <= elmnt[0] + margenError && pLeft >= elmnt[1] - margenError && pLeft <= elmnt[1] + margenError) {
            var srcAntiguo = elmnt[2].src;
            $(elmnt[7]).remove();

            var img = document.createElement("img");
            img.src = srcAntiguo;
            img.style = " width: " + elmnt[5] + "px; position: fixed; top:" + elmnt[0] + "px; left:" + elmnt[1] + "px; z-index: 1; transform: rotate(" + elmnt[6] + "deg); user-select: none; -webkit-user-select: none; -webkit-user-drag: none;";
            $("#contenedor").append(img);
        } else {
            elmnt[2].style = "";
        }

        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }

}