
/* ==========================================
   SUNRISE SOLAR - CONTACT FORM
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("solarContactForm");

    const message = document.getElementById("contactFormMessage");

    if (!form || !message) return;


    form.addEventListener("submit", function (event) {

        event.preventDefault();

        message.className = "contact-form-message";
        message.textContent = "";


        // Check form validity

        if (!form.checkValidity()) {

            form.reportValidity();

            message.textContent =
                "Please complete all required fields correctly.";

            message.classList.add("error");

            return;
        }


        // Validate phone number

        const phone = document
            .getElementById("contactPhone")
            .value.trim();

        const phonePattern = /^[0-9+\-\s()]{10,15}$/;

        if (!phonePattern.test(phone)) {

            message.textContent =
                "Please enter a valid phone number.";

            message.classList.add("error");

            return;
        }


        // Validate consent

        const consent = document.getElementById("contactConsent");

        if (!consent.checked) {

            message.textContent =
                "Please agree to be contacted before submitting.";

            message.classList.add("error");

            return;
        }


        // Demo success message

        message.textContent =
            "Thank you for contacting Sunrise Solar! Your form is valid. Connect a form backend to receive your enquiry.";

        message.classList.add("success");

        form.reset();

    });

});
