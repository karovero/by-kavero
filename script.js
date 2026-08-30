/* ==========================================================
   BY KAVERO — JAVASCRIPT
========================================================== */


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

    window.addEventListener("scroll", updateNavbar);

    updateNavbar();
}


/* ==========================================================
   SCROLL REVEAL
========================================================== */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    revealElements.forEach((element) => {
        element.classList.add("animate");
    });

    const revealObserver = new IntersectionObserver(

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
========================================================== */

/*
   REGLAS:

   1. Los videos NO se reproducen con hover.
   2. Los videos NO se reproducen automáticamente.
   3. Solo se reproducen mediante el botón inferior.
   4. Solo puede haber un video reproduciéndose.
   5. Al reproducir otro video, el anterior se pausa.
   6. El botón cambia entre "Ver video" y "Pausar".
*/


const workCards = document.querySelectorAll(".work-card");


function stopAllVideos(exceptVideo = null) {

    workCards.forEach((card) => {

        const video = card.querySelector("video");
        const button = card.querySelector(".video-button");

        if (!video) return;

        if (video !== exceptVideo) {

            video.pause();

            video.muted = true;

            if (button) {

                button.textContent = "▶ Ver video";

                button.classList.remove("playing");

            }

        }

    });

}


workCards.forEach((card) => {

    const video = card.querySelector("video");
    const button = card.querySelector(".video-button");

    if (!video || !button) return;


    button.addEventListener("click", async (event) => {

        event.preventDefault();
        event.stopPropagation();


        /* Si este video ya está reproduciéndose,
           simplemente lo pausamos. */

        if (!video.paused) {

            video.pause();

            video.muted = true;

            button.textContent = "▶ Ver video";

            button.classList.remove("playing");

            return;

        }


        /* Detener cualquier otro video */

        stopAllVideos(video);


        /* Activamos sonido solamente después
           de la interacción directa del usuario. */

        video.muted = false;


        try {

            await video.play();

            button.textContent = "❚❚ Pausar";

            button.classList.add("playing");

        } catch (error) {

            /*
               Algunos navegadores pueden bloquear
               reproducción con sonido.

               Si ocurre, intentamos reproducir
               silenciosamente.
            */

            video.muted = true;

            try {

                await video.play();

                button.textContent = "❚❚ Pausar";

                button.classList.add("playing");

            } catch (secondError) {

                video.pause();

                video.muted = true;

                button.textContent = "▶ Ver video";

                button.classList.remove("playing");

            }

        }

    });


    /* Cuando termina el video */

    video.addEventListener("ended", () => {

        video.pause();

        video.muted = true;

        button.textContent = "▶ Ver video";

        button.classList.remove("playing");

    });

});


/* ==========================================================
   MENÚ MOBILE
========================================================== */

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
