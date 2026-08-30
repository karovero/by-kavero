/* ==========================================================
   BY KAVERO — JAVASCRIPT
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

    updateNavbar();

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );

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
========================================================== */

const videos =
    document.querySelectorAll(".portfolio-video");


videos.forEach((video) => {

    const card =
        video.closest(".work-card");

    const playButton =
        card?.querySelector(".play-button");

    const muteButton =
        card?.querySelector(".mute-button");


    /* -----------------------------------------
       REPRODUCIR / PAUSAR
    ----------------------------------------- */

    if (playButton) {

        playButton.addEventListener(
            "click",
            async () => {

                /*
                   Antes de reproducir este video,
                   detenemos TODOS los demás.
                */

                videos.forEach((otherVideo) => {

                    if (otherVideo !== video) {

                        otherVideo.pause();

                        const otherCard =
                            otherVideo.closest(".work-card");

                        const otherButton =
                            otherCard?.querySelector(
                                ".play-button"
                            );

                        if (otherButton) {
                            otherButton.textContent = "▶";
                        }

                    }

                });


                if (video.paused) {

                    try {

                        await video.play();

                        playButton.textContent = "❚❚";

                    } catch (error) {

                        console.log(
                            "No se pudo reproducir el video.",
                            error
                        );

                    }

                } else {

                    video.pause();

                    playButton.textContent = "▶";

                }

            }
        );

    }


    /* -----------------------------------------
       ACTUALIZAR BOTÓN AL PAUSAR
    ----------------------------------------- */

    video.addEventListener(
        "pause",
        () => {

            if (playButton) {
                playButton.textContent = "▶";
            }

        }
    );


    /* -----------------------------------------
       ACTUALIZAR BOTÓN AL REPRODUCIR
    ----------------------------------------- */

    video.addEventListener(
        "play",
        () => {

            if (playButton) {
                playButton.textContent = "❚❚";
            }

        }
    );


    /* -----------------------------------------
       CUANDO TERMINA
    ----------------------------------------- */

    video.addEventListener(
        "ended",
        () => {

            video.currentTime = 0;

            if (playButton) {
                playButton.textContent = "▶";
            }

        }
    );


    /* -----------------------------------------
       SONIDO
    ----------------------------------------- */

    if (muteButton) {

        muteButton.addEventListener(
            "click",
            () => {

                video.muted = !video.muted;

                muteButton.textContent =
                    video.muted
                        ? "🔇"
                        : "🔊";

            }
        );

    }

});


/* ==========================================================
   MENÚ MÓVIL
========================================================== */

const menuToggle =
    document.querySelector(".menu-toggle");

const navLinks =
    document.querySelector(".nav-links");


if (menuToggle && navLinks) {

    menuToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                navLinks.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuToggle.textContent =
                isOpen ? "×" : "☰";

        }
    );


    navLinks
        .querySelectorAll("a")
        .forEach((link) => {

            link.addEventListener(
                "click",
                () => {

                    navLinks.classList.remove(
                        "active"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuToggle.textContent = "☰";

                }
            );

        });

}


/* ==========================================================
   SEGURIDAD EXTRA:
   SI EL VIDEO CAMBIA, SOLO UNO PUEDE ESTAR REPRODUCIÉNDOSE
========================================================== */

videos.forEach((video) => {

    video.addEventListener(
        "play",
        () => {

            videos.forEach((otherVideo) => {

                if (otherVideo !== video) {
                    otherVideo.pause();
                }

            });

        }
    );

});
