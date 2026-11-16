
document.addEventListener("DOMContentLoaded", function () {

    const detailPage = document.querySelector(".solar-detail-page");

    if (!detailPage) return;

    const navigationLinks = document.querySelectorAll(
        ".detail-navigation a"
    );

    const articles = document.querySelectorAll(
        ".solar-detail-article"
    );

    /* Smooth scroll for sidebar links */

    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            history.replaceState(null, "", targetId);

        });

    });


    /* Highlight the active article */

    function setActiveLink(id) {

        navigationLinks.forEach(function (link) {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + id) {
                link.classList.add("active");
            }

        });

    }


    if ("IntersectionObserver" in window) {

        const articleObserver = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {
                        setActiveLink(entry.target.id);
                    }

                });

            },
            {
                rootMargin: "-20% 0px -65% 0px",
                threshold: 0
            }
        );

        articles.forEach(function (article) {
            articleObserver.observe(article);
        });

    }


    /* Open the selected article when the page loads */

    function openHashArticle() {

        const hash = window.location.hash;

        if (!hash) {
            if (articles.length) {
                setActiveLink(articles[0].id);
            }
            return;
        }

        const target = document.querySelector(hash);

        if (!target) return;

        setTimeout(function () {

            target.scrollIntoView({
                behavior: "auto",
                block: "start"
            });

            setActiveLink(target.id);

        }, 150);

    }

    openHashArticle();


    /* Handle browser back and forward navigation */

    window.addEventListener("hashchange", openHashArticle);

});
