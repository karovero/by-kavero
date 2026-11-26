/* ==========================================================
   BY KAVERO — JAVASCRIPT
========================================================== */

document.documentElement.classList.add("js-enabled");

/* NAVBAR */

const navbar = document.getElementById("navbar");

if (navbar) {
    const updateNavbar = () => {
        navbar.classList.toggle("scrolled", window.scrollY > 30);
    };

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });

    updateNavbar();
}

/* SCROLL REVEAL */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
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

/* VIDEOS: SOLO UNO SE REPRODUCE A LA VEZ */

const portfolioVideos = document.querySelectorAll(".work-card video");

portfolioVideos.forEach((video) => {
    video.addEventListener("play", () => {
        portfolioVideos.forEach((otherVideo) => {
            if (otherVideo !== video) {
                otherVideo.pause();
            }
        });
    });
});

/* MENÚ MÓVIL Y TABLET */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Cerrar menú" : "Abrir menú"
        );

        menuToggle.textContent = isOpen ? "×" : "☰";
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Abrir menú");
            menuToggle.textContent = "☰";
        });
    });
}
