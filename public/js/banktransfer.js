window.onload = function () {
  const players = JSON.parse(sessionStorage.getItem("players"));
  
  const scan = document.getElementById("scan");
  const rfidInput = document.getElementById("rfid");

  var scanning = "";

  scan.addEventListener("click", function () {
    console.log("click");
    scan.classList.remove("border-dashed");
    scan.innerText = "scanning...";

    rfidInput.focus();
    rfidInput.value = "";
  });
  var color = "";

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

      color = players[rfid][1];
    }
  }

  const tbody = document.getElementById("tbody");
  var tr = sessionStorage.getItem("tbody");
  tbody.innerHTML = tr;

  const submit = document.getElementById("submitButton");
  submit.addEventListener("click", function () {
    const rfidInput = document.getElementById("rfid");
    console.log();
    scan.classList.add("bg-slate-500/20");
    scan.classList.add("border-slate-400");
    scan.classList.add("text-slate-500");

    scan.classList.remove(`bg-${color}-600/20`);
    scan.classList.remove(`border-${color}-600`);
    scan.classList.remove(`text-${color}-700`);
    scan.classList.add("border-dashed");
    var amount = document.getElementById("amount").value;
    if (bank === "pay") {
      players[rfidInput.value][2] -= amount;
      tr += `<tr class="">
              <td class="drop-shadow-lg shadow-blue-600/50">
                bank-${bank}
              </td>
              <td class="text-${color}-600 drop-shadow-lg shadow-yellow-600/50">
              ${scan.innerText}
              </td>
              <td class="text-${color}-600 drop-shadow-lg shadow-lime-600/50">
              -
              </td>
              <td class="drop-shadow-lg shadow-blue-600/50">
              ${amount}
              </td>
            </tr>`;
      amount = amount * -1;
    } else {
      players[rfidInput.value][2] += Number(amount);
      tr += `<tr class="">
              <td class="drop-shadow-lg shadow-blue-600/50">
                bank-${bank}
              </td>
              <td class="text-${color}-600 drop-shadow-lg shadow-yellow-600/50">
              -
              </td>
              <td class="text-${color}-600 drop-shadow-lg shadow-lime-600/50">
              ${scan.innerText}
              </td>
              <td class="drop-shadow-lg shadow-blue-600/50">
              ${amount}
              </td>
            </tr>`;
    }
    document.getElementById("amount").value = ""
    scan.innerText = "scan";
    tbody.innerHTML = tr;
    
    balance();
  });

  var bank = "pay";
  const pay = document.getElementById("payButton");
  const receive = document.getElementById("receiveButton");

  pay.addEventListener("click", function () {
    bank = "pay";
    pay.classList.add("bg-blue-600");
    pay.classList.remove("text-blue-600");
    pay.classList.add("text-white");

    receive.classList.remove("bg-blue-600");
    receive.classList.remove("text-white");
  });

  receive.addEventListener("click", function () {
    bank = "receive";
    receive.classList.add("bg-blue-600");
    receive.classList.add("text-white");

    pay.classList.remove("bg-blue-600");
    pay.classList.remove("text-white");
    pay.classList.add("text-blue-600");
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

  const transferDiv = document.getElementById("bankDiv");
  transferDiv.addEventListener("click", function () {
    sessionStorage.setItem("tbody", tr);
    sessionStorage.setItem("players", JSON.stringify(players));
    window.location.href = "playertransfer";
  });
};
