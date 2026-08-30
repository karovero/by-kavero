/* ==========================================================
BY KAVERO — JAVASCRIPT
========================================================== */

/* ==========================================================
ACTIVAR ANIMACIONES SOLO SI JAVASCRIPT CARGÓ
========================================================== */

document.documentElement.classList.add("js-ready");

/* ==========================================================
NAVBAR
========================================================== */

const navbar = document.getElementById("navbar");

if (navbar) {

const updateNavbar = () => {

    if (window.scrollY > 30) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

};

window.addEventListener("scroll", updateNavbar, {
    passive: true
});

updateNavbar();

}

/* ==========================================================
SCROLL REVEAL
========================================================== */

const revealElements =
document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

const revealObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});

} else {

revealElements.forEach((element) => {

    element.classList.add("visible");

});

}

/* ==========================================================
PORTFOLIO VIDEOS
SOLO UN VIDEO PUEDE REPRODUCIRSE A LA VEZ
========================================================== */

const videos =
document.querySelectorAll(".work-card video");

videos.forEach((video) => {

/* ----------------------------------------------
   Cuando empieza un video:
   detener automáticamente todos los demás.
---------------------------------------------- */

video.addEventListener("play", () => {

    videos.forEach((otherVideo) => {

        if (otherVideo !== video) {

            otherVideo.pause();

        }

    });

});


/* ----------------------------------------------
   No autoplay.
   El video solamente comienza cuando
   la persona utiliza los controles.
---------------------------------------------- */


/* ----------------------------------------------
   Generar automáticamente un poster
   usando el primer fotograma del video.
---------------------------------------------- */

video.addEventListener("loadeddata", () => {

    createVideoPoster(video);

}, {
    once: true
});

});

/* ==========================================================
CREAR POSTER AUTOMÁTICO
========================================================== */

function createVideoPoster(video) {

/*
   Si el video ya tiene un poster definido,
   no hacemos nada.
*/

if (video.getAttribute("poster")) {
    return;
}


/*
   Intentamos obtener el primer fotograma.
*/

try {

    const canvas =
        document.createElement("canvas");

    const width = video.videoWidth;
    const height = video.videoHeight;


    if (!width || !height) {
        return;
    }


    canvas.width = width;
    canvas.height = height;


    const context =
        canvas.getContext("2d");


    if (!context) {
        return;
    }


    context.drawImage(
        video,
        0,
        0,
        width,
        height
    );


    const poster =
        canvas.toDataURL("image/jpeg", 0.82);


    video.setAttribute(
        "poster",
        poster
    );


} catch (error) {

    /*
       Si el navegador no permite generar
       el poster, el video sigue funcionando
       normalmente.
    */

    console.log(
        "No se pudo generar el poster automáticamente."
    );

}

}

/* ==========================================================
MENÚ MÓVIL
========================================================== */

const menuToggle =
document.querySelector(".menu-toggle");

const navLinks =
document.querySelector(".nav-links");

if (menuToggle && navLinks) {

menuToggle.addEventListener("click", () => {

    const isOpen =
        navLinks.classList.toggle("active");

    menuToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen
            ? "Cerrar menú"
            : "Abrir menú"
    );

});


navLinks
    .querySelectorAll("a")
    .forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Abrir menú"
            );

        });

    });

}
