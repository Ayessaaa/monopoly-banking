window.onload = function () {
  const players = JSON.parse(sessionStorage.getItem("players"));

  const sender = document.getElementById("senderRFID");
  const receiver = document.getElementById("receiverRFID");
  const rfidInput = document.getElementById("rfid");

  var scanning = "";

  var sendColor = "";
  var receiveColor = "";

  var senderRFID = ""
  var receiverRFID = ""

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
      const rfid = rfidInput.value;
      if (scanning === sender) {
        sendColor = players[rfid][1];
        senderRFID = rfid
      } else {
        receiveColor = players[rfid][1];
        receiverRFID = rfid
      }

      scanning.innerText = players[rfid][0];
      scanning.classList.remove("bg-slate-500/20");
      scanning.classList.remove("border-slate-400");
      scanning.classList.remove("text-slate-500");

      scanning.classList.add(`bg-${players[rfid][1]}-600/20`);
      scanning.classList.add(`border-${players[rfid][1]}-600`);
      scanning.classList.add(`text-${players[rfid][1]}-700`);
      rfidInput.value = "";
    }
  }

  const tbody = document.getElementById("tbody");
  var tr = sessionStorage.getItem("tbody");
  tbody.innerHTML = tr;

  const submit = document.getElementById("submitButton");
  submit.addEventListener("click", function () {
    sender.classList.add("bg-slate-500/20");
    sender.classList.add("border-slate-400");
    sender.classList.add("text-slate-500");

    sender.classList.remove(`bg-${sendColor}-600/20`);
    sender.classList.remove(`border-${sendColor}-600`);
    sender.classList.remove(`text-${sendColor}-700`);
    sender.classList.add("border-dashed");

    receiver.classList.add("bg-slate-500/20");
    receiver.classList.add("border-slate-400");
    receiver.classList.add("text-slate-500");

    receiver.classList.remove(`bg-${receiveColor}-600/20`);
    receiver.classList.remove(`border-${receiveColor}-600`);
    receiver.classList.remove(`text-${receiveColor}-700`);
    receiver.classList.add("border-dashed");

    var amount = document.getElementById("amount").value;
    console.log(amount);
    tr += `<tr class="">
              <td class="drop-shadow-lg shadow-blue-600/50">
                transfer
              </td>
              <td class="text-${sendColor}-600 drop-shadow-lg shadow-yellow-600/50">
              ${sender.innerText}
              </td>
              <td class="text-${receiveColor}-600 drop-shadow-lg shadow-lime-600/50">
              ${receiver.innerText}
              </td>
              <td class="drop-shadow-lg shadow-blue-600/50">
              ${amount}
              </td>
            </tr>`;
    sender.innerText = "sender";
    receiver.innerText = "receiver";
    tbody.innerHTML = tr;
    players[senderRFID][2] -= parseInt(amount)
    players[receiverRFID][2] += parseInt(amount)
    document.getElementById("amount").value = ""
    balance()
  });

  const passgo = document.getElementById("passgo");
  passgo.addEventListener("click", function () {
    passgo.classList.remove("bg-green-600");
    passgo.innerHTML = `<div class="border-4  rounded-lg bg-slate-500/20 border-slate-400 text-center font-bold text-slate-500">scanning...</div>`;

    passgoRFID.focus();
  });

  passgoRFID.addEventListener("keypress", logKeyy);
  function logKeyy(e) {
    if (e.code == "Enter") {
      const passgoRFID = document.getElementById("passgoRFID");
      passgo.classList.add("bg-green-600");
      passgo.innerHTML = `<p
            class="font-bold group-hover:text-green-600 text-2xl text-center flex place-items-center justify-center"
          >
            PASS GO
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-5 inline stroke-2 ml-3"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </p>`;
      tr += `<tr class="">
          <td class="drop-shadow-lg shadow-blue-600/50">
            pass go
          </td>
          <td class="text-${
            players[passgoRFID.value][1]
          }-600 drop-shadow-lg shadow-yellow-600/50">
          -
          </td>
          <td class="text-${
            players[passgoRFID.value][1]
          }-600 drop-shadow-lg shadow-lime-600/50">
          ${players[passgoRFID.value][0]}
          </td>
          <td class="drop-shadow-lg shadow-blue-600/50">
          200
          </td>
        </tr>`;
      players[passgoRFID.value][2] += 200;
      balance();
      passgoRFID.value = "";
      tbody.innerHTML = tr;
    }
  }

  function balance() {
    const balanceDiv = document.getElementById("balanceDiv");
    var balances = "";

    for (const id in players) {
      console.log(
        `ID: ${id}, Name: ${players[id][0]}, Color: ${players[id][0]}`
      );
      balances += `<div class="basis-1/3 text-white bg-${players[id][1]}-600 py-1 px-3 rounded-lg border-4 border-${players[id][1]}-700 shadow-md shadow-${players[id][1]}-500/50">
            <p class="font-semibold text-${players[id][1]}-800">Balance</p>
            <p class="font-bold text-2xl">${players[id][0]}</p>
            <p class="font-semibold text-xl">${players[id][2]}</p>
          </div>`;
    }

    balanceDiv.innerHTML = balances;
  }
  balance();

  const transferDiv = document.getElementById("transferDiv");
  transferDiv.addEventListener("click", function () {
    sessionStorage.setItem("tbody", tr);
    sessionStorage.setItem("players", JSON.stringify(players));
    window.location.href = "banktransfer.ejs";
  });
};
