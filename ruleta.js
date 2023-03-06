// Almacenamos los nombres de las imágenes en una let iable compleja.
// Se denomina tabla y se accede a los valores mediante el indice (empezando por 0).
// Por ejemplo: imagenes[0] contiene "rajoy.png"
let imagenes = ["bonfire.png", "estus.jpg", "havel_ring.png", "ember.jpg"];
// Almacenamos el indice de la imagen que esta en cada recuadro.
let cuadro = [ 0, 0, 0, 0];
// Almacenamos el setInterval de cada recuadro de forma independiente.
let intervaloRuleta = [ null, null, null, null];
// let iable donde almacenamos el numero de recuadros que están cambiando.
let corriendo = 0;
// Intervalo del cambio de sombras.
let intervaloSombras;
let posicionSombras = [[2,2], [-2,2], [-2,-2], [2,-2]];
let posicionActualSombra = 0;

// Función que inicia la ruleta.
function ruleta() {
    // Solo actua cuando estan los tres recuadros parados.
    if (corriendo === 0) {
        // Para el efecto de las sombras.
        clearInterval(intervaloSombras);

        // Sortea la imagen con la que comienza cada recuadro.
            // Math.random() genera un número en el dominio [0-1)
            // Si lo multiplico por tres el dominio pasa a ser [0-3)
            // Esta operación genera decimales, para eliminarlos se usa Math.floor()
        for(i in cuadro)
            cuadro[i] = Math.floor(Math.random() * 3);

        // Genera los intervalos para que cada recuadro cambie de imagen cada centésima de segundo.
        intervaloRuleta[0] = setInterval(function() { cambiaImagen(0);}, 10);
        intervaloRuleta[1] = setInterval(function() { cambiaImagen(1);}, 10);
        intervaloRuleta[2] = setInterval(function() { cambiaImagen(2);}, 10);
        intervaloRuleta[3] = setInterval(function() { cambiaImagen(3);}, 10);

        // Al empezar están cambiando los tres recuadros.
        corriendo = 4;
    }
}

// Función que cambia la imagen.
function cambiaImagen(x) {
    // Si la imagen es la última paso a la primera.
    //  Si no cambia al asiguiente imagen.
    if(cuadro[x]>=3) cuadro[x]=0;
        else cuadro[x] = cuadro[x]+1;

    // Cambia la propiedad src de la imagen correspondiente en el html.
    document.getElementById("imag"+x).src = imagenes[cuadro[x]];
}

// Función que para un recuadro de la ruleta.
function paraRuleta() {
    // Solo para si hay alguna corriendo.
    if (corriendo > 0) {
        // Como las tablas empiezan en cero, el ultimo valor es 2.
        // Restamos uno a los recuadros corriendo.
        corriendo = corriendo - 1;
        // Paramos el intervalo para que deje de cambiar la imagen del recuadro.
        clearInterval(intervaloRuleta[corriendo]);

        // Si hemos parado el último activamos el efecto de las sombras.
        if (corriendo === 0)
            cambiaSombras();
    }
}

// Funcion que activa el cambio de las sombras.
function cambiaSombras() {
    // Define el intervalo de cambio de las sombras.
    intervaloSombras=setInterval(circulaSombras, 100);
}


// Cambia las sombras de posición.
function circulaSombras() {
    // Circula entre las posiciones de la sombra.
    if(posicionActualSombra>=3) posicionActualSombra=0;
        else posicionActualSombra=posicionActualSombra+1;

    // Crea el estilo que hay que aplicar a la caja.
    // p.e.: 2px 2px 5px #FF5050
    //       2px arriba,  2px hacia la derecha y 5px de difuminado en color #FF5050
    let estilo = posicionSombras[posicionActualSombra][0]+"px "+posicionSombras[posicionActualSombra][1]+"px 5px #FF5050";
     document.getElementById("imag0").style['boxShadow']=estilo;
     document.getElementById("imag1").style['boxShadow']=estilo;
     document.getElementById("imag2").style['boxShadow']=estilo;
     document.getElementById("imag3").style['boxShadow']=estilo;
}

function reproducirAudio() {
    let audio = document.getElementById("musica");
    audio.play();
  }
