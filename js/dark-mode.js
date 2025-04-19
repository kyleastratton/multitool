let isDarkMode = localStorage.getItem("darkMode") === "true";

// Wait for full page load instead of just DOM content loaded
window.addEventListener("load", function () {
  console.log("dark mode script running");

  // More flexible navbar selection - try multiple possible selectors
  const navbarNav = document.querySelector(".navbar-subcontainer");
  // document.querySelector(".navbar-nav") ||
  // document.querySelector(".navbar ul") ||
  // document.querySelector("nav ul") ||
  // document.querySelector(".mobilenav-darkmode");

  const darkModeButtonSVG = `<svg width="30" height="30">
        <path
            fill="yellow"
            d="
            M 23, 5
            A 12 12 0 1 0 23, 25
            A 12 12 0 0 1 23, 5"
        />
    </svg>`;

  const lightModeButtonSVG = `<svg width="30" height="30">
        <circle cx="15" cy="15" r="6" fill="yellow" />
    
        <line
        id="ray"
        stroke="yellow"
        stroke-width="2"
        stroke-linecap="round"
        x1="15"
        y1="1"
        x2="15"
        y2="4"
        ></line>
    
        <use href="#ray" transform="rotate(45 15 15)" />
        <use href="#ray" transform="rotate(90 15 15)" />
        <use href="#ray" transform="rotate(135 15 15)" />
        <use href="#ray" transform="rotate(180 15 15)" />
        <use href="#ray" transform="rotate(225 15 15)" />
        <use href="#ray" transform="rotate(270 15 15)" />
        <use href="#ray" transform="rotate(315 15 15)" />
    </svg>`;

  if (navbarNav) {
    console.log("Found navbar: ", navbarNav);

    // Create the dark mode toggle button
    const darkModeListItem = document.createElement("li");
    darkModeListItem.className = "nav-item ms-3";

    const darkModeButton = document.createElement("button");
    darkModeButton.id = "dark-mode-toggle";
    darkModeButton.className = "btn btn-sm";
    // darkModeButton.innerHTML = "🌙"; // Moon emoji for dark mode toggle
    darkModeButton.innerHTML = darkModeButtonSVG;
    darkModeButton.setAttribute("aria-label", "Toggle dark Mode");

    darkModeListItem.appendChild(darkModeButton);
    navbarNav.appendChild(darkModeListItem);
    console.log("dark mode button added to navbar");

    // Apply saved dark mode preference
    // let isDarkMode = localStorage.getItem("darkMode") === "true";
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      // darkModeButton.innerHTML = "☀️"; // Sun emoji for day mode toggle
      darkModeButton.innerHTML = lightModeButtonSVG;
      darkModeButton.classList.add("dark-active");
    }

    // Add event listener for dark mode toggle
    darkModeButton.addEventListener("click", function () {
      console.log("dark mode toggle clicked");
      document.body.classList.toggle("dark-mode");
      let isDarkMode = document.body.classList.contains("dark-mode");
      localStorage.setItem("darkMode", isDarkMode);

      if (isDarkMode) {
        // darkModeButton.innerHTML = "☀️"; // Sun emoji when in dark mode
        darkModeButton.innerHTML = lightModeButtonSVG;
        darkModeButton.classList.add("dark-active");
      } else {
        // darkModeButton.innerHTML = "🌙"; // Moon emoji when in light mode
        darkModeButton.innerHTML = darkModeButtonSVG;
        darkModeButton.classList.remove("dark-active");
      }
    });
  } else {
    console.error("Could not find navbar element. dark mode toggle not added.");

    // Fallback: Create floating toggle button
    const floatingButton = document.createElement("button");
    // const isDarkMode = localStorage.getItem("darkMode") === "true";
    let isDarkMode = localStorage.getItem("darkMode") === "true";
    const applyFloatingButton = isDarkMode
      ? lightModeButtonSVG
      : darkModeButtonSVG;
    floatingButton.id = "floating-dark-mode-toggle";
    floatingButton.innerHTML = applyFloatingButton;
    floatingButton.setAttribute("aria-label", "Toggle dark Mode");

    // Style the floating button
    floatingButton.style.position = "fixed";
    floatingButton.style.bottom = "20px";
    floatingButton.style.right = "20px";
    floatingButton.style.zIndex = "1000";
    floatingButton.style.width = "40px";
    floatingButton.style.height = "40px";
    floatingButton.style.borderRadius = "50%";
    floatingButton.style.border = "1px solid #ccc";
    floatingButton.style.backgroundColor = "#333";
    floatingButton.style.cursor = "pointer";
    floatingButton.style.display = "flex";
    floatingButton.style.alignItems = "center";
    floatingButton.style.justifyContent = "center";

    document.body.appendChild(floatingButton);
    console.log("Added floating dark mode button as fallback");

    // Apply saved dark mode preference
    // const isDarkMode = localStorage.getItem("darkMode") === "true";
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      floatingButton.innerHTML = darkModeButtonSVG;
      floatingButton.style.backgroundColor = "#333";
    }

    // Add event listener for floating dark mode toggle
    floatingButton.addEventListener("click", function () {
      console.log("Floating dark mode toggle clicked");
      document.body.classList.toggle("dark-mode");
      const isDarkMode = document.body.classList.contains("dark-mode");
      localStorage.setItem("darkMode", isDarkMode);

      if (isDarkMode) {
        floatingButton.innerHTML = lightModeButtonSVG;
        floatingButton.style.backgroundColor = "#333";
      } else {
        floatingButton.innerHTML = darkModeButtonSVG;
        floatingButton.style.backgroundColor = "#333";
      }
    });
  }

  // Check if dark mode was already set before page load
  let floatingDarkModeToggle = document.getElementById(
    "floating-dark-mode-toggle"
  );
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
    floatingDarkModeToggle.innerHTML = lightModeButtonSVG;
  }
});

// Also handle the DOMContentLoaded event as a backup
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM Content Loaded - checking if dark mode should be applied");
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
    floatingButton.innerHTML = lightModeButtonSVG;
  }
});
