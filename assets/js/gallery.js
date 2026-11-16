
/* =====================================================
   SUNRISE SOLAR – GALLERY PAGE JAVASCRIPT
   File: assets/js/gallery.js
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ---------------------------------------------
       1. IMAGE REVEAL ANIMATION
    --------------------------------------------- */

    const revealElements = document.querySelectorAll(
        ".gallery-section-heading, " +
        ".gallery-project-card, " +
        ".gallery-feature-image, " +
        ".gallery-feature-content, " +
        ".gallery-location-content"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("gallery-visible");

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealElements.forEach(function (element) {

            element.classList.add("gallery-reveal");

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(function (element) {
            element.classList.add("gallery-visible");
        });

    }


    /* ---------------------------------------------
       2. STAGGERED PROJECT CARD ANIMATION
    --------------------------------------------- */

    const projectCards = document.querySelectorAll(
        ".gallery-project-card"
    );

    projectCards.forEach(function (card, index) {

        card.style.setProperty(
            "--gallery-delay",
            (index % 4) * 100 + "ms"
        );

    });


    /* ---------------------------------------------
       3. HERO CONTENT ENTRANCE ANIMATION
    --------------------------------------------- */

    const heroContent = document.querySelector(
        ".gallery-hero-content"
    );

    if (heroContent && !window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches) {

        heroContent.classList.add("gallery-hero-animate");

    }


    /* ---------------------------------------------
       4. SMOOTH SCROLL FOR INTERNAL LINKS
    --------------------------------------------- */

    const internalLinks = document.querySelectorAll(
        '.gallery-page a[href^="#"]'
    );

    internalLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches ? "auto" : "smooth",
                    block: "start"
                });

            }

        });

    });


    /* ---------------------------------------------
       5. IMAGE LOAD HANDLING
    --------------------------------------------- */

    const galleryImages = document.querySelectorAll(
        ".gallery-page img"
    );

    galleryImages.forEach(function (img) {

        if (img.complete && img.naturalWidth > 0) {
            img.classList.add("gallery-image-loaded");
            return;
        }

        img.addEventListener("load", function () {
            img.classList.add("gallery-image-loaded");
        });

        img.addEventListener("error", function () {
            img.classList.add("gallery-image-error");
            console.warn(
                "Gallery image could not be loaded:",
                img.getAttribute("src")
            );
        });

    });


    /* ---------------------------------------------
       6. RTL ARROW SUPPORT
    --------------------------------------------- */

    function updateGalleryDirection() {

        const isRTL = document.body.dir === "rtl";

        document.querySelectorAll(
            ".gallery-page .btn-arrow"
        ).forEach(function (arrow) {

            arrow.style.transform = isRTL
                ? "rotate(180deg)"
                : "rotate(0deg)";

        });

    }

    updateGalleryDirection();

    const directionObserver = new MutationObserver(
        updateGalleryDirection
    );

    directionObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ["dir"]
    });


    /* ---------------------------------------------
       7. CLEAN UP DIRECTION OBSERVER
    --------------------------------------------- */

    window.addEventListener("pagehide", function () {
        directionObserver.disconnect();
    });

});
