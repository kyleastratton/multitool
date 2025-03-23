document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
});

let lastTouchTime = 0;
document.addEventListener(
  "touchstart",
  function (event) {
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - lastTouchTime;

    if (timeDifference < 100) {
      // If second tap occurs within 300ms, prevent default zoom behavior
      event.preventDefault();
    }

    lastTouchTime = currentTime;
  },
  { passive: false }
); // passive: false ensures preventDefault() works

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

function convertText() {
  const text = document.getElementById("textInput").value;
  const caseType = document.getElementById("caseSelector").value;
  let convertedText = "";

  switch (caseType) {
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
        .replace(/(?:\s+|^)(\w)/g, (match, p1) => p1.toUpperCase())
        .replace(/\s+/g, "-");
      break;
    default:
      convertedText = text;
  }

  document.getElementById("result").textContent = convertedText;
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

  let result = Math.floor(Math.random() * items.length);
  document.getElementById("result").innerText = items[result];
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

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// Name logic

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

// Matter number logic

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

// Address logic

function getStreetPrefix(streetPrefix) {
  const streetPrefix1 = streetPrefix;
  return Math.floor(Math.random() * streetPrefix1.length);
}

function getStreetName(streetNames) {
  const streetNames1 = streetNames;
  return Math.floor(Math.random() * streetNames1.length);
}

function getTown(towns) {
  const towns1 = towns;
  return Math.floor(Math.random() * towns1.length);
}

function generateAddress(selectorId) {
  const uk_cities = [
    "Bath",
    "Birmingham",
    "Bradford",
    "Brighton & Hove",
    "Bristol",
    "Cambridge",
    "Canterbury",
    "Carlisle",
    "Chelmsford",
    "Chester",
    "Chichester",
    "Colchester",
    "Coventry",
    "Derby",
    "Doncaster",
    "Durham",
    "Ely",
    "Exeter",
    "Gloucester",
    "Hereford",
    "Kingston-upon-Hull",
    "Lancaster",
    "Leeds",
    "Leicester",
    "Lichfield",
    "Lincoln",
    "Liverpool",
    "London",
    "Manchester",
    "Milton Keynes",
    "Newcastle-upon-Tyne",
    "Norwich",
    "Nottingham",
    "Oxford",
    "Peterborough",
    "Plymouth",
    "Portsmouth",
    "Preston",
    "Ripon",
    "Salford",
    "Salisbury",
    "Sheffield",
    "Southampton",
    "Southend-on-Sea",
    "St Albans",
    "Stoke on Trent",
    "Sunderland",
    "Truro",
    "Wakefield",
    "Wells",
    "Westminster",
    "Winchester",
    "Wolverhampton",
    "Worcester",
    "York",
    "Armagh",
    "Bangor",
    "Belfast",
    "Lisburn",
    "Londonderry",
    "Newry",
    "Aberdeen",
    "Dundee",
    "Dunfermline",
    "Edinburgh",
    "Glasgow",
    "Inverness",
    "Perth",
    "Stirling",
    "Bangor",
    "Cardiff",
    "Newport",
    "St Asaph",
    "St Davids",
    "Swansea",
    "Wrexham",
  ];

  const streetNames = [
    "Road",
    "Lane",
    "Avenue",
    "Boulevard",
    "Street",
    "Grove",
    "Crescent",
  ];

  const streetPrefix = [
    "Oak",
    "Birch",
    "Willow",
    "Beech",
    "Spruce",
    "Walnut",
    "Cherry",
    "Maple",
    "Alder",
    "Ash",
    "Aspen",
    "Cedar",
    "Elm",
    "Hawthorn",
    "Hemlock",
    "Hornbeam",
    "Juniper",
    "Lime",
    "Pine",
    "Sycamore",
    "Whitebeam",
    "Yew",
    "High",
    "Church",
    "Park",
    "Main",
    "Queens",
    "Kings",
    "Grange",
    "New",
    "Mill",
    "North",
    "East",
    "South",
    "West",
  ];
  const generatedNumber = getRandomInt(1000);
  const generatedStreetPrefix = getStreetPrefix(streetPrefix);
  const generatedStreetName = getStreetName(streetNames);
  const generatedCity = getTown(uk_cities);
  const generatedPostcode1 = generateAlphabeticalString(2);
  const generatedPostcode2 = generateNumber(2);
  const generatedPostcode3 = generateNumber(1);
  const generatedPostcode4 = generateAlphabeticalString(2);
  const fullPostcode =
    generatedPostcode1 +
    generatedPostcode2 +
    " " +
    generatedPostcode3 +
    generatedPostcode4;

  const result =
    generatedNumber +
    " " +
    streetPrefix[generatedStreetPrefix] +
    " " +
    streetNames[generatedStreetName] +
    ", " +
    uk_cities[generatedCity] +
    ", " +
    fullPostcode;

  document.getElementById(selectorId).innerText = result;
  document.getElementById(selectorId).setAttribute("data-copy", result);
}

// Telephone number logic

function generateTelephoneNumber(selectorId) {
  const result = "01632 960 " + generateNumber(3);
  document.getElementById(selectorId).innerText = result;
  document.getElementById(selectorId).setAttribute("data-copy", result);
}

// Mobile number logic

function generateMobileNumber(selectorId) {
  const result = "0770 090 0" + generateNumber(3);
  document.getElementById(selectorId).innerText = result;
  document.getElementById(selectorId).setAttribute("data-copy", result);
}

// Sort code logic

function formatSortCode(str) {
  return (String(str).match(/.{1,2}/g) || []).join("-");
}

function generateSortCode(selectorId) {
  let sortcode2 = generateNumber(6);
  let result = formatSortCode(sortcode2);
  document.getElementById(selectorId).innerText = result;
  document.getElementById(selectorId).setAttribute("data-copy", result);
}

// Account number logic

function generateAccountNumber(selectorId) {
  const accountnumber1 = generateNumber(4);
  const accountnumber2 = generateNumber(4);
  let result = accountnumber1 + " " + accountnumber2;
  document.getElementById(selectorId).innerText = result;
  document.getElementById(selectorId).setAttribute("data-copy", result);
}

// Amount logic

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

// Percentage logic

function calculatePercentageOfValue() {
  const value = parseFloat(document.getElementById('value1').value);
  const percentage = parseFloat(document.getElementById('percentage1').value);
  if (isNaN(value) || isNaN(percentage)) {
      document.getElementById('result1').textContent = 'Please enter valid numbers.';
      return;
  }
  const result = (percentage / 100) * value;
  document.getElementById('result1').textContent = `${percentage}% of ${value} is ${result}.`;
}

function calculateValuePlusPercentage() {
  const value = parseFloat(document.getElementById('value2').value);
  const percentage = parseFloat(document.getElementById('percentage2').value);
  if (isNaN(value) || isNaN(percentage)) {
      document.getElementById('result2').textContent = 'Please enter valid numbers.';
      return;
  }
  const result = value + (percentage / 100) * value;
  document.getElementById('result2').textContent = `${value} plus ${percentage}% is ${result}.`;
}

function calculateValueMinusPercentage() {
  const value = parseFloat(document.getElementById('value2').value);
  const percentage = parseFloat(document.getElementById('percentage2').value);
  if (isNaN(value) || isNaN(percentage)) {
      document.getElementById('result2').textContent = 'Please enter valid numbers.';
      return;
  }
  const result = value - (percentage / 100) * value;
  document.getElementById('result2').textContent = `${value} minus ${percentage}% is ${result}.`;
}

