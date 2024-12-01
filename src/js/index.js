window.onload = function () {
  
  var rfids = []
  var colors = ["red", "blue", "violet", "green", "yellow", "lime", "pink", "sky", "orange", "teal"]
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
      rfids.push([rfidInput.value, scanIndex])
      rfidInput.value = "";
      
    }
  }

  const nextPage = document.getElementById("nextPage")
  nextPage.addEventListener("click", function(){
    const players = {
    };
    rfids.forEach(element => {
      players[element[0]] = [document.getElementById("name"+element[1]).value, colors[element[1]-1], 1500]
    });
    var tr = sessionStorage.setItem("tbody", "");
    sessionStorage.setItem("players", JSON.stringify(players));
    window.location.href = "playertransfer.ejs";
  })


  
};
