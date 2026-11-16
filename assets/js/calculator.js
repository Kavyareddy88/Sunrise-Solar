
/* =====================================================
   SUNRISE SOLAR — SAVINGS CALCULATOR
   Uses the existing calculator HTML and result layout
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("solarSavingsForm");
    const billInput = document.getElementById("monthlyBill");
    const offsetInput = document.getElementById("billOffset");

    const resultBox = document.getElementById("calculatorResults");
    const monthlySavingsOutput = document.getElementById("monthlySavings");
    const annualSavingsOutput = document.getElementById("annualSavings");

    // Check that the required calculator elements exist
    if (
        !form ||
        !billInput ||
        !offsetInput ||
        !resultBox ||
        !monthlySavingsOutput ||
        !annualSavingsOutput
    ) {
        console.error("Solar calculator: Required HTML elements were not found.");
        return;
    }

    // Format values in Indian Rupees
    function formatCurrency(amount) {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }).format(amount);
    }

    // Calculate savings when the form is submitted
    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const monthlyBill = Number(billInput.value);
        const offset = Number(offsetInput.value);

        // Validate the monthly bill
        if (
            billInput.value.trim() === "" ||
            !Number.isFinite(monthlyBill) ||
            monthlyBill < 0
        ) {
            billInput.setCustomValidity("Please enter a valid monthly electricity bill.");
            billInput.reportValidity();
            billInput.focus();
            return;
        }

        billInput.setCustomValidity("");

        // Validate the selected offset
        if (
            !Number.isFinite(offset) ||
            offset < 0 ||
            offset > 100
        ) {
            return;
        }

        // Calculate estimated savings
        const monthlySavings = monthlyBill * (offset / 100);
        const annualSavings = monthlySavings * 12;

        // Update the existing result fields
        monthlySavingsOutput.textContent = formatCurrency(monthlySavings);
        annualSavingsOutput.textContent = formatCurrency(annualSavings);

        // Display the existing results section
        resultBox.hidden = false;
        resultBox.classList.add("result-visible");

        // Bring the results into view
        resultBox.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

    });

    // Clear validation message when the user edits the bill
    billInput.addEventListener("input", function () {
        billInput.setCustomValidity("");
    });

});
