import '../style.css';
import { loadAccountNav } from '../shared/auth-nav.js';


loadAccountNav();


const signupForm =
    document.getElementById("signup-form");

const errorMessage =
    document.getElementById("signup-error");

const passwordInput = document.getElementById("password");
const checklist = document.getElementById("password-checklist");

const passwordRules = {
    length: value => value.length >= 8,
    uppercase: value => /[A-Z]/.test(value),
    lowercase: value => /[a-z]/.test(value),
    number: value => /\d/.test(value),
    special: value => /[^A-Za-z0-9\s]/.test(value)
};

function updatePasswordChecklist() {
    for (const [rule, check] of Object.entries(passwordRules)) {
        const item = checklist.querySelector(`[data-rule="${rule}"]`);
        const passed = check(passwordInput.value);

        item.classList.toggle("is-met", passed);
        item.querySelector("span").textContent = passed ? "✓" : "○";
    }
}

passwordInput.addEventListener("input", updatePasswordChecklist);


signupForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();

        errorMessage.style.display =
            "none";


        const email = document
            .getElementById("email")
            .value
            .trim()
            .toLowerCase();

        const password =
            document
                .getElementById("password")
                .value;

        const confirmPassword =
            document
                .getElementById(
                    "confirm-password"
                )
                .value;


        if (password !== confirmPassword) {

            errorMessage.textContent =
                "Passwords do not match.";

            errorMessage.style.display =
                "block";

            return;

        }


        const signupData = {
            username: email,
            password
        };


        try {

            const response =
                await fetch(
                    "/api/signup",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        credentials: "include",

                        body:
                            JSON.stringify(signupData)
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.error ||
                    "Could not create account."
                );

            }


            console.log(
                "Account created:",
                data
            );


            // Signup automatically logs them in.
            // Send them to complete their profile.

            window.location.href =
                "profile.html";


        } catch (error) {

            console.error(error);

            errorMessage.textContent =
                error.message;

            errorMessage.style.display =
                "block";

        }

    }
);
