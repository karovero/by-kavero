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
   const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        const video = entry.target;

        if (entry.isIntersecting) {
            video.play().catch(() => {});
        } else {
            video.pause();
        }
    });
}, { threshold: 0.4 });

document.querySelectorAll(".work-card video").forEach((video) => {
    videoObserver.observe(video);
});

}
