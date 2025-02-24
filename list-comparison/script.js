function compareLists() {
  let arr1 = document.getElementById("list1").value;
  let arr2 = document.getElementById("list2").value;
  let result = Object.values(arr1).filter((item) => !arr2.includes(item));
  printToScreen(result);
}

function printToScreen(textToPrint) {
  console.log("printing to screen");
  document.getElementById("result").value = textToPrint;
}

// function copyToClipboard(id) {
//   var copyText = document.getElementById(id);
//   copyText.select();
//   copyText.setSelectionRange(0, 99999);
//   document.execCommand("copy");
// }
