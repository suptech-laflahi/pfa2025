document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const nameInput = document.querySelector("input[type='text']");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const signUpButton = document.querySelector(".btn");

    // Disable button initially
    signUpButton.disabled = true;
    signUpButton.style.opacity = "0.5";

    // Function to validate email format
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Function to check form validity
    function checkFormValidity() {
        if (
            nameInput.value.trim() !== "" &&
            isValidEmail(emailInput.value) &&
            passwordInput.value.length >= 6
        ) {
            signUpButton.disabled = false;
            signUpButton.style.opacity = "1";
        } else {
            signUpButton.disabled = true;
            signUpButton.style.opacity = "0.5";
        }
    }

    // Event listeners for real-time validation
    nameInput.addEventListener("input", checkFormValidity);
    emailInput.addEventListener("input", checkFormValidity);
    passwordInput.addEventListener("input", checkFormValidity);

    // Prevent form submission if invalid
    form.addEventListener("submit", function (event) {
        if (signUpButton.disabled) {
            event.preventDefault();
            alert("Please fill in all fields correctly!");
        }
    });
});
