// Wait for full page load instead of just DOM content loaded
window.addEventListener("load", function () {
    console.log("Night mode script running");

    // More flexible navbar selection - try multiple possible selectors
    const navbarNav =
        document.querySelector(".navbar-nav") ||
        document.querySelector(".navbar ul") ||
        document.querySelector("nav ul");

    if (navbarNav) {
        console.log("Found navbar: ", navbarNav);

        // Create the night mode toggle button
        const nightModeListItem = document.createElement("li");
        nightModeListItem.className = "nav-item ms-3";

        const nightModeButton = document.createElement("button");
        nightModeButton.id = "night-mode-toggle";
        nightModeButton.className = "btn btn-sm";
        nightModeButton.innerHTML = "🌙"; // Moon emoji for night mode toggle
        nightModeButton.setAttribute("aria-label", "Toggle Night Mode");

        nightModeListItem.appendChild(nightModeButton);
        navbarNav.appendChild(nightModeListItem);
        console.log("Night mode button added to navbar");

        // Apply saved night mode preference
        const isDarkMode = localStorage.getItem("darkMode") === "true";
        if (isDarkMode) {
            document.body.classList.add("dark-mode");
            nightModeButton.innerHTML = "☀️"; // Sun emoji for day mode toggle
            nightModeButton.classList.add("night-active");
        }

        // Add event listener for night mode toggle
        nightModeButton.addEventListener("click", function () {
            console.log("Night mode toggle clicked");
            document.body.classList.toggle("dark-mode");
            const isDarkMode = document.body.classList.contains("dark-mode");
            localStorage.setItem("darkMode", isDarkMode);

            if (isDarkMode) {
                nightModeButton.innerHTML = "☀️"; // Sun emoji when in dark mode
                nightModeButton.classList.add("night-active");
            } else {
                nightModeButton.innerHTML = "🌙"; // Moon emoji when in light mode
                nightModeButton.classList.remove("night-active");
            }
        });
    } else {
        console.error(
            "Could not find navbar element. Night mode toggle not added."
        );

        // Fallback: Create floating toggle button
        const floatingButton = document.createElement("button");
        floatingButton.id = "floating-night-mode-toggle";
        floatingButton.innerHTML = "🌙";
        floatingButton.setAttribute("aria-label", "Toggle Night Mode");

        // Style the floating button
        floatingButton.style.position = "fixed";
        floatingButton.style.bottom = "20px";
        floatingButton.style.right = "20px";
        floatingButton.style.zIndex = "1000";
        floatingButton.style.width = "40px";
        floatingButton.style.height = "40px";
        floatingButton.style.borderRadius = "50%";
        floatingButton.style.border = "1px solid #ccc";
        floatingButton.style.backgroundColor = "white";
        floatingButton.style.cursor = "pointer";
        floatingButton.style.display = "flex";
        floatingButton.style.alignItems = "center";
        floatingButton.style.justifyContent = "center";

        document.body.appendChild(floatingButton);
        console.log("Added floating night mode button as fallback");

        // Apply saved night mode preference
        const isDarkMode = localStorage.getItem("darkMode") === "true";
        if (isDarkMode) {
            document.body.classList.add("dark-mode");
            floatingButton.innerHTML = "☀️";
            floatingButton.style.backgroundColor = "#333";
        }

        // Add event listener for floating night mode toggle
        floatingButton.addEventListener("click", function () {
            console.log("Floating night mode toggle clicked");
            document.body.classList.toggle("dark-mode");
            const isDarkMode = document.body.classList.contains("dark-mode");
            localStorage.setItem("darkMode", isDarkMode);

            if (isDarkMode) {
                floatingButton.innerHTML = "☀️";
                floatingButton.style.backgroundColor = "#333";
            } else {
                floatingButton.innerHTML = "🌙";
                floatingButton.style.backgroundColor = "white";
            }
        });
    }

    // Check if dark mode was already set before page load
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }
});

// Also handle the DOMContentLoaded event as a backup
document.addEventListener("DOMContentLoaded", function () {
    console.log(
        "DOM Content Loaded - checking if night mode should be applied"
    );
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }
});
