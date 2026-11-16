
/* ==========================================
   SUNRISE SOLAR – SERVICES PAGE
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    // Smooth navigation to a selected service
    document.querySelectorAll(
        'a[href*="service-details.html#"]'
    ).forEach(function (link) {

        link.addEventListener("click", function (event) {

            const linkUrl = new URL(link.href);
            const currentUrl = new URL(window.location.href);

            // Allow normal navigation when opening another page
            if (linkUrl.pathname !== currentUrl.pathname) {
                return;
            }

            const targetId = decodeURIComponent(
                linkUrl.hash.substring(1)
            );

            const target = document.getElementById(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            history.pushState(null, "", linkUrl.hash);

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    // Scroll to the correct service when the detail page opens
    function openSelectedService() {

        if (!window.location.hash) {
            return;
        }

        const targetId = decodeURIComponent(
            window.location.hash.substring(1)
        );

        const target = document.getElementById(targetId);

        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

    }

    // Wait until the page and images have loaded
    window.addEventListener("load", function () {
        setTimeout(openSelectedService, 100);
    });

});

/* =========================================
   PROCESS TIMELINE – SCROLL REVEAL
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    const processItems = document.querySelectorAll(
        ".solar-process-item"
    );

    if (!("IntersectionObserver" in window)) {
        processItems.forEach(item => item.classList.add("is-visible"));
        return;
    }

    const processObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    processObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.18 }
    );

    processItems.forEach(item => {
        item.classList.add("process-reveal");
        processObserver.observe(item);
    });
});
