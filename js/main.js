//! Dropdown menu
let selected = null;
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("dropdownToggle");
  const dropdown = document.getElementById("dropdownMenu");

  // Only execute if both elements exist
  if (toggleBtn && dropdown) {
    toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent event bubbling
      dropdown.style.display =
        dropdown.style.display === "block" ? "none" : "block";
    });

    // Hide dropdown when clicking outside
    document.addEventListener("click", () => {
      dropdown.style.display = "none";
    });

    // Optional: Select option and update toggle text
    const dropdownItems = dropdown.querySelectorAll("li");
    if (dropdownItems.length > 0) {
      dropdownItems.forEach((item) => {
        item.addEventListener("click", () => {
          selected = item.dataset.value;
          toggleBtn.textContent = item.textContent;
          dropdown.style.display = "none";
        });
      });
    }
  }
});

//! Render results logic
function updateResult(resultId, value, isError = false) {
  let resultBox = document.getElementById(resultId);

  if (!resultBox) return; // Safety check

  resultBox.textContent = value;
  resultBox.style.display = "inline-block"; // Show result

  // Reset error class first, then apply conditionally
  resultBox.classList.remove("error");
  if (isError) {
    resultBox.classList.add("error");
  }
}

function parseList(input) {
  return input.split(/\s*,\s*/).filter((item) => item.trim() !== "");
}

function compareLists() {
  let list1 = parseList(document.getElementById("list1").value);
  let list2 = parseList(document.getElementById("list2").value);
  let comparisonType = selected;

  if (comparisonType === null) {
    let comparisonType = "differences";
  }

  let set1 = new Set(list1);
  let set2 = new Set(list2);
  let result;

  if (comparisonType === "differences") {
    let diff1 = list1.filter((item) => !set2.has(item));
    let diff2 = list2.filter((item) => !set1.has(item));
    result = [...new Set([...diff1, ...diff2])];
  }
  if (comparisonType === "matches") {
    result = list1.filter((item) => set2.has(item));
  } else {
    let diff1 = list1.filter((item) => !set2.has(item));
    let diff2 = list2.filter((item) => !set1.has(item));
    result = [...new Set([...diff1, ...diff2])];
  }

  if (list1.length === 0) {
    updateResult(
      "result",
      "Error: Please make sure a list has been added to List 1 and List 2.",
      true
    );
    return;
  }

  if (result.length === 0) {
    updateResult("result", "Error: No results found.", true);
    return;
  }

  updateResult("result", `${result.join(", ")}`);
}

function toTitleCase(str) {
  return str.toLowerCase().replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });
}

function convertText() {
  const text = document.getElementById("textInput").value;
  const caseType = selected;
  let convertedText = "";

  if (text.length < 1) {
    updateResult("result", "Error: Please enter text to convert.", true);
    return;
  }

  if (!caseType) {
    // updateResult("result", "Error: Please select a casing option.", true);
    // Just use Title Case if no option selected
    convertedText = toTitleCase(text);
    updateResult("result", `${convertedText}`);
    document.getElementById("result").setAttribute("data-copy", convertedText);
    return;
  }

  switch (caseType) {
    case "title_case":
      convertedText = toTitleCase(text);
      break;
    case "sentence":
      convertedText =
        text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
      break;
    case "uppercase":
      convertedText = text.toUpperCase();
      break;
    case "lowercase":
      convertedText = text.toLowerCase();
      break;
    case "alternating":
      convertedText = text
        .split("")
        .map((char, i) =>
          i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
        )
        .join("");
      break;
    case "inverse":
      convertedText = text
        .split("")
        .map((char) =>
          char === char.toLowerCase() ? char.toUpperCase() : char.toLowerCase()
        )
        .join("");
      break;
    case "snake":
      convertedText = text.toLowerCase().replace(/\s+/g, "_");
      break;
    case "kebab":
      convertedText = text.toLowerCase().replace(/\s+/g, "-");
      break;
    case "camel":
      convertedText = text
        .toLowerCase()
        .replace(/(?:\s+|^)(\w)/g, (match, p1, offset) =>
          offset === 0 ? p1.toLowerCase() : p1.toUpperCase()
        );
      break;
    case "pascal":
      convertedText = text
        .toLowerCase()
        .replace(/(?:\s+|^)(\w)/g, (match, p1) => p1.toUpperCase());
      break;
    case "screaming_snake":
      convertedText = text.toUpperCase().replace(/\s+/g, "_");
      break;
    case "screaming_kebab":
      convertedText = text.toUpperCase().replace(/\s+/g, "-");
      break;
    case "train":
      convertedText = text
        .toLowerCase()
        .split(/\s+/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("-");
      break;
    default:
      convertedText = text;
  }

  updateResult("result", `${convertedText}`);
  document.getElementById("result").setAttribute("data-copy", convertedText);
}

function copyToClipboard(selectorId) {
  const textToCopy = document
    .getElementById(selectorId)
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

function generateAlphabeticalString(length) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function generateNumber(length) {
  var result = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function generateString() {
  const charCount = parseInt(document.getElementById("charCount").value) || 0;
  const numCount = parseInt(document.getElementById("numCount").value) || 0;

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

  let result =
    selected === "numFirst" ? numPart + charPart : charPart + numPart;
  const outputElement = document.getElementById("result");
  updateResult("result", result);
  outputElement.setAttribute("data-copy", result);
}

function pickRandomItem() {
  let input = document.getElementById("itemInput").value;
  let items = input
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item !== "");

  if (items.length === 0) {
    updateResult("result", "Error: Please enter some items.", true);
    return;
  }

  let result = Math.floor(Math.random() * items.length);
  updateResult("result", `${items[result]}`);
  document.getElementById("result").setAttribute("data-copy", result);
}

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
  // const count = parseInt(document.getElementById("countInput").value, 10) || 1;

  if (!regexInput) {
    updateResult("result", "Error: Please enter a regex pattern.", true);
    return;
  }

  try {
    // for (let i = 0; i < count; i++) {
    const generated = generateFromSimpleRegex(regexInput);
    result = `${generated}`;
    updateResult("result", `${result}`);
    document.getElementById("result").setAttribute("data-copy", result);
    // }
  } catch (error) {
    // outputDiv.textContent = "Error: Invalid regex or unsupported pattern.";
    updateResult(
      "result",
      "Error: Invalid regex or unsupported pattern.",
      true
    );
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//! Name logic
function generateName(selectorId) {
  let maleNames = [
    "Andrew",
    "Adam",
    "Adrian",
    "Alan",
    "Allan",
    "Aaron",
    "Alex",
    "Alexander",
    "Anthony",
    "Austin",
    "Archer",
    "Arthur",
    "Aiden",
    "Abraham",
    "Alfred",
    "Alastair",
    "Alasdair",
    "Arnold",
    "Angus",
    "Ben",
    "Benjamin",
    "Barry",
    "Brandon",
    "Blair",
    "Bryce",
    "Blake",
    "Brian",
    "Bryan",
    "Bradley",
    "Bruce",
    "Billy",
    "Bob",
    "Charles",
    "Charlie",
    "Carl",
    "Connor",
    "Cory",
    "Calvin",
    "Cameron",
    "Christian",
    "Callum",
    "Clark",
    "Chandler",
    "Christopher",
    "Chris",
    "Callan",
    "Craig",
    "Daniel",
    "David",
    "Derek",
    "Donald",
    "Declan",
    "Damian",
    "Drew",
    "Danny",
    "Darren",
    "Douglas",
    "Duncan",
    "Dustin",
    "Dennis",
    "Darnell",
    "Desmond",
    "Domenic",
    "Dwight",
    "Drake",
    "Eric",
    "Ethan",
    "Elijah",
    "Ezekiel",
    "Elliot",
    "Evan",
    "Eugene",
    "Edmund",
    "Ewan",
    "Earl",
    "Emmit",
    "Erwin",
    "Edward",
    "Fraser",
    "Franic",
    "Fred",
    "Frank",
    "Fletcher",
    "Graham",
    "Gerald",
    "Gary",
    "Gabriel",
    "Gavin",
    "George",
    "Grant",
    "Garrett",
    "Gregory",
    "Gordon",
    "Geoffrey",
    "Harry",
    "Henry",
    "Hector",
    "Harvey",
    "Hugo",
    "Hank",
    "Isaac",
    "Irwin",
    "James",
    "Jamie",
    "Jerry",
    "John",
    "Jack",
    "Jacob",
    "Joseph",
    "Joshua",
    "Jordon",
    "Justin",
    "Jeremy",
    "Johnny",
    "Jake",
    "Kyle",
    "Kevin",
    "Kaiden",
    "Kane",
    "Kenneth",
    "Kieran",
    "Kian",
    "Lewis",
    "Liam",
    "Lucas",
    "Luke",
    "Lachlan",
    "Martin",
    "Michael",
    "Matthew",
    "Macolm",
    "Martin",
    "Nathan",
    "Nicholas",
    "Neil",
    "Oscar",
    "Oliver",
    "Owen",
    "Peter",
    "Paul",
    "Patrick",
    "Phillip",
    "Pierce",
    "Ross",
    "Reese",
    "Ryan",
    "Rory",
    "Richard",
    "Steven",
    "Stephen",
    "Sam",
    "Samual",
    "Spencer",
    "Shane",
    "Shawn",
    "Sean",
    "Scott",
    "Simon",
    "Trevor",
    "Thomas",
    "Taylor",
    "Tyler",
    "Timothy",
    "Troy",
    "Tony",
    "Toby",
    "Todd",
    "Victor",
    "Vincent",
    "William",
    "Warren",
    "Walter",
    "Wayne",
    "Zachary",
    "Zane",
    "Zack",
  ];

  let femaleNames = [
    "Ashley",
    "Amber",
    "Alice",
    "Alicia",
    "Alison",
    "Allison",
    "Amelia",
    "Amy",
    "Aria",
    "Abigail",
    "Addison",
    "Audrey",
    "Anne",
    "Anna",
    "Alexis",
    "Andrea",
    "Ariel",
    "Arianna",
    "Alexandra",
    "Annie",
    "Angela",
    "Arielle",
    "Astrid",
    "April",
    "Allana",
    "Abby",
    "Angelica",
    "Adrianna",
    "Andi",
    "Brooke",
    "Barbara",
    "Beverely",
    "Bailey",
    "Blake",
    "Bella",
    "Brianna",
    "Bonnie",
    "Bethany",
    "Bridget",
    "Charlotte",
    "Chloe",
    "Cora",
    "Caroline",
    "Caitlin",
    "Carly",
    "Clara",
    "Catherine",
    "Christina",
    "Chelsea",
    "Carolyn",
    "Connie",
    "Cheryl",
    "Candice",
    "Daisey",
    "Danielle",
    "Demi",
    "Deborah",
    "Emma",
    "Ellie",
    "Erica",
    "Emily",
    "Elizabeth",
    "Eva",
    "Erin",
    "Evelyn",
    "Elaine",
    "Eileen",
    "Franchesca",
    "Florance",
    "Gabriella",
    "Grace",
    "Gemma",
    "Gracie",
    "Gwen",
    "Gloria",
    "Gloria",
    "Georgia",
    "Hazel",
    "Harper",
    "Hailey",
    "Hazel",
    "Heidi",
    "Holly",
    "Helen",
    "Hannah",
    "Harriet",
    "Helena",
    "Hayley",
    "Harrietta",
    "Isobel",
    "Ivy",
    "Irene",
    "Imogene",
    "Jessica",
    "Jade",
    "Jesse",
    "June",
    "Juliette",
    "Jasmine",
    "Juliana",
    "Jane",
    "Juliet",
    "Jocelyn",
    "Jacqueline",
    "Jennifer",
    "Joy",
    "Jamie",
    "Jemma",
    "Katie",
    "Karen",
    "Kylie",
    "Kimberley",
    "Khloe",
    "Kiara",
    "Kate",
    "Keira",
    "Kayleigh",
    "Kelsey",
    "Kathryn",
    "Kathleen",
    "Kelly",
    "Lucy",
    "Lauren",
    "Lily",
    "Leah",
    "Lillian",
    "Luciana",
    "Lucille",
    "Laura",
    "Lexi",
    "Leslie",
    "Lara",
    "Linda",
    "Lorraine",
    "Lesly",
    "Lillith",
    "Mary",
    "Margaret",
    "Mia",
    "Maddison",
    "Melanie",
    "Madeline",
    "Molly",
    "Mabel",
    "Melissa",
    "Michelle",
    "Murphy",
    "Miranda",
    "Marie",
    "Megan",
    "Nancy",
    "Natalie",
    "Natalia",
    "Nicole",
    "Nicola",
    "Nadia",
    "Natasha",
    "Nadine",
    "Niomi",
    "Norma",
    "Olivia",
    "Ophelia",
    "Penelope",
    "Piper",
    "Paige",
    "Poppy",
    "Pauline",
    "Paula",
    "Patricia",
    "Riley",
    "Ruby",
    "Ruth",
    "Ryleigh",
    "Rachel",
    "Rachael",
    "Rosemary",
    "Rosie",
    "Rose",
    "Robin",
    "Robyn",
    "Rebecca",
    "Rhianna",
    "Roslyn",
    "Sophie",
    "Sophia",
    "Scarlett",
    "Sarah",
    "Sienna",
    "Sara",
    "Summer",
    "Samantha",
    "Skye",
    "Sage",
    "Sabrina",
    "Sylvia",
    "Stephanie",
    "Sasha",
    "Sam",
    "Samira",
    "Sharon",
    "Shannon",
    "Stacey",
    "Susanna",
    "Susan",
    "Stacy",
    "Sally",
    "Shirley",
    "Sheila",
    "Shae",
    "Siobhan",
    "Tyler",
    "Teagan",
    "Teresa",
    "Theresa",
    "Tara",
    "Tamara",
    "Toni",
    "Tahlia",
    "Violet",
    "Victoria",
    "Valarie",
    "Vanessa",
    "Veronica",
    "Vivian",
    "Wendy",
    "Whittney",
    "Yasmine",
    "Yvonne",
    "Zoe",
    "Zoey",
    "Zara",
    "Zahra",
  ];

  let surname = [
    "Abbett",
    "Abbott",
    "Abrahams",
    "Accord",
    "Ackerman",
    "Adams",
    "Addington",
    "Ahmed",
    "Alderson",
    "Allen",
    "Altman",
    "Anderson",
    "Archer",
    "Armstrong",
    "Ash",
    "Ashford",
    "Ashton",
    "Aspen",
    "Atkins",
    "Atkinson",
    "Austin",
    "Avery",
    "Bachelor",
    "Bailey",
    "Baker",
    "Baldwin",
    "Ball",
    "Banks",
    "Barber",
    "Barker",
    "Barnes",
    "Barnett",
    "Barr",
    "Barrett",
    "Bates",
    "Baxter",
    "Becker",
    "Bell",
    "Benjamin",
    "Benne",
    "Bennett",
    "Benson",
    "Berkeley",
    "Bernhard",
    "Berry",
    "Birch",
    "Bird",
    "Black",
    "Blackburn",
    "Blackwell",
    "Blackwood",
    "Blyth",
    "Bolton",
    "Bond",
    "Booth",
    "Boswell",
    "Bowman",
    "Boyd",
    "Boyle",
    "Bradford",
    "Bradshaw",
    "Braithwaite",
    "Brannigan",
    "Bray",
    "Brent",
    "Brett",
    "Bridges",
    "Briggs",
    "Brock",
    "Brooks",
    "Brown",
    "Browne",
    "Bruce",
    "Bryant",
    "Bryne",
    "Buchanan",
    "Buckingham",
    "Buckley",
    "Bull",
    "Burke",
    "Burney",
    "Burns",
    "Burrows",
    "Burton",
    "Butcher",
    "Butler",
    "Cain",
    "Calder",
    "Calderwood",
    "Campbell",
    "Carell",
    "Carlock",
    "Carpenter",
    "Carr",
    "Carroll",
    "Carter",
    "Cartwright",
    "Cassell",
    "Cassells",
    "Cavanagh",
    "Cavanaugh",
    "Cedar",
    "Chadwick",
    "Chambers",
    "Chang",
    "Changretta",
    "Chaplin",
    "Chapman",
    "Chase",
    "Cheney",
    "Cherry",
    "Christensan",
    "Christie",
    "Clancy",
    "Clark",
    "Clarke",
    "Clements",
    "Clifford",
    "Coates",
    "Cochran",
    "Coen",
    "Cole",
    "Coleman",
    "Collins",
    "Colman",
    "Combs",
    "Conrad",
    "Cook",
    "Cooper",
    "Coppersmith",
    "Cortez",
    "Cosgrove",
    "Coulter",
    "Cox",
    "Craig",
    "Crain",
    "Crane",
    "Crawford",
    "Cruickshank",
    "Cunningham",
    "Curtis",
    "Cutter",
    "Dale",
    "Dalgleish",
    "Daniels",
    "Davenport",
    "Davey",
    "David",
    "Davidson",
    "Davies",
    "Davison",
    "Dawson",
    "Day",
    "Dean",
    "Deans",
    "Delaney",
    "Deluca",
    "Demarco",
    "Dempsey",
    "Devine",
    "Devlin",
    "Diaz",
    "Dickson",
    "Dixon",
    "Dodd",
    "Doherty",
    "Donaldson",
    "Donnell",
    "Donnelly",
    "Douglas",
    "Doyle",
    "Ducksworth",
    "Dudley",
    "Duffy",
    "Duncan",
    "Dunlop",
    "Dunn",
    "Durst",
    "Dutton",
    "Dyer",
    "Edwards",
    "Eisenberg",
    "Eldridge",
    "Elliot",
    "Ellis",
    "Elm",
    "Evans",
    "Fairley",
    "Farmer",
    "Farnsworth",
    "Farrell",
    "Faulkner",
    "Fenton",
    "Ferguson",
    "Ferrall",
    "Field",
    "Finch",
    "Finlay",
    "Finley",
    "Finn",
    "Firth",
    "Fisher",
    "Fitz",
    "Fitzgerald",
    "Fitzpatrick",
    "Flanagan",
    "Fleetwood",
    "Fleming",
    "Flemming",
    "Fletcher",
    "Flores",
    "Flynn",
    "Foley",
    "Forbes",
    "Foreman",
    "Forrest",
    "Foster",
    "Fowler",
    "Frankson",
    "Freeman",
    "Frost",
    "Fry",
    "Fuller",
    "Fulton",
    "Galbraith",
    "Gallagher",
    "Garcia",
    "Gardiner",
    "Gardner",
    "Garrett",
    "Gately",
    "Gent",
    "Gibbons",
    "Gibson",
    "Gillett",
    "Gilmour",
    "Glassford",
    "Glover",
    "Goddard",
    "Gold",
    "Gonzales",
    "Goodfellow",
    "Goodman",
    "Goodwin",
    "Gordon",
    "Gorman",
    "Gould",
    "Graham",
    "Gray",
    "Green",
    "Greene",
    "Greenwood",
    "Gregory",
    "Grey",
    "Grierson",
    "Griffin",
    "Griggs",
    "Grimes",
    "Groves",
    "Gunn",
    "Haggerty",
    "Hahn",
    "Halford",
    "Hall",
    "Halpert",
    "Halsey",
    "Hamlin",
    "Hancock",
    "Hannah",
    "Hannon",
    "Hanson",
    "Hardie",
    "Harding",
    "Hardwick",
    "Hardy",
    "Hargreaves",
    "Harper",
    "Harris",
    "Harrison",
    "Hart",
    "Harte",
    "Hartley",
    "Harwood",
    "Hawking",
    "Hawkins",
    "Hawthorn",
    "Hay",
    "Haynes",
    "Haywood",
    "Healy",
    "Heath",
    "Helm",
    "Hemlock",
    "Henderson",
    "Hendley",
    "Hendry",
    "Henry",
    "Herd",
    "Herrmann",
    "Hicks",
    "Higgins",
    "Hill",
    "Hilton",
    "Hobbs",
    "Hodges",
    "Hoffman",
    "Hogarth",
    "Hogg",
    "Holden",
    "Holden",
    "Holland",
    "Holloway",
    "Holmes",
    "Hood",
    "Hooper",
    "Hoover",
    "Hope",
    "Hopkins",
    "Houghton",
    "Howard",
    "Howell",
    "Hughes",
    "Hume",
    "Hunt",
    "Hunter",
    "Hurst",
    "Hutchins",
    "Hutchinson",
    "Hutchison",
    "Hyde",
    "Hynd",
    "Ingram",
    "Iqbal",
    "Irvine",
    "Jackson",
    "Jacobson",
    "Jamieson",
    "Jarvis",
    "Jenkins",
    "Jenner",
    "Jennings",
    "Jenson",
    "Johnson",
    "Johnston",
    "Jones",
    "Jordan",
    "Juniper",
    "Kaur",
    "Kearney",
    "Kellogg",
    "Kellogg",
    "Kelly",
    "Kemp",
    "Kennedy",
    "Kent",
    "Kepner",
    "Kerr",
    "Ketchum",
    "Keyes",
    "Khan",
    "Kim",
    "Kimber",
    "King",
    "Kirby",
    "Kirk",
    "Kirkman",
    "Kirkpatrick",
    "Kirkwood",
    "Klein",
    "Knight",
    "Knott",
    "Knowles",
    "Koopman",
    "Kutner",
    "Lamb",
    "Lambert",
    "Lane",
    "Langley",
    "Larson",
    "Lasky",
    "Laurie",
    "Law",
    "Lawson",
    "Lazarus",
    "Lee",
    "Lees",
    "Lennon",
    "Lewin",
    "Lewis",
    "Lister",
    "Little",
    "Lloyd",
    "Locke",
    "Long",
    "Lowe",
    "Lucas",
    "Lynch",
    "Lyons",
    "MacAndrew",
    "MacDonald",
    "MacFarlane",
    "MacGregor",
    "MacInnes",
    "MacKay",
    "MacKenzie",
    "MacLachlan",
    "MacManus",
    "MacMillan",
    "MacNeil",
    "MacRoberts",
    "MacTavish",
    "Maclean",
    "Macleod",
    "Maguire",
    "Mahoney",
    "Malik",
    "Malone",
    "Mann",
    "Manning",
    "Marek",
    "Markhov",
    "Markle",
    "Marsden",
    "Marsh",
    "Marshall",
    "Marston",
    "Martell",
    "Martin",
    "Martinez",
    "Mason",
    "Matthews",
    "Maxwell",
    "May",
    "McAdams",
    "McAnulty",
    "McBride",
    "McCarthy",
    "McCay",
    "McCluskey",
    "McColl",
    "McCormack",
    "McCracken",
    "McCreary",
    "McCullough",
    "McCumisky",
    "McCusker",
    "McDermitt",
    "McDonald",
    "McDonnell",
    "McDougall",
    "McDowell",
    "McEleney",
    "McFarlane",
    "McFazdean",
    "McGill",
    "McGinty",
    "McGowan",
    "McGregor",
    "McIntosh",
    "McIntyre",
    "McKee",
    "McKendrick",
    "McKenna",
    "McKenzie",
    "McKidd",
    "McKie",
    "McKinnon",
    "McLaren",
    "McLaughlin",
    "McLean",
    "McLellan",
    "McLennan",
    "McLeod",
    "McMillan",
    "McNab",
    "McNeill",
    "McPherson",
    "McQueen",
    "McShane",
    "Mellor",
    "Mendez",
    "Metcalfe",
    "Meyer",
    "Middleton",
    "Millar",
    "Miller",
    "Mills",
    "Milne",
    "Milton",
    "Mitchell",
    "Monroe",
    "Montgomery",
    "Moore",
    "Morales",
    "Moreland",
    "Morgan",
    "Morris",
    "Morrison",
    "Morton",
    "Moss",
    "Moss",
    "Muir",
    "Muirhead",
    "Munro",
    "Murdock",
    "Murphy",
    "Murray",
    "Nash",
    "Nelson",
    "Newman",
    "Newton",
    "Nicholls",
    "Nightingale",
    "Nixon",
    "Noble",
    "Norman",
    "Norton",
    "Nottingham",
    "Novak",
    "O'Brien",
    "O'Connoll",
    "O'Connor",
    "O'Donnell",
    "O'Leary",
    "O'Malley",
    "O'Neill",
    "O'Sullivan",
    "Oak",
    "Ormiston",
    "Orr",
    "Osborne",
    "Osbourne",
    "Owens",
    "Page",
    "Palmer",
    "Park",
    "Parker",
    "Parkes",
    "Parkinson",
    "Parks",
    "Parsons",
    "Patel",
    "Patel",
    "Patterson",
    "Payne",
    "Payton",
    "Peacock",
    "Pearce",
    "Pearson",
    "Peck",
    "Peletier",
    "Penn",
    "Pepper",
    "Peters",
    "Pettigrew",
    "Phelps",
    "Phillips",
    "Pickering",
    "Pine",
    "Pollard",
    "Pollock",
    "Polson",
    "Poole",
    "Porter",
    "Posner",
    "Potter",
    "Potts",
    "Poulson",
    "Powell",
    "Prescott",
    "Preston",
    "Price",
    "Prince",
    "Pringle",
    "Purdie",
    "Quin",
    "Quinn",
    "Rafferty",
    "Rahmam",
    "Ralston",
    "Ramirez",
    "Ramos",
    "Ramsay",
    "Ramsey",
    "Rayburn",
    "Reed",
    "Reeves",
    "Reid",
    "Rettie",
    "Reynolds",
    "Rhodes",
    "Rice",
    "Richards",
    "Richardson",
    "Riddell",
    "Riggs",
    "Riley",
    "Ritchie",
    "Rivers",
    "Robbins",
    "Roberts",
    "Robertson",
    "Robinovitch",
    "Robins",
    "Robinson",
    "Robson",
    "Rodriguez",
    "Rodríguez",
    "Rogers",
    "Roland",
    "Roland",
    "Rose",
    "Ross",
    "Rowan",
    "Rowe",
    "Rowland",
    "Rowley",
    "Runne",
    "Russell",
    "Rutherford",
    "Sabre",
    "Salmon",
    "Samson",
    "Sanchez",
    "Sanders",
    "Sanderson",
    "Santiago",
    "Saunders",
    "Schmidt",
    "Schmitt",
    "Schofield",
    "Schwarz",
    "Scott",
    "Sharp",
    "Sharpe",
    "Shaw",
    "Shelby",
    "Shelton",
    "Shepherd",
    "Sheppard",
    "Sherman",
    "Shore",
    "Short",
    "Siggard",
    "Silverman",
    "Simmons",
    "Simpson",
    "Sims",
    "Sinclair",
    "Singleton",
    "Skinner",
    "Slater",
    "Sloan",
    "Smalls",
    "Smart",
    "Smith",
    "Snow",
    "Solomans",
    "Somerville",
    "Spalding",
    "Sparks",
    "Specter",
    "Spencer",
    "Spring",
    "Stanley",
    "Stark",
    "Stein",
    "Stephenson",
    "Sterling",
    "Stevens",
    "Stevenson",
    "Stewart",
    "Stiles",
    "Stokes",
    "Stone",
    "Strong",
    "Sullivan",
    "Summer",
    "Sumners",
    "Sutherland",
    "Sutton",
    "Swan",
    "Sweeney",
    "Sweeny",
    "Swift",
    "Sycamore",
    "Tait",
    "Tanaka",
    "Tate",
    "Tayler",
    "Taylor",
    "Thomas",
    "Thompson",
    "Thomson",
    "Thorne",
    "Thornton",
    "Thorpe",
    "Todd",
    "Tomlinson",
    "Torres",
    "Townsend",
    "Trenton",
    "Tucker",
    "Turnbull",
    "Turner",
    "Urban",
    "Vale",
    "Valentia",
    "Vaughn",
    "Vickers",
    "Vickers",
    "Vincent",
    "Waddell",
    "Wade",
    "Walford",
    "Walker",
    "Wall",
    "Wallace",
    "Walls",
    "Walnut",
    "Walsh",
    "Walton",
    "Ward",
    "Warner",
    "Waters",
    "Watkins",
    "Watson",
    "Watts",
    "Weaver",
    "Webb",
    "Webber",
    "Webster",
    "Welch",
    "Welche",
    "Wellick",
    "Wells",
    "Wernstrom",
    "Wessing",
    "West",
    "Weston",
    "Wexler",
    "Wheaton",
    "Wheeler",
    "Whitaker",
    "White",
    "Whitebeam",
    "Whitehead",
    "Whitehouse",
    "Whitman",
    "Whitmore",
    "Whittle",
    "Whyte",
    "Wilde",
    "Wilkins",
    "Wilkinson",
    "Williams",
    "Williamson",
    "Willow",
    "Wilson",
    "Winter",
    "Witcher",
    "Wong",
    "Wood",
    "Woodcock",
    "Woods",
    "Woodward",
    "Wright",
    "Wyatt",
    "Wynn",
    "Yates",
    "Young",
    "Zane",
    "Ziegler",
  ];

  const firstName = maleNames.concat(femaleNames);
  let getFirstName = Math.floor(Math.random() * firstName.length);
  let generatedFirstName = firstName[getFirstName];
  let getSurname = Math.floor(Math.random() * surname.length);
  let generatedSurname = surname[getSurname];
  let result = generatedFirstName + " " + generatedSurname;
  document.getElementById(selectorId).innerText = result;
  document.getElementById(selectorId).setAttribute("data-copy", result);
}

//! Matter number logic
function generateMatterNumber(selectorId, nameId) {
  let name = document.getElementById(nameId).innerText;
  let splitName = name.split(" ");
  let surname = splitName[1];
  let clientNumber = getRandomInt(99);
  if (clientNumber < 10) {
    clientNumber = clientNumber.toString().padStart(2, "0");
  }
  let fileNumber = getRandomInt(99);
  if (fileNumber < 10) {
    fileNumber = fileNumber.toString().padStart(2, "0");
  }
  let part1 = surname.substring(0, 3);
  let part1Formatted = part1.toUpperCase();
  let result = part1Formatted + clientNumber + "-" + fileNumber;
  document.getElementById(selectorId).innerText = result;
  document.getElementById(selectorId).setAttribute("data-copy", result);
}

//! Address Logic
function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateAddress(selectorId) {
  const streetNames = [
    "High Street",
    "Station Road",
    "Main Street",
    "Park Avenue",
    "Church Lane",
    "Victoria Road",
    "Queensway",
    "London Road",
    "King Street",
    "New Road",
  ];
  const townsAndPostcodes = [
    { town: "Manchester", postcode: "M1 1AE" },
    { town: "Birmingham", postcode: "B1 1AA" },
    { town: "Liverpool", postcode: "L1 1AF" },
    { town: "Glasgow", postcode: "G1 1AL" },
    { town: "London", postcode: "EC1A 1BB" },
    { town: "Leeds", postcode: "LS1 1UR" },
    { town: "Sheffield", postcode: "S1 2GU" },
    { town: "Bristol", postcode: "BS1 2EP" },
    { town: "Cardiff", postcode: "CF10 1DX" },
    { town: "Edinburgh", postcode: "EH1 1BP" },
  ];
  const houseNumber = Math.floor(Math.random() * 200) + 1;
  const street = getRandomItem(streetNames);
  const { town, postcode } = getRandomItem(townsAndPostcodes);

  let formattedStreet;

  if (Math.random() < 0.25) {
    const unitNumber = Math.floor(Math.random() * 5) + 1;
    formattedStreet = `${unitNumber}/${houseNumber} ${street}`;
  } else {
    formattedStreet = `${houseNumber} ${street}`;
  }

  const result = `${formattedStreet}, ${town}, ${postcode}`;
  document.getElementById(selectorId).innerText = result;
  document.getElementById(selectorId).setAttribute("data-copy", result);
}

//! Telephone number logic
function generateTelephoneNumber(selectorId) {
  const result = "01632 960 " + generateNumber(3);
  document.getElementById(selectorId).innerText = result;
  document.getElementById(selectorId).setAttribute("data-copy", result);
}

//! Mobile number logic
function generateMobileNumber(selectorId) {
  const result = "0770 090 0" + generateNumber(3);
  document.getElementById(selectorId).innerText = result;
  document.getElementById(selectorId).setAttribute("data-copy", result);
}

//! Sort code logic
function formatSortCode(str) {
  return (String(str).match(/.{1,2}/g) || []).join("-");
}

function generateSortCode(selectorId) {
  let sortcode2 = generateNumber(6);
  let result = formatSortCode(sortcode2);
  document.getElementById(selectorId).innerText = result;
  document.getElementById(selectorId).setAttribute("data-copy", result);
}

//! Account number logic
function generateAccountNumber(selectorId) {
  const accountnumber1 = generateNumber(4);
  const accountnumber2 = generateNumber(4);
  let result = accountnumber1 + " " + accountnumber2;
  document.getElementById(selectorId).innerText = result;
  document.getElementById(selectorId).setAttribute("data-copy", result);
}

//! Amount logic
function getAmount(min, max) {
  return Math.random() * (max - min) + min;
}

function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function generateAmount(selectorId) {
  let number = parseFloat(getAmount(0, 250000).toFixed(2));
  let result = numberWithCommas(number);
  document.getElementById(selectorId).innerText = result;
  document.getElementById(selectorId).setAttribute("data-copy", result);
}

//! Percentage logic
function calculatePercentageOfValue() {
  const value = parseFloat(document.getElementById("value1").value);
  const percentage = parseFloat(document.getElementById("percentage1").value);
  if (isNaN(value) || isNaN(percentage)) {
    updateResult(
      "result1",
      "Error: Value or Percentage cannot be 0 or null.",
      true
    );
    return;
  }
  const result = (percentage / 100) * value;
  updateResult("result1", `${percentage}% of ${value} is ${result}.`);
}

function calculateValuePlusPercentage() {
  const value = parseFloat(document.getElementById("value2").value);
  console.log(isNaN(value));
  const percentage = parseFloat(document.getElementById("percentage2").value);
  console.log(percentage);
  if (isNaN(value) || isNaN(percentage)) {
    updateResult(
      "result2",
      "Error: Value or Percentage cannot be 0 or null.",
      true
    );
    return;
  }
  const result = value + (percentage / 100) * value;
  updateResult("result2", `${value} plus ${percentage}% is ${result}.`);
}

function calculateValueMinusPercentage() {
  const value = parseFloat(document.getElementById("value2").value);
  const percentage = parseFloat(document.getElementById("percentage2").value);
  if (isNaN(value) || isNaN(percentage)) {
    updateResult(
      "result2",
      "Error: Value or Percentage cannot be 0 or null.",
      true
    );
    return;
  }
  const result = value - (percentage / 100) * value;

  updateResult("result2", `${value} minus ${percentage}% is ${result}.`);
}

function calculatePercentageOf() {
  let a = parseFloat(document.getElementById("valueA").value);
  let b = parseFloat(document.getElementById("valueB").value);

  if (!a || a === 0) {
    updateResult("result3", "Error: A cannot be 0 or null.", true);
    return;
  }

  if (!b || b === 0) {
    updateResult("result3", "Error: B cannot be 0 or null.", true);
    return;
  }

  const percentage = (a / b) * 100;
  const result = percentage.toFixed(2); // to 2 decimal places
  updateResult("result3", `${a} is ${result}% of ${b}`);
}

//! String replacer logic
function replaceString() {
  const stringInput = document.getElementById("stringInput");
  const findValue = document.getElementById("findValue");
  const replaceValue = document.getElementById("replaceValue");
  const replaceBtn = document.getElementById("replaceBtn");
  // const resultBox = document.getElementById("resultBox");

  replaceBtn.addEventListener("click", () => {
    const inputStr = stringInput.value;
    const find = findValue.value;
    const replace = replaceValue.value;

    if (find === "") {
      updateResult("result", "Error: Please enter a value to find.", true);
      return;
    }

    const regex = new RegExp(find, "g"); // global replace
    const replaced = inputStr.replace(regex, replace);
    updateResult("result", `${replaced}`);
    document.getElementById("result").setAttribute("data-copy", replaced);
  });
}

//! Random number logic

function generateRandomNumber() {
  // Get values from input fields
  const minInput = document.getElementById("minNum");
  const maxInput = document.getElementById("maxNum");

  // Convert to numbers and ensure they're valid
  const min = Number(minInput.value);
  const max = Number(maxInput.value);
  console.log(min);

  const isMinNull = !min || min === 0;
  const isMaxNull = !min || min === 0;
  console.log(isMinNull);

  // Validate inputs
  // if (isNaN(min) || isNaN(max)) {
  //   updateResult("result", "Error: Please enter valid numbers.", true);
  //   return;
  // }

  if (isMinNull && isMaxNull) {
    updateResult(
      "result",
      "Error: Please enter valid min and max number.",
      true
    );
    return;
  }

  if (isMinNull) {
    updateResult("result", "Error: Please enter valid min number.", true);
    return;
  }

  if (isMaxNull) {
    updateResult("result", "Error: Please enter valid max number.", true);
    return;
  }

  if (min >= max) {
    updateResult(
      "result",
      "Error: Maximum must be greater than minimum.",
      true
    );
    return;
  }

  // Generate random number between min and max (inclusive)
  const result = Math.floor(Math.random() * (max - min + 1)) + min;

  // Display the result
  // document.getElementById('result').textContent = randomNumber;
  updateResult("result", `${result}`);
  document.getElementById("result").setAttribute("data-copy", result);
}
