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
========================= */

const portfolioCards =
    document.querySelectorAll(".work-card");

const portfolioVideos =
    document.querySelectorAll(".work-card video");


portfolioCards.forEach((card) => {

    const video =
        card.querySelector("video");

    const toggle =
        card.querySelector(".video-toggle");


    if (!video || !toggle) return;


    /* =========================
       UPDATE BUTTON
    ========================= */

    const updateButton = () => {

        const playing =
            !video.paused &&
            !video.ended;


        toggle.innerHTML =
            playing
                ? '<span aria-hidden="true">❚❚</span>'
                : '<span aria-hidden="true">▶</span>';


        toggle.setAttribute(
            "aria-label",
            playing
                ? "Pausar video"
                : "Reproducir video"
        );


        toggle.setAttribute(
            "aria-pressed",
            String(playing)
        );


        toggle.classList.toggle(
            "is-playing",
            playing
        );

    };


    /* =========================
       BUTTON CLICK
    ========================= */

    toggle.addEventListener(
        "click",
        (event) => {

            event.preventDefault();
            event.stopPropagation();

            if (
                video.paused ||
                video.ended
            ) {

                video.play().catch(() => {});

            } else {

                video.pause();

            }

        }
    );


    /* =========================
       VIDEO CLICK
    ========================= */

    video.addEventListener(
        "click",
        () => {

            if (video.paused || video.ended) {

                video.play().catch(() => {});

            } else {

                video.pause();

            }

        }
    );


    /* =========================
       VIDEO PLAY
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
       VIDEO PAUSE
    ========================= */

    video.addEventListener(
        "pause",
        updateButton
    );


    /* =========================
       VIDEO END
    ========================= */

    video.addEventListener(
        "ended",
        () => {

            video.currentTime = 0;

            updateButton();

        }
    );


    /* =========================
       INITIAL STATE
    ========================= */

    video.addEventListener(
        "loadedmetadata",
        updateButton
    );

    updateButton();

});
