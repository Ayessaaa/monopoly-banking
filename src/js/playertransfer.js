window.onload = function () {
  const players = {
    "0721324723": ["yessa", "blue"],
    "0722261139": ["hirono", "green"],
    "0722273363": ["lily", "pink"],
  };
  const sender = document.getElementById("senderRFID");
  const receiver = document.getElementById("receiverRFID");
  const rfidInput = document.getElementById("rfid");

  var scanning = "";

  sender.addEventListener("click", function () {
    console.log("click");
    sender.classList.remove("border-dashed");
    sender.innerText = "scanning...";

    rfidInput.focus();
    scanning = sender;
  });

  receiver.addEventListener("click", function () {
    console.log("click");
    receiver.classList.remove("border-dashed");
    receiver.innerText = "scanning...";

    rfidInput.focus();
    scanning = receiver;
  });

  rfidInput.addEventListener("keypress", logKey);
  function logKey(e) {
    if (e.code == "Enter") {
      console.log(rfidInput.value);
      const rfid = rfidInput.value
      
      scanning.innerText = players[rfid][0];
      scanning.classList.remove("bg-slate-500/20")
      scanning.classList.remove("border-slate-400")
      scanning.classList.remove("text-slate-500")

      scanning.classList.add(`bg-${players[rfid][1]}-600/20`)
      scanning.classList.add(`border-${players[rfid][1]}-600`)
      scanning.classList.add(`text-${players[rfid][1]}-700`)
      rfidInput.value = "";
    }
  }

  const transferDiv = document.getElementById("transferDiv")
  transferDiv.addEventListener("click", function(){
    window.location.href = "banktransfer.ejs"
  })
};
