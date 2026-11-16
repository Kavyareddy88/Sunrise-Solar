
document.addEventListener("DOMContentLoaded", function () {

    const body = document.body;

    /* ==========================================
       MOBILE NAVIGATION
    ========================================== */

    const menu = document.querySelector(".menu-btn");
    const nav = document.querySelector(".nav-links");
    const homeItem = document.querySelector(".nav-home");
    const homeLink = document.querySelector(".nav-home-label");

    if (menu && nav) {

        function closeMenu() {
            nav.classList.remove("open");

            menu.setAttribute("aria-expanded", "false");
            menu.setAttribute("aria-label", "Open navigation menu");

            homeItem?.classList.remove("is-open");
            homeLink?.setAttribute("aria-expanded", "false");
        }

        function openMenu() {
            nav.classList.add("open");

            menu.setAttribute("aria-expanded", "true");
            menu.setAttribute("aria-label", "Close navigation menu");
        }

        // Open and close the mobile menu
        menu.addEventListener("click", function () {

            if (nav.classList.contains("open")) {
                closeMenu();
            } else {
                openMenu();
            }

        });

        // Home dropdown: click to expand on mobile
        if (homeItem && homeLink) {

            homeLink.setAttribute("aria-haspopup", "true");
            homeLink.setAttribute("aria-expanded", "false");

            homeLink.addEventListener("click", function (event) {

                if (window.innerWidth <= 900) {

                    event.preventDefault();

                    const isOpen = homeItem.classList.toggle("is-open");

                    homeLink.setAttribute(
                        "aria-expanded",
                        String(isOpen)
                    );

                }

            });

        }

        // Close menu after selecting a navigation destination
        nav.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                // Keep the menu open when expanding Home
                if (
                    link.classList.contains("nav-home-label") &&
                    window.innerWidth <= 900
                ) {
                    return;
                }

                closeMenu();

            });

        });

        // Close menu when clicking outside
        document.addEventListener("click", function (event) {

            if (
                !nav.contains(event.target) &&
                !menu.contains(event.target)
            ) {
                closeMenu();
            }

        });

        // Close menu with Escape
        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {
                closeMenu();
            }

        });

        // Reset mobile navigation when returning to desktop
        window.addEventListener("resize", function () {

            if (window.innerWidth > 900) {
                closeMenu();
            }

        });

    }


    /* ==========================================
       DARK MODE TOGGLE
    ========================================== */

    const theme = document.querySelector("#themeToggle");

    if (theme) {

        const savedTheme = localStorage.getItem("solar-theme");

        if (savedTheme === "dark") {
            body.classList.add("dark-theme");
        } else {
            body.classList.remove("dark-theme");
        }

        theme.addEventListener("click", function () {

            body.classList.toggle("dark-theme");

            const currentTheme = body.classList.contains("dark-theme")
                ? "dark"
                : "light";

            localStorage.setItem("solar-theme", currentTheme);

        });

    }


    /* ==========================================
       RTL / LTR TOGGLE
    ========================================== */

    const rtl = document.querySelector("#rtlToggle");

    if (rtl) {

        const savedDirection = localStorage.getItem("solar-dir");

        if (savedDirection) {
            body.dir = savedDirection;
        }

        rtl.addEventListener("click", function () {

            body.dir = body.dir === "rtl" ? "ltr" : "rtl";

            localStorage.setItem("solar-dir", body.dir);

        });

    }


    /* ==========================================
       DEMO FORM SUBMISSIONS
    ========================================== */

    document.querySelectorAll("form[data-demo-form]").forEach(function (form) {

        form.addEventListener("submit", function (event) {

            event.preventDefault();

            const message = form.querySelector(".form-message");

            if (message) {
                message.textContent =
                    "Thank you! Your request has been recorded in this demo. Connect a form service to receive submissions.";
            }

            form.reset();

        });

    });


    /* ==========================================
       SOLAR SAVINGS CALCULATOR
    ========================================== */

    const calc = document.querySelector("#solarCalc");

    if (calc) {

        const billInput = document.querySelector("#monthlyBill");
        const sunInput = document.querySelector("#sunHours");
        const unitInput = document.querySelector("#unitRate");

        const systemOutput = document.querySelector("#systemSize");
        const annualOutput = document.querySelector("#annualSavings");
        const monthlyOutput = document.querySelector("#monthlySavings");

        function updateCalculator() {

            if (
                !billInput ||
                !sunInput ||
                !unitInput ||
                !systemOutput ||
                !annualOutput ||
                !monthlyOutput
            ) {
                return;
            }

            const bill = Number(billInput.value || 0);
            const sun = Number(sunInput.value || 5);
            const unit = Number(unitInput.value || 8);

            const monthlyUnits = unit > 0 ? bill / unit : 0;

            const system = sun > 0
                ? Math.max(1, Math.ceil(monthlyUnits / (sun * 30 * 0.78)))
                : 1;

            const savings = Math.round(bill * 0.72);

            systemOutput.textContent = system.toFixed(1) + " kW";

            annualOutput.textContent =
                "₹" + (savings * 12).toLocaleString("en-IN");

            monthlyOutput.textContent =
                "₹" + savings.toLocaleString("en-IN");

        }

        calc.querySelectorAll("input").forEach(function (input) {

            input.addEventListener("input", updateCalculator);

        });

        updateCalculator();

    }


    /* ==========================================
       GALLERY FILTER
    ========================================== */

    const filterButtons = document.querySelectorAll("[data-filter]");
    const galleryItems = document.querySelectorAll(".gallery-item");

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            filterButtons.forEach(function (item) {
                item.classList.remove("active");
            });

            button.classList.add("active");

            const filter = button.dataset.filter;

            galleryItems.forEach(function (item) {

                item.hidden =
                    filter !== "all" &&
                    item.dataset.category !== filter;

            });

        });

    });


    
    
/* ==========================================
   AUTOMATIC ACTIVE NAVIGATION
========================================== */

// Normalize URLs so Netlify and VS Code work the same way
function normalizePage(path) {
    const url = new URL(path, window.location.href);

    let page = url.pathname
        .toLowerCase()
        .replace(/\/+$/, "")
        .split("/")
        .pop();

    return page.replace(/\.html$/, "") || "home1";
}

const currentPage = normalizePage(window.location.pathname);

const navLinks = document.querySelectorAll(
    ".site-header .nav-links a"
);

const homeDropdown = document.querySelector(
    ".site-header .nav-home"
);

// Map detail pages to their parent navigation pages
const pageMap = {
    "blog-detail": "blog",
    "service-details": "services"
};

const activePage = pageMap[currentPage] || currentPage;

const isHomePage =
    currentPage === "home1" ||
    currentPage === "home2";

// Clear previous active states
navLinks.forEach(link => {
    link.classList.remove("active", "selected");
    link.removeAttribute("aria-current");
});

homeDropdown?.classList.remove("active");

// Apply active states
navLinks.forEach(link => {

    const linkPage = normalizePage(
        link.getAttribute("href")
    );

    // Home Classic / Home Premium
    if (isHomePage && linkPage === currentPage) {
        link.classList.add("selected");
    }

    // Other navigation pages
    if (!isHomePage && linkPage === activePage) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
    }
});

// Keep Home highlighted on both home pages
if (isHomePage) {
    homeDropdown?.classList.add("active");
}

    /* ==========================================
       GLOBAL WEBSITE SCROLL ANIMATIONS
       Applies to every website page
    ========================================== */

    const animationSelectors = [

        /* Hero sections */
        ".hero-grid > *",
        ".page-hero .container > *",
        ".premium-hero-inner > *",
        ".gallery-hero-content > *",
        ".contact-hero-content > *",

        /* Common sections */
        ".section-head",
        ".section-head > *",
        ".section > .container > *",
        ".split > *",
        ".cta-inner > *",

        /* Home pages */
        ".solar-section-heading",
        ".solar-service-item",
        ".solar-feature-card",
        ".solar-gallery-item",
        ".solar-blog-card",

        /* About page */
        ".about-section-heading",
        ".about-purpose-card",
        ".about-service-card",
        ".about-team-card",
        ".about-timeline-item",

        /* Services pages */
        ".service-card",
        ".benefit-card",
        ".process-item",
        ".service-detail-section",

        /* Calculator page */
        ".calculator-section-heading",
        ".calculator-info-card",
        ".calculator-benefit-item",
        ".factor-card",
        ".calculator-faq-item",
        ".calculator-reveal",

        /* Gallery page */
        ".gallery-section-heading",
        ".gallery-project-card",
        ".gallery-feature-image",
        ".gallery-feature-content",
        ".gallery-location-content",
        ".gallery-reveal",

        /* Blog pages */
        ".blog-card",
        ".blog-post-card",
        ".blog-detail-content",

        /* Contact page */
        ".contact-section-heading",
        ".contact-info-card",
        ".contact-form-content",
        ".contact-form-card",
        ".contact-map",

        /* Home 2 elements */
        ".premium-reveal",
        ".premium-impact-card",
        ".premium-solution-card",
        ".premium-journey-step",
        ".premium-insight-card"

    ];

    const elements = document.querySelectorAll(
        animationSelectors.join(",")
    );

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (elements.length && !reduceMotion) {

        // Add animation classes and stagger sibling elements
        elements.forEach(function (element) {

            element.classList.add("site-animate-item");

            const siblings = Array.from(
                element.parentElement.children
            ).filter(function (sibling) {

                return sibling.classList.contains("site-animate-item");

            });

            const itemIndex = siblings.indexOf(element);

            element.style.transitionDelay =
                (itemIndex % 4) * 100 + "ms";

        });

        body.classList.add("site-animation-ready");

        // Show hero content immediately
        const heroElements = document.querySelectorAll(
            ".hero-grid > *, " +
            ".page-hero .container > *, " +
            ".premium-hero-inner > *, " +
            ".gallery-hero-content > *, " +
            ".contact-hero-content > *"
        );

        heroElements.forEach(function (element) {

            element.classList.add(
                "site-animate-visible",
                "site-hero-animate"
            );

        });

        // Reveal other elements while scrolling
        if ("IntersectionObserver" in window) {

            const observer = new IntersectionObserver(

                function (entries, currentObserver) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "site-animate-visible"
                            );

                            currentObserver.unobserve(entry.target);

                        }

                    });

                },

                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -35px 0px"
                }

            );

            elements.forEach(function (element) {

                if (!element.classList.contains("site-animate-visible")) {
                    observer.observe(element);
                }

            });

        } else {

            elements.forEach(function (element) {

                element.classList.add("site-animate-visible");

            });

        }

    }

});
