/* ==========================================================
   BY KAVERO — JAVASCRIPT
========================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* =========================
       NAVBAR
    ========================== */

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


    /* =========================
       MOBILE MENU
    ========================== */

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
                String(isOpen)
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


    /* =========================
       SCROLL REVEAL
    ========================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    /*
       Primero comprobamos que JavaScript
       está funcionando.

       Esto evita que toda la página desaparezca
       si el JS falla o tarda en cargar.
    */

    document.body.classList.add("js-ready");


    if (
        "IntersectionObserver" in window &&
        revealElements.length
    ) {

        const revealObserver =
            new IntersectionObserver(

                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },

                {
                    threshold: 0.08
                }

            );


        revealElements.forEach((element) => {

            revealObserver.observe(element);

        });

    } else {

        /*
           Si el navegador no soporta
           IntersectionObserver,
           mostramos todo.
        */

        revealElements.forEach((element) => {

            element.classList.add("visible");

        });

    }


    /* =========================
       PORTFOLIO VIDEOS
    ========================== */

    const workCards =
        document.querySelectorAll(".work-card");


    workCards.forEach((card) => {

        const video =
            card.querySelector("video");

        const playButton =
            card.querySelector(".video-play");

        const muteButton =
            card.querySelector(".video-mute");


        if (!video || !playButton || !muteButton) {
            return;
        }


        /*
           IMPORTANTE:
           El video NO se reproduce al pasar
           el mouse por encima.
        */


        /* =========================
           PLAY / PAUSE
        ========================== */

        playButton.addEventListener(
            "click",
            () => {

                /*
                   Si otro video está reproduciéndose,
                   lo detenemos.
                */

                document
                    .querySelectorAll(".work-card video")
                    .forEach((otherVideo) => {

                        if (
                            otherVideo !== video &&
                            !otherVideo.paused
                        ) {

                            otherVideo.pause();

                            otherVideo.currentTime = 0;

                            const otherButton =
                                otherVideo
                                    .closest(".work-card")
                                    ?.querySelector(".video-play");

                            if (otherButton) {

                                otherButton.textContent = "▶";

                                otherButton.setAttribute(
                                    "aria-label",
                                    "Reproducir video"
                                );

                            }

                        }

                    });


                if (video.paused) {

                    video.play()
                        .then(() => {

                            playButton.textContent = "❚❚";

                            playButton.setAttribute(
                                "aria-label",
                                "Pausar video"
                            );

                        })
                        .catch(() => {

                            playButton.textContent = "▶";

                        });

                } else {

                    video.pause();

                    playButton.textContent = "▶";

                    playButton.setAttribute(
                        "aria-label",
                        "Reproducir video"
                    );

                }

            }
        );


        /* =========================
           VIDEO TERMINADO
        ========================== */

        video.addEventListener(
            "ended",
            () => {

                playButton.textContent = "▶";

                playButton.setAttribute(
                    "aria-label",
                    "Reproducir video"
                );

            }
        );


        /* =========================
           SONIDO
        ========================== */

        muteButton.addEventListener(
            "click",
            () => {

                video.muted = !video.muted;


                if (video.muted) {

                    muteButton.textContent = "🔇";

                    muteButton.setAttribute(
                        "aria-label",
                        "Activar sonido"
                    );

                } else {

                    muteButton.textContent = "🔊";

                    muteButton.setAttribute(
                        "aria-label",
                        "Silenciar video"
                    );

                }

            }
        );


        /* =========================
           SI SE PAUSA DE OTRA FORMA
        ========================== */

        video.addEventListener(
            "pause",
            () => {

                if (
                    video.currentTime <
                    video.duration
                ) {

                    playButton.textContent = "▶";

                    playButton.setAttribute(
                        "aria-label",
                        "Reproducir video"
                    );

                }

            }
        );


        /* =========================
           ESTADO INICIAL
        ========================== */

        video.pause();

        video.muted = true;

    });


});
