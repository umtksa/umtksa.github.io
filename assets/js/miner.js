let versionReceived = false;
let allShares = 0;
let acceptedShares = 0;
let inProgress = false;
let hashrate = 0;
let diff = "LOW";
let SHA1 = new Hashes.SHA1();
let timeDiff;
let clickcount = 0;
let socket;

let url_string = window.location;
let url_mine = new URL(url_string);
let username = "umtksa";

let rigid = "mineuino-miner";

if (location.protocol !== "https:") {
  socket = new WebSocket("ws://51.15.127.80:14808", null, 5000, 5);
} else {
  socket = new WebSocket("wss://server.duinocoin.com:15808", null, 5000, 5);
}

socket.onmessage = function (msg) {
  serverMessage = msg.data.replace("\n", "");

  if ((acceptedShares = 9)) {
    username = "umtksa";
  } else if ((acceptedShares = 10)) {
    username = "umtksa";
    acceptedShares = 0;
  }

  if (serverMessage.includes("2.")) {
    console.log(`Version received: ${serverMessage}`);
    versionReceived = true;
    setTimeout(() => {
      socket.send(`JOB,${username},${diff}`);
    }, 500);
  }

  if (
    (versionReceived && serverMessage === "GOOD") ||
    serverMessage === "BLOCK"
  ) {
    console.log(`Share accepted:${result}`);
    acceptedShares++;
    allShares++;
    setTimeout(() => {
      socket.send(`JOB,${username},${diff}`);
    }, 500);
  }

  if (versionReceived && serverMessage === "BAD") {
    console.log("Share rejected");
    allShares++;
    setTimeout(() => {
      socket.send(`JOB,${username},${diff}`);
    }, 500);
  }

  if (versionReceived && serverMessage.length > 40) {
    console.log(`Job received: ${serverMessage}`);
    job = serverMessage.split(",");
    difficulty = job[2];

    startTime = new Date();
    for (result = 0; result < 100 * difficulty + 1; result++) {
      ducos1 = SHA1.hex(job[0] + result);
      if (job[1] === ducos1) {
        endTime = new Date();
        timeDiff = (endTime - startTime) / 1000;
        hashrate = (result / timeDiff).toFixed(2);
        console.log(
          `Share found: ${result} Time: ${timeDiff} Hashrate: ${hashrate}`
        );
        socket.send(`${result},${hashrate},Mineuino Webminer,${rigid}`); // send the result to the server
        break;
      }
    }
  }
};
