/* ==========================================================
   BY KAVERO — JAVASCRIPT
========================================================== */


/* =========================
   NAVBAR
========================= */

const navbar = document.getElementById("navbar");

if (navbar) {

    window.addEventListener("scroll", () => {

        navbar.classList.toggle(
            "scrolled",
            window.scrollY > 30
        );

    }, { passive: true });

}


/* =========================
   SCROLL REVEAL
========================= */

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


/* =========================
   MOBILE MENU
========================= */

const menuToggle =
    document.querySelector(".menu-toggle");

const navLinks =
    document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

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
   PORTFOLIO VIDEOS
========================== */

const portfolioVideos =
    document.querySelectorAll(".work-card video");


portfolioVideos.forEach((video) => {

    const card =
        video.closest(".work-card");

    if (!card) return;


    /* Usa el botón que YA existe en el HTML */
    const toggle =
        card.querySelector(".video-toggle");

    if (!toggle) return;


    /* =========================
       ACTUALIZAR BOTÓN
    ========================= */

    const updateButton = () => {

        const playing =
            !video.paused &&
            !video.ended;

        if (playing) {

            toggle.innerHTML =
                '<span aria-hidden="true">❚❚</span>';

            toggle.setAttribute(
                "aria-label",
                "Pausar video"
            );

            toggle.setAttribute(
                "aria-pressed",
                "true"
            );

            toggle.classList.add(
                "is-playing"
            );

            toggle.classList.add(
                "hidden"
            );

        } else {

            toggle.innerHTML =
                '<span aria-hidden="true">▶</span>';

            toggle.setAttribute(
                "aria-label",
                "Reproducir video"
            );

            toggle.setAttribute(
                "aria-pressed",
                "false"
            );

            toggle.classList.remove(
                "is-playing"
            );

            toggle.classList.remove(
                "hidden"
            );

        }

    };


    /* =========================
       BOTÓN PLAY / PAUSE
    ========================= */

    toggle.addEventListener(
        "click",
        (event) => {

            event.preventDefault();
            event.stopPropagation();

            if (video.paused || video.ended) {

                /* Pausa los demás videos */

                portfolioVideos.forEach(
                    (otherVideo) => {

                        if (
                            otherVideo !== video &&
                            !otherVideo.paused
                        ) {

                            otherVideo.pause();

                        }

                    }
                );

                video.play().catch(() => {});

            } else {

                video.pause();

            }

        }
    );


    /* =========================
       CLICK DIRECTO SOBRE VIDEO
    ========================= */

    video.addEventListener(
        "click",
        () => {

            if (video.paused || video.ended) {

                portfolioVideos.forEach(
                    (otherVideo) => {

                        if (
                            otherVideo !== video &&
                            !otherVideo.paused
                        ) {

                            otherVideo.pause();

                        }

                    }
                );

                video.play().catch(() => {});

            } else {

                video.pause();

            }

        }
    );


    /* =========================
       PLAY
    ========================= */

    video.addEventListener(
        "play",
        () => {

            portfolioVideos.forEach(
                (otherVideo) => {

                    if (
                        otherVideo !== video &&
                        !otherVideo.paused
                    ) {

                        otherVideo.pause();

                    }

                }
            );

            updateButton();

        }
    );


    /* =========================
       PAUSE
    ========================= */

    video.addEventListener(
        "pause",
        updateButton
    );


    /* =========================
       FIN DEL VIDEO
    ========================= */

    video.addEventListener(
        "ended",
        () => {

            video.currentTime = 0;

            updateButton();

        }
    );


    /* =========================
       ESTADO INICIAL
    ========================= */

    updateButton();

});
