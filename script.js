
let video;

let filterBoton = null
let audiofinal = null
let audioOvers = null;
let sliderFinal = [
    '.slider1',
    '.slider2',
    '.slider3',
    '.slider4',
    '.slider5',
    '.slider6',
    '.slider7',
    '.slider8',
    '.slider9',
    '.slider10',
    '.slider11'
]

let sliderMenuPrincipal = [
    '.bienvenida',
    '.slider-1-P1',
    '.slider-2-P1',
    '.slider-3-P1',
    '.slider-4-P1'
]

let btnRespetir = [
    '',
    '#btn-repetir-molecula',
    '#btn-repetir-cicloagua',
    '#btn-repetir-aguapotable'
]

let sliderActual = 0;
let sliderCheck = false
let idVideoActual;
let idBotonRepetirActual;
let escenaActualPresentacion=0;


function init() {
    document.querySelector('body').focus()
    audioOvers = new Sonidos('38');
    let botones = document.querySelectorAll('.btn-inicio')
    botones.forEach(boton => {
        boton.addEventListener('mouseover', btnOverMenu, false)
        boton.addEventListener('mouseout', btnOutMenu, false)
    });
   
}

function detectarSlide() {
    if (audiofinal.getCurrentTimeAudio() == 4 && sliderActual == 0) {
        siguienteslider()

    }
    if (audiofinal.getCurrentTimeAudio() == 12 && sliderActual == 1) {
        siguienteslider()

    }
    if (audiofinal.getCurrentTimeAudio() == 17 && sliderActual == 2) {
        siguienteslider()

    }
    if (audiofinal.getCurrentTimeAudio() == 24 && sliderActual == 3) {
        siguienteslider()

    }
    if (audiofinal.getCurrentTimeAudio() == 28 && sliderActual == 4) {
        siguienteslider()

    }
    if (audiofinal.getCurrentTimeAudio() == 32 && sliderActual == 5) {
        siguienteslider()
    }
    if (audiofinal.getCurrentTimeAudio() == 38 && sliderActual == 6) {
        siguienteslider()
    }
    if (audiofinal.getCurrentTimeAudio() == 43 && sliderActual == 7) {
        siguienteslider()
    }
    if (audiofinal.getCurrentTimeAudio() == 53 && sliderActual == 8) {
        siguienteslider()
    }
    if (audiofinal.getCurrentTimeAudio() == 62 && sliderActual == 9) {
        siguienteslider()
    }
}

function siguienteslider() {
    ocultarSliders()
    sliderActual++
    document.querySelector(sliderFinal[sliderActual]).style.display = 'grid'
}

function ocultarSliders() {
    sliderFinal.forEach(element => {
        document.querySelector(element).style.display = 'none'
    });
}

function btnOverMenu() {
    audioOvers.playAudio()
}


function btnOutMenu() {
    audioOvers.stopAudio()
}


function cargarActividad() {
    escenaActualPresentacion=escenaActualPresentacion+1
    document.querySelector('.bienvenida').style.display = 'none'
    document.querySelector('.contenido-actividad-bienvenida').style.display = 'block'
    
    detectarEscena()
}

function detectarEscena() {

    console.log("detectarEscena#", escenaActualPresentacion)
    switch (escenaActualPresentacion) {
        case 0:
            if (audiofinal != null) {
                audiofinal.pauseAudio()
                audiofinal.destroy()
            }
            document.querySelector('.bienvenida').style.display = 'block'
            document.querySelector('.contenido-actividad-bienvenida').style.display = 'none'
            botonesNavegacion()
            ocultarBotonesRepetir()
            break;

        case 1:
            if (audiofinal != null) {
                audiofinal.pauseAudio()
                audiofinal.destroy()
            }
            document.querySelector(sliderMenuPrincipal[escenaActualPresentacion]).style.display = 'grid'
            document.querySelector('.contenido-actividad-bienvenida').style.display = 'block'
            playVideosAnimacion('#video-animacion-molecula')
            botonesNavegacion()
            ocultarBotonesRepetir()
            break;
        case 2:
            if (audiofinal != null) {
                audiofinal.pauseAudio()
                audiofinal.destroy()
            }
            document.querySelector('.contenido-actividad-bienvenida').style.display = 'block'
            playVideosAnimacion('#video-animacion-cicloagua')
            botonesNavegacion()
            ocultarBotonesRepetir()
            break;
        case 3:
            if (audiofinal != null) {
                audiofinal.pauseAudio()
                audiofinal.destroy()
            }
            document.querySelector('.contenido-actividad-bienvenida').style.display = 'block'
            playVideosAnimacion('#video-animacion-aguapotable')
           
            botonesNavegacion()
            ocultarBotonesRepetir()
            break;
        case 4:
            document.querySelector('.contenido-actividad-bienvenida').style.display = 'block'
            document.querySelector('.slider1').style.display = 'grid'
            audiofinal = new Sonidos('aguaFinal')
            audiofinal.playAudio()
            audiofinal.getIntance().addEventListener("timeupdate", detectarSlide);
            audiofinal.getIntance().addEventListener('ended', removerEventoRepetir, false);
            botonesNavegacion()
            ocultarBotonesRepetir()
            break;

        default:
            break;
    }
}

function removerEventoRepetir() {
    audiofinal.getIntance().removeEventListener("timeupdate", detectarSlide);
}

function playVideosAnimacion(idVideo) {
    idVideoActual=idVideo
    document.querySelector(idVideo).style.display = "block"
    document.querySelector(idVideo).play()
    document.querySelector(idVideo).addEventListener('ended', detectarFinVideo, false)
}

function stopAllVideos() {
    let allvideotags = document.querySelectorAll('video')
    allvideotags.forEach(video => {
        video.currentTime = 0
        video.pause()
        video.removeEventListener('ended', detectarFinVideo, false)
    });
}

function siguienteNavegacionPrincipalActividad() {
    stopAllVideos()
    escenaActualPresentacion++
    console.log(sliderMenuPrincipal[escenaActualPresentacion])
    ocultarSliderPrincipalActividad()
    document.querySelector(sliderMenuPrincipal[escenaActualPresentacion]).style.display = 'grid'
   
    detectarEscena()
}

function atrasNavegacionPrincipalActividad() {
    stopAllVideos()
    ocultarSliders()
    escenaActualPresentacion--
    detectarEscena()
    ocultarSliderPrincipalActividad()
    document.querySelector(sliderMenuPrincipal[escenaActualPresentacion]).style.display = 'grid'
}

function botonesNavegacion() {

    if (escenaActualPresentacion == 0) {
        document.querySelector('.btn-volver').style.visibility = 'visible'
        document.querySelector('.btn-atras').style.visibility = 'hidden'
        document.querySelector('.btn-siguiente').style.visibility = 'hidden'
    } else if (escenaActualPresentacion == sliderMenuPrincipal.length - 1) {
        document.querySelector('.btn-volver').style.visibility = 'hidden'
        document.querySelector('.btn-atras').style.visibility = 'visible'
        document.querySelector('.btn-siguiente').style.visibility = 'hidden'
    } else {
        document.querySelector('.btn-volver').style.visibility = 'hidden'
        document.querySelector('.btn-atras').style.visibility = 'visible'
        document.querySelector('.btn-siguiente').style.visibility = 'visible'
    }

}

function ocultarSliderPrincipalActividad() {

    sliderMenuPrincipal.forEach(element => {
        document.querySelector(element).style.display = 'none'
    });

}

function ocultarBotonesRepetir() {
    btnRespetir.forEach(btnrepetir => {
        if(btnrepetir!=''){
            document.querySelector(btnrepetir).style.display = 'none'
        }
       
    });

}


function repetirVideo(idVideo,id) {
    document.querySelector(`#${idVideo}`)
    document.querySelector(`#${idVideo}`).addEventListener('ended', detectarFinVideo, false)
    document.querySelector(`#${id}`).style.display = 'none'
    idBotonRepetirActual=`#${id}`
    document.querySelector(`#${idVideo}`).play()
}

function detectarFinVideo() {
   
    if(idBotonRepetirActual!=null){
        document.querySelector(idBotonRepetirActual).style.display = 'block'
    }
    
    document.querySelector(btnRespetir[escenaActualPresentacion]).style.display = 'block'
    document.querySelector(idVideoActual).removeEventListener('ended', detectarFinVideo, false)
}





// Get the modal
let modal = document.getElementById("myModal");



// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

/* span.addEventListener('click', ocultarModal); */
window.addEventListener('click', ocultarModalVentana)

function ocultarModal() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
function ocultarModalVentana(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function MostrarVideo() {
    modal.style.display = "flex";
}

function OcultarVideo() {
    video.currentTime = 0
    videoMobile.currentTime = 0
    video.pause()
    videoMobile.pause()
    modal.style.display = "none";
}

function ReproducirVideo(e) {
    video.play()
    document.querySelector('#videoOthers').classList.add("disabledbutton")
    video.addEventListener('ended', function (e) {

        document.querySelector('#videoOthers').classList.remove("disabledbutton")

    })
}
