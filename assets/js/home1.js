
/* SUNRISE SOLAR – SAVINGS CALCULATOR */

document.addEventListener("DOMContentLoaded", function () {
    const billInput = document.getElementById("solarBill");
    const coverageInput = document.getElementById("solarCoverage");
    const calculateButton = document.getElementById("solarCalculate");
    const monthlyOutput = document.getElementById("solarMonthly");
    const annualOutput = document.getElementById("solarAnnual");

    if (
        !billInput ||
        !coverageInput ||
        !calculateButton ||
        !monthlyOutput ||
        !annualOutput
    ) {
        return;
    }

    calculateButton.addEventListener("click", function () {
        const bill = Number(billInput.value);
        const coverage = Number(coverageInput.value);

        if (!Number.isFinite(bill) || bill <= 0) {
            billInput.focus();
            billInput.setCustomValidity(
                "Please enter a valid monthly electricity bill."
            );
            billInput.reportValidity();
            return;
        }

        billInput.setCustomValidity("");

        const monthlySavings = Math.round(bill * coverage);
        const annualSavings = monthlySavings * 12;

        const formatRupees = value =>
            "₹" + value.toLocaleString("en-IN");

        monthlyOutput.textContent = formatRupees(monthlySavings);
        annualOutput.textContent = formatRupees(annualSavings);
    });

    billInput.addEventListener("input", function () {
        billInput.setCustomValidity("");
    });
});
