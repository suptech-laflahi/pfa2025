document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form");
    const emailInput = document.querySelector("input[name='email']");
    const passwordInput = document.querySelector("input[name='password']");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email) {
            alert("Please enter your email.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (!password) {
            alert("Please enter your password.");
            return;
        }

        if (password.length < 8) {
            alert("Password must be at least 8 characters long.");
            return;
        }

        // Simulate a login check (You can replace this with backend authentication)
        if (email === "test@example.com" && password === "Test1234") {
            alert("Login successful!");
            window.location.href = "dashboard.html"; // Redirect to dashboard or homepage
        } else {
            alert("Invalid email or password.");
        }
    });

    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
});
