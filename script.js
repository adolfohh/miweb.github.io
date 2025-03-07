// Funcionalidad del reproductor de música
const audio = document.getElementById("audio");
const playPauseButton = document.getElementById("play-pause");
const anteriorButton = document.getElementById("anterior");
const siguienteButton = document.getElementById("siguiente");

const canciones = ["musica.mp3", "musica2.mp3"];
let cancionActual = 0;

// Función para cambiar de canción
function cambiarCancion(direccion) {
    cancionActual += direccion;
    if (cancionActual < 0) {
        cancionActual = canciones.length - 1;
    } else if (cancionActual >= canciones.length) {
        cancionActual = 0;
    }
    audio.src = canciones[cancionActual];
    audio.play();
    playPauseButton.textContent = "⏸️";
}

// Eventos de los botones
playPauseButton.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playPauseButton.textContent = "⏸️";
    } else {
        audio.pause();
        playPauseButton.textContent = "▶️";
    }
});

anteriorButton.addEventListener("click", () => {
    cambiarCancion(-1);
});

siguienteButton.addEventListener("click", () => {
    cambiarCancion(1);
});

// Cambiar automáticamente a la siguiente canción cuando termine la actual
audio.addEventListener("ended", () => {
    cambiarCancion(1);
});

// Funcionalidad para arrastrar el reproductor
const reproductor = document.getElementById("reproductor");
let isDragging = false;
let offsetX, offsetY;

reproductor.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - reproductor.getBoundingClientRect().left;
    offsetY = e.clientY - reproductor.getBoundingClientRect().top;
    reproductor.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        reproductor.style.left = `${e.clientX - offsetX}px`;
        reproductor.style.top = `${e.clientY - offsetY}px`;
    }
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    reproductor.style.cursor = "grab";
});

// Funcionalidad para cambiar entre videos
const videoContainer = document.querySelector(".video-container");
const videoSlides = document.querySelectorAll(".video-slide");
const prevButton = document.getElementById("prev-video");
const nextButton = document.getElementById("next-video");
let currentSlide = 0;

function showSlide(index) {
    videoSlides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
    });
}

prevButton.addEventListener("click", () => {
    currentSlide = (currentSlide > 0) ? currentSlide - 1 : videoSlides.length - 1;
    showSlide(currentSlide);
});

nextButton.addEventListener("click", () => {
    currentSlide = (currentSlide < videoSlides.length - 1) ? currentSlide + 1 : 0;
    showSlide(currentSlide);
});

// Mostrar el primer video al cargar la página
showSlide(currentSlide);