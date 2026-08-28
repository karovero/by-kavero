/* ==========================================================
   BY KAVERO — JAVASCRIPT
========================================================== */


/* =========================
   NAVBAR
========================= */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

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


/* =========================
   PORTFOLIO VIDEOS
========================= */

const workCards =
    document.querySelectorAll(".work-card");


workCards.forEach((card) => {

    const video =
        card.querySelector("video");


    card.addEventListener("mouseenter", () => {

        video.play().catch(() => {});

    });


    card.addEventListener("mouseleave", () => {

        video.pause();

        video.currentTime = 0;

    });
    
const videos = document.querySelectorAll(".work-card video");

videos.forEach((video) => {

    const button = document.createElement("button");

    button.className = "video-sound";
    button.innerHTML = "🔇";

    video.parentElement.appendChild(button);

    button.addEventListener("click", (event) => {

        event.stopPropagation();

        video.muted = !video.muted;

        button.innerHTML = video.muted ? "🔇" : "🔊";

    });

});
});
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

    navLinks.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

        });

    });

}