/* ==========================================================
BY KAVERO — JAVASCRIPT
========================================================== */

/* ==========================================================
ACTIVAR JAVASCRIPT
========================================================== */

document.documentElement.classList.add("js-enabled");

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

                    revealObserver.unobserve(entry.target);

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

revealElements.forEach((element) => {

    element.classList.add("visible");

});

}

/* ==========================================================
PORTFOLIO VIDEOS
SOLO UN VIDEO SE REPRODUCE A LA VEZ
========================================================== */

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


/*
   Evita que al hacer clic sobre el video
   se produzcan comportamientos inesperados.
*/

video.addEventListener("click", (event) => {

    event.stopPropagation();

});

});

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

});


navLinks.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});

}
