window.onload = function () {
  console.log("as");
  const rfidInput = document.getElementById("rfid");
  let scanIndex = 0;

  for (let i = 1; i <= 10; i++) {
    const scan = document.getElementById("scan"+i);
    scan.addEventListener("click", function () {
      console.log("click");
      scan.classList.remove("border-dashed");
      scan.innerText = "scanning...";

      rfidInput.focus();
      scanIndex = i
    });
  }

  rfidInput.addEventListener("keypress", logKey);
  function logKey(e) {
    if (e.code == "Enter") {
      console.log(rfidInput.value);
      const scan = document.getElementById("scan"+scanIndex);
      scan.innerText = "registered!";
      rfidInput.value = "";
    }
  }
};
