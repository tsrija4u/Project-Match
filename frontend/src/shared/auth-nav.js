import { escapeHtml } from './html.js';

export async function loadAccountNav() {

    const authNav =
        document.getElementById("auth-nav");

    if (!authNav) {
        return;
    }

    try {

        const response =
            await fetch(
                "/api/me",
                {
                    credentials: "include"
                }
            );

        if (!response.ok) {

            authNav.innerHTML = `
                <a href="login.html">
                    Login
                </a>

                <a
                    href="signup.html"
                    class="signup-nav-button"
                >
                    Sign Up
                </a>
            `;

            return;
        }

        const user =
            await response.json();

        const displayName = user.name || user.username || "Student";

        const initial =
            displayName
                .charAt(0)
                .toUpperCase();

        authNav.innerHTML = `
            <div class="account-menu">
                <button
                    type="button"
                    class="account-avatar"
                    aria-label="Open account menu for ${escapeHtml(displayName)}"
                    aria-expanded="false"
                    aria-controls="account-dropdown"
                >
                    ${escapeHtml(initial)}
                </button>

                <div class="account-dropdown" id="account-dropdown" hidden>
                    <a href="profile.html">Edit Profile</a>
                    <button type="button">Log Out</button>
                    <button type="button" class="account-delete">Delete Account</button>
                </div>
            </div>
        `;

        const menuButton = authNav.querySelector(".account-avatar");
        const dropdown = authNav.querySelector(".account-dropdown");

        const logoutButton = authNav.querySelector(".account-dropdown button");

        logoutButton.addEventListener("click", async () => {
            try {
                const response =
                    await fetch(
                        "/api/logout",
                        {
                            method: "POST",
                            credentials: "include"
                        }
                    );

                if (!response.ok) {
                    throw new Error(
                        `Logout failed with status ${response.status}`
                    );
                }

                window.location.href = "index.html";
            } catch (error) {
                console.error("Could not log out:", error);
                alert("Could not log out. Please try again.");
            }
        });

        const deleteAccountButton = authNav.querySelector(".account-delete");

        deleteAccountButton.addEventListener("click", async () => {
            const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
            if (!confirmed) {
                return;
            }

            try {
                const response =
                    await fetch("/api/me", {
                        method: "DELETE",
                        credentials: "include"
                    });
                    
                if (!response.ok) {
                    throw new Error(
                        `Delete account failed with status ${response.status}`
                    );
                }

                window.location.href = "index.html";
            } catch (error) {
                console.error("Could not delete account:", error);
                alert("Could not delete account. Please try again.");
            }
        });

        menuButton.addEventListener("click", () => {
            const isOpen = menuButton.getAttribute("aria-expanded") === "true";
            menuButton.setAttribute("aria-expanded", String(!isOpen));
            dropdown.hidden = isOpen;
        });

        document.addEventListener("click", (event) => {
            if (!authNav.contains(event.target)) {
                dropdown.hidden = true;
                menuButton.setAttribute("aria-expanded", "false");
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                dropdown.hidden = true;
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.focus();
            }
        });

    } catch (error) {

        console.error(
            "Could not check login:",
            error
        );

        authNav.innerHTML = `
            <a href="login.html">
                Login
            </a>

            <a href="signup.html">
                Sign Up
            </a>
        `;
    }
}
