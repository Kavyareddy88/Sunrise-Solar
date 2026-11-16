
/* =========================================================
   SUNRISE SOLAR – PREMIUM HOME 2 JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const page = document.querySelector(".sunrise-premium");

    if (!page) return;


    /* =========================================
       1. SCROLL REVEAL ANIMATIONS
    ========================================= */

    const revealElements = page.querySelectorAll(".sp-reveal");

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {

        revealElements.forEach(element => {
            element.classList.add("sp-visible");
        });

    } else {

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("sp-visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    }


    /* =========================================
       2. SAVINGS CALCULATOR
    ========================================= */

    const billInput = page.querySelector("#spSolarBill");

    const coverageInput = page.querySelector(
        "#spSolarCoverage"
    );

    const coverageValue = page.querySelector(
        "#spCoverageValue"
    );

    const calculateButton = page.querySelector(
        "#spCalculate"
    );

    const monthlyOutput = page.querySelector(
        "#spMonthlyResult"
    );

    const annualOutput = page.querySelector(
        "#spAnnualResult"
    );


    if (
        billInput &&
        coverageInput &&
        coverageValue &&
        calculateButton &&
        monthlyOutput &&
        annualOutput
    ) {

        /* FORMAT CURRENCY */

        function formatRupees(value) {

            return "₹" + Math.round(value).toLocaleString("en-IN");

        }


        /* UPDATE COVERAGE */

        function updateCoverage() {

            const coverage = Number(coverageInput.value);

            coverageValue.textContent = coverage + "%";

            coverageInput.style.setProperty(
                "--sp-progress",
                coverage + "%"
            );

        }

        updateCoverage();

        coverageInput.addEventListener(
            "input",
            updateCoverage
        );


        /* CALCULATE ESTIMATE */

        function calculateSavings() {

            const bill = Number(billInput.value);

            const coverage = Number(coverageInput.value);

            if (
                billInput.value.trim() === "" ||
                !Number.isFinite(bill) ||
                bill <= 0 ||
                bill > 10000000
            ) {

                billInput.setCustomValidity(
                    "Please enter a valid monthly electricity bill."
                );

                billInput.reportValidity();

                billInput.focus();

                return;

            }

            billInput.setCustomValidity("");

            const monthlySavings =
                bill * (coverage / 100);

            const annualSavings =
                monthlySavings * 12;

            monthlyOutput.textContent =
                formatRupees(monthlySavings);

            annualOutput.textContent =
                formatRupees(annualSavings);

        }


        calculateButton.addEventListener(
            "click",
            calculateSavings
        );


        /* CLEAR VALIDATION */

        billInput.addEventListener("input", function () {

            billInput.setCustomValidity("");

        });


        /* ENTER KEY */

        billInput.addEventListener("keydown", function (event) {

            if (event.key === "Enter") {

                calculateSavings();

            }

        });

    }


    /* =========================================
       3. SMOOTH INTERNAL NAVIGATION
    ========================================= */

    const internalLinks = page.querySelectorAll(
        'a[href^="#"]'
    );

    internalLinks.forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = page.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({

                behavior: reduceMotion ? "auto" : "smooth",

                block: "start"

            });

        });

    });


    /* =========================================
       4. IMAGE LOADING
    ========================================= */

    const images = page.querySelectorAll("img");

    images.forEach(image => {

        if (image.complete) return;

        image.addEventListener("error", function () {

            image.classList.add("sp-image-error");

        });

    });

});
