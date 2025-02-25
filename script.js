document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
});

function parseList(input) {
  return input.split(/\s*,\s*/).filter((item) => item.trim() !== "");
}

function compareLists() {
  let list1 = parseList(document.getElementById("list1").value);
  let list2 = parseList(document.getElementById("list2").value);
  let comparisonType = document.getElementById("comparisonType").value;
  let resultDiv = document.getElementById("result");

  let set1 = new Set(list1);
  let set2 = new Set(list2);
  let result;

  if (comparisonType === "differences") {
    let diff1 = list1.filter((item) => !set2.has(item));
    let diff2 = list2.filter((item) => !set1.has(item));
    result = [...new Set([...diff1, ...diff2])];
  } else {
    result = list1.filter((item) => set2.has(item));
  }

  resultDiv.innerHTML =
    "<strong>Result:</strong> " +
    (result.length ? result.join(", ") : "No results found");
}

function convertToPascalCase() {
  let inputText = document.getElementById("textInput").value;
  let pascalCaseText = inputText
    .toLowerCase()
    .split(/[^a-zA-Z0-9]+/)
    .filter((word) => word.length > 0)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

  let formattedText = pascalCaseText.replace(/([A-Z])/g, " $1").trim();

  document.getElementById("result").textContent = formattedText;
  let result = formattedText;
  const outputElement = document.getElementById("result");
  outputElement.innerText = result;
  outputElement.setAttribute("data-copy", result);
}

function copyToClipboard() {
  const textToCopy = document
    .getElementById("result")
    .getAttribute("data-copy");
  if (textToCopy) {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        showSnackbar();
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  }
}

function showSnackbar() {
  const snackbar = document.getElementById("snackbar");
  snackbar.classList.add("show");

  // Hide snackbar after 3 seconds
  setTimeout(() => {
    snackbar.classList.remove("show");
  }, 3000);
}

function generateString() {
  const charCount = parseInt(document.getElementById("charCount").value) || 0;
  const numCount = parseInt(document.getElementById("numCount").value) || 0;
  const order = document.getElementById("order").value;

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  let charPart = "";
  let numPart = "";

  for (let i = 0; i < charCount; i++) {
    charPart += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  for (let i = 0; i < numCount; i++) {
    numPart += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }

  let result = order === "charFirst" ? charPart + numPart : numPart + charPart;
  const outputElement = document.getElementById("result");
  outputElement.innerText = result;
  outputElement.setAttribute("data-copy", result);
}

// function copyToClipboard() {
//   const textToCopy = document
//     .getElementById("output")
//     .getAttribute("data-copy");
//   if (textToCopy) {
//     navigator.clipboard
//       .writeText(textToCopy)
//       .then(() => {
//         showSnackbar();
//       })
//       .catch((err) => {
//         console.error("Failed to copy: ", err);
//       });
//   }
// }

// function showSnackbar() {
//   const snackbar = document.getElementById("snackbar");
//   snackbar.classList.add("show");

//   // Hide snackbar after 3 seconds
//   setTimeout(() => {
//     snackbar.classList.remove("show");
//   }, 3000);
// }

function pickRandomItem() {
  let input = document.getElementById("itemInput").value;
  let items = input
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item !== "");

  if (items.length === 0) {
    document.getElementById("result").innerText = "Please enter some items.";
    return;
  }

  let randomIndex = Math.floor(Math.random() * items.length);
  document.getElementById("result").innerText = items[randomIndex];
}

// function copyToClipboard() {
//   let text = document.getElementById("result").innerText;
//   if (text) {
//     navigator.clipboard.writeText(text).then(() => {
//       showSnackbar();
//     });
//   }
// }

// function showSnackbar() {
//     const snackbar = document.getElementById("snackbar");
//     snackbar.classList.add("show");

//     // Hide snackbar after 3 seconds
//     setTimeout(() => {
//         snackbar.classList.remove("show");
//     }, 3000);
// }

function expandCharSet(charSet) {
  const expanded = [];
  let i = 0;
  while (i < charSet.length) {
    if (i + 2 < charSet.length && charSet[i + 1] === "-") {
      const start = charSet.charCodeAt(i);
      const end = charSet.charCodeAt(i + 2);

      if (start <= end) {
        for (let code = start; code <= end; code++) {
          expanded.push(String.fromCharCode(code));
        }
      }
      i += 3; // Skip processed range (e.g., 'a-z')
    } else {
      expanded.push(charSet[i]);
      i++;
    }
  }
  return expanded;
}

function randomCharFromSet(charSet) {
  const chars = expandCharSet(charSet);
  return chars.length ? chars[Math.floor(Math.random() * chars.length)] : "";
}

function generateFromSimpleRegex(regex) {
  let result = "";
  const regexPattern = /\\?\[(.*?)](?:\{(\d+)})?/g;
  let match;
  let lastIndex = 0;

  while ((match = regexPattern.exec(regex)) !== null) {
    result += regex.substring(lastIndex, match.index); // Add literal text
    const charSet = match[1];
    const repeat = match[2] ? parseInt(match[2], 10) : 1;

    for (let i = 0; i < repeat; i++) {
      result += randomCharFromSet(charSet);
    }

    lastIndex = regexPattern.lastIndex;
  }

  result += regex.substring(lastIndex); // Add remaining literal text
  return result;
}

function generateStrings() {
  const regexInput = document.getElementById("regexInput").value.trim();
  const count = parseInt(document.getElementById("countInput").value, 10) || 1;
  const outputDiv = document.getElementById("result");
  outputDiv.innerHTML = "";

  if (!regexInput) {
    outputDiv.textContent = "Please enter a regex pattern.";
    return;
  }

  try {
    for (let i = 0; i < count; i++) {
      const generated = generateFromSimpleRegex(regexInput);
      const line = document.createElement("div");
      line.textContent = `Generated ${i + 1}: ${generated}`;
      outputDiv.appendChild(line);
    }
  } catch (error) {
    outputDiv.textContent = "Error: Invalid regex or unsupported pattern.";
  }
}
