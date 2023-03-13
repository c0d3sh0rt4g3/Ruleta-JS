// Almacenamos los nombres de las imágenes en una let variable compleja.
// Se denomina tabla y se accede a los valores mediante el índice (empezando por 0).
// Por ejemplo: imagenes[0] contiene ``rajoy.png``
let imagenes = [`./img/bonfire.png`, `./img/estus.jpg`, `./img/zweihander.jpg`, `./img/uchigatana.jpg`];
// Almacenamos el índice de la imagen que está en cada recuadro.
let cuadro = [ 0, 0, 0, 0];
// Almacenamos el setInterval de cada recuadro de forma independiente.
let intervaloRuleta = [ null, null, null, null];
// let iable donde almacenamos el número de recuadros que están cambiando.
let corriendo = 0;
// Intervalo del cambio de sombras.
let intervaloSombras;
let posicionSombras = [[2,2], [-2,2], [-2,-2], [2,-2]];
let posicionActualSombra = 0;
let score = 0

// Función que inicia la ruleta.
function ruleta() {
    
    // Solo actúa cuando están los tres recuadros parados.
    if (corriendo === 0) {
        // Para el efecto de las sombras.
        clearInterval(intervaloSombras);
        // Sortea la imagen con la que comienza cada recuadro.
            // Math.random() genera un número en el dominio [0-1)
            // Si lo multiplico por tres el dominio pasa a ser [0-3)
            // Esta operación genera decimales, para eliminarlos se usa Math.floor()
        for(let i in cuadro)
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
    document.getElementById(`imag`+x).src = imagenes[cuadro[x]];
}

// Función que para un recuadro de la ruleta.
function paraRuleta() {
    // Solo para si hay alguna corriendo.
    if (corriendo > 0) {
        // Como las tablas empiezan en cero, el último valor es 3.
        // Restamos uno a los recuadros corriendo.
        corriendo = corriendo - 1;
        // Paramos el intervalo para que deje de cambiar la imagen del recuadro.
        clearInterval(intervaloRuleta[corriendo]);

        // Si hemos parado el último activamos el efecto de las sombras.
        if (corriendo === 0){
            premios()
            decreasePlayerHp()
            cambiaSombras()
        }
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
    let estilo = posicionSombras[posicionActualSombra][0]+`px `+posicionSombras[posicionActualSombra][1]+`px 5px #FF5050`;
     document.getElementById(`imag0`).style[`boxShadow`]=estilo;
     document.getElementById(`imag1`).style[`boxShadow`]=estilo;
     document.getElementById(`imag2`).style[`boxShadow`]=estilo;
     document.getElementById(`imag3`).style[`boxShadow`]=estilo;
}

function premios(){
    let bonfire = 0
    let estus = 0
    let zweihander = 0
    let uchigatana = 0
    alert(cuadro)
    for(let i of cuadro){
        switch (i){
            case 0:
                bonfire += 1
                break
            case 1:
                estus += 1
                break
            case 2:
                zweihander += 1
                break
            case 3:
                uchigatana += 1
                break
        }
    }
    let resultados = [bonfire, estus, zweihander, uchigatana]
    if (bonfire >= 2 || estus >= 2 || zweihander >= 2 || uchigatana >= 2){
        if (bonfire >= 2){
            alert(`Enhorabuena, obtuviste ${bonfire} hogueras.`)
        }
        if(estus >= 2){
            alert(`Enhorabuena, obtuviste ${estus} frascos estus.`)
        }
        if(zweihander >= 2){
            alert(`Enhorabuena, obtuviste ${zweihander} zweihanders.`)
        }
        if(uchigatana >= 2){
            alert(`Enhorabuena, obtuviste ${uchigatana} uchigatanas.`)
        }
    }else {
        alert(`Por desgracia, no obtuviste nada`)
    }
    alert(resultados)
    scoreCalc(resultados)
    return resultados
}
//let resultados = [bonfire, estus, zweihander, uchigatana]
function scoreCalc(resultados){
    let numBonfire = resultados[0]
    let numEstus = resultados[1]
    let numZweihander = resultados[2]
    let numUchigatana = resultados[3]
    let scoreWrote = document.getElementById("puntosDisplay")
    if (numBonfire >= 2 || numEstus >= 2 || numZweihander >= 2 || numUchigatana >= 2){
        if (numBonfire >= 2 && numBonfire < 4){
            increasePlayerHp()
            score += 75
        }else if (numBonfire === 4){
            increasePlayerHp()
            increasePlayerHp()
            score += (75 * 2)
        }
        if (numEstus >= 2 && numEstus < 4){
            score +=  50
        }else if (numEstus === 4){
            increasePlayerHp()
            score += (50 * 2)
        }
        if (numZweihander >= 2 && numZweihander < 4){
            decreaseBossHp()
            score += 100
        }else if (numZweihander === 4){
            decreaseBossHp()
            decreaseBossHp()
            score += (100 * 2)
        }
        if (numUchigatana >= 2 && numUchigatana < 4){
            decreaseBossHp()
            score += 125
        }else if (numUchigatana === 4){
            decreaseBossHp()
            decreaseBossHp()
            score += (125 * 2)
        }
    }else {
        alert("No has obtenido ningún punto.")
    }
    alert(score)
    scoreWrote.textContent = score.toString()
    return score
}

function resetScore(){
    score = 0
    document.getElementById("puntosDisplay").textContent = score.toString()
    return score
}

function audioPlay() {
    let audio = document.getElementById(`musica`);
    audio.volume = 0.2
    audio.play();
}

function  audioStop(){
    let audio = document.getElementById(`musica`);
    audio.pause()
    audio.currentTime = 0
}

function decreaseBossHp() {
    var progressBar = document.getElementById("vidaBoss");
    var width = parseInt(progressBar.style.width) || 100;
    width -= 10;
    progressBar.style.width = width + "%";
}

function decreasePlayerHp(){
    var progressBar = document.getElementById("vidaPlayer");
    var width = parseInt(progressBar.style.width) || 100;
    width -= 10;
    progressBar.style.width = width + "%";
    
    // Verificar si la barra de vida está a cero
    if (width <= 0) {
        alert("Game Over");
        alert('<iframe width="560" height="315" src="https://www.youtube.com/watch?v=-ZGlaAxB7nI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>')
        resetScore();
    }
}

function increasePlayerHp(){
    var progressBar = document.getElementById("vidaPlayer") || 100;
    var width = parseInt(progressBar.style.width);
    width += 11;
    progressBar.style.width = width + "%";
}

