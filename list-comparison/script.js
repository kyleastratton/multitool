// all clients
let arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

// leap clients
let arr2 = [1, 3, 4, 6, 8];

// const toRemoveMap = leapClients.reduce(
//   (memo, item) => ({
//     ...memo,
//     [item]: true,
//   }),
//   {}
// );

// let nonLeapClients = allClients.filter((x) => toRemoveMap[x]);

// result is arr1 excluding any items that exist in arr2
let result = arr1.filter((item) => !arr2.includes(item));

function printToScreen(textToPrint) {
  console.log("printing to screen");
  document.getElementById("txt").value = textToPrint;
}

printToScreen(result);

function copyToClipboard(id) {
  var copyText = document.getElementById(id);
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
}
