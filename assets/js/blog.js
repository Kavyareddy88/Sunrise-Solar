
document.addEventListener("DOMContentLoaded", function () {

    const blogPage = document.querySelector(".solar-blog-page");

    if (!blogPage) return;

    const revealElements = blogPage.querySelectorAll(".journal-reveal");

    if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        !("IntersectionObserver" in window)
    ) {
        return;
    }

    blogPage.classList.add("journal-animate-ready");

    const observer = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("journal-visible");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
    });

    revealElements.forEach(function (element) {
        observer.observe(element);
    });

});
