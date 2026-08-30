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

/*
   Solo permitimos que se reproduzca
   un video a la vez.
*/

const portfolioVideos =
    document.querySelectorAll(".work-card video");

portfolioVideos.forEach((video) => {

    video.addEventListener("play", () => {

        portfolioVideos.forEach((otherVideo) => {

            if (otherVideo !== video) {
                otherVideo.pause();
            }

        });

    });

});
