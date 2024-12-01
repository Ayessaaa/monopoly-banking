window.onload = function () {
  const players = {
    "0721324723": ["yessa", "blue"],
    "0722261139": ["hirono", "green"],
    "0722273363": ["lily", "pink"],
  };
  const scan = document.getElementById("scan");
  const rfidInput = document.getElementById("rfid");

  var scanning = "";

  scan.addEventListener("click", function () {
    console.log("click");
    scan.classList.remove("border-dashed");
    scan.innerText = "scanning...";

    rfidInput.focus();
  });

  rfidInput.addEventListener("keypress", logKey);
  function logKey(e) {
    if (e.code == "Enter") {
      console.log(rfidInput.value);
      const rfid = rfidInput.value;

      scan.innerText = players[rfid][0];
      scan.classList.remove("bg-slate-500/20");
      scan.classList.remove("border-slate-400");
      scan.classList.remove("text-slate-500");

      scan.classList.add(`bg-${players[rfid][1]}-600/20`);
      scan.classList.add(`border-${players[rfid][1]}-600`);
      scan.classList.add(`text-${players[rfid][1]}-700`);
      
      rfidInput.value = "";
    }
  }

  const submit = document.getElementById("submitButton")
  submit.addEventListener("click", function(){
    var amount = document.getElementById("amount").value
    if(bank === "pay"){
        amount = amount* -1
    }
    console.log(amount)
  })

  var bank = "pay"
  const pay = document.getElementById("payButton")
  const receive = document.getElementById("receiveButton")

  pay.addEventListener("click", function(){
    bank = "pay"
    pay.classList.add("bg-blue-600")
    pay.classList.remove("text-blue-600")
    pay.classList.add("text-white")

    receive.classList.remove("bg-blue-600")
    receive.classList.remove("text-white")

  })

  receive.addEventListener("click", function(){
    bank = "receive"
    receive.classList.add("bg-blue-600")
    receive.classList.add("text-white")

    pay.classList.remove("bg-blue-600")
    pay.classList.remove("text-white")
    pay.classList.add("text-blue-600")
  })

  const transferDiv = document.getElementById("bankDiv");
  transferDiv.addEventListener("click", function () {
    window.location.href = "playertransfer.ejs";
  });
  
};
