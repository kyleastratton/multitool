// Navbar and Footer Injection Script

// Store the navbar HTML in a variable
const navbarHTML = `
  <nav class="navbar">
      <div class="container">
          <a href="index.html" id="navbar-brand" class="navbar-brand">Multitool</a>
          <ul class="navbar-links">
              <li><a href="index.html">Home</a></li>
              <li><a href="services.html">Tools</a></li>
              <li><a href="about.html">About</a></li>
              <li><a href="contact.html">Contact</a></li>
          </ul>
      </div>
  </nav>
  <nav class="mobilenav">
    <a href="index.html" id="navbar-brand" class="active">Multitool</a>
    <div id="myLinks">
      <a href="data-generator.html">Data Generator</a>
      <a href="case-converter.html">Case Converter</a>
      <a href="character-generator.html">Character Generator</a>
      <a href="number-generator.html">Number Generator</a>
      <a href="list-comparison.html">List Comparison</a>
      <a href="percentage-calculator.html">Percentage Calculator</a>
      <a href="random-picker.html">Random Picker</a>
      <a href="regex-string-generator.html">Regex String Generator</a>
      <a href="string-replacer.html">String Replacer</a>
    </div>
    <a href="javascript:void(0);" class="icon" onclick="handleHamburgerMenu()">
      <i class="fa fa-bars"></i>
    </a>
  </nav>
`;

// mobile navbar
function handleHamburgerMenu() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

// Store the footer HTML in a variable
const footerHTML = `
<footer>
    <div class="container">
        <div class="footer-grid">
            <!-- Company Info -->
            <div>
                <h3>Multitool</h3>
                <p>Small solutions lead to big breakthroughs!</p>
                <div class="social-icons">
                    <a href="https://x.com/">
                        <span class="sr-only">Twitter</span>
                        <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                        </svg>
                    </a>
                    <a href="https://www.linkedin.com/">
                        <span class="sr-only">LinkedIn</span>
                        <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                        </svg>
                    </a>
                    <a href="https://github.com/kyleastratton/multitool">
                        <span class="sr-only">GitHub</span>
                        <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path>
                        </svg>
                    </a>
                </div>
            </div>
            
            <!-- Quick Links -->
            <div>
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="services.html">Tools</a></li>
                    <li><a href="blog.html">Blog</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </div>
            
            <!-- Contact Info -->
            <div>
                <h3>Contact Us</h3>
                <address>
                    <!--
                    <p>1/2 Main Street</p>
                    <p>London</p>
                    <p>T35T 1NG</p>
                    -->
                    <p>
                        <span class="font-semibold">Email:</span>
                        <a href="mailto:kyle.stratton@example.com">kyle.stratton@example.com</a>
                    </p>
                    <!--
                    <p>
                        <span class="font-semibold">Phone:</span>
                        <a href="tel:+11234567890">(123) 456-7890</a>
                    </p>
                    -->
                </address>
            </div>
        </div>
        
        <div class="footer-bottom">
            <p>&copy; 2025 Kyle Stratton. All rights reserved.</p>
            <div class="footer-links">
                <a href="privacy.html">Privacy Policy</a>
                <a href="terms.html">Terms of Service</a>
                <a href="cookies.html">Cookie Policy</a>
            </div>
        </div>
    </div>
</footer>
`;

// Function to inject navbar and footer
function injectComponents() {
  // Find the navbar and footer containers
  const navbarContainer = document.getElementById("navbar-container");
  const footerContainer = document.getElementById("footer-container");

  // Inject the HTML
  if (navbarContainer) {
    navbarContainer.innerHTML = navbarHTML;
  }

  if (footerContainer) {
    footerContainer.innerHTML = footerHTML;
  }
}

// Add screen reader only class for accessibility
document.head.insertAdjacentHTML(
  "beforeend",
  `
<style>
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
}
</style>
`
);

// Call the function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", injectComponents);
