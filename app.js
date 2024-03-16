
document.addEventListener('DOMContentLoaded', function () {
    startCountdown();
     fetchSolanaBalance();
});

function startCountdown() {
    var endTime = new Date(Date.now() + 12 * 3600 * 1000); // 12 hours from now

    var timer = setInterval(function () {
        var now = new Date();
        var distance = endTime - now;

        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("timer").innerHTML = hours + "h " + minutes + "m " + seconds + "s ";

        if (distance < 0) {
            clearInterval(timer);
            document.getElementById("timer").innerHTML = "EXPIRED";
        }
    }, 1000);
}

async function fetchAndDisplaySolanaBalance() {
  const walletAddress = '97xH1PV8zGhMbEZCuMN2TQTCTsZ5HgkvQvm2ncfqT2TZ';
  const connection = new solanaWeb3.Connection("https://serene-warmhearted-waterfall.solana-mainnet.quiknode.pro/129e834e6a77e83fd43297b5cc399351a991f0f2/");

  try {
    const publicKey = new solanaWeb3.PublicKey(walletAddress);
    const balance = await connection.getBalance(publicKey);
    const balanceInSOL = balance / solanaWeb3.LAMPORTS_PER_SOL;
    console.log(`Balance: ${balanceInSOL} SOL`);

    // Display the balance on your webpage
    document.getElementById('balance').innerText = `Wallet Balance: ${balanceInSOL.toFixed(2)} SOL`;
  } catch (error) {
    console.error("Error fetching Solana balance:", error);
    document.getElementById('balance').innerText = "Error fetching balance";
  }
}

// Call the function to fetch and display the balance
document.addEventListener('DOMContentLoaded', fetchAndDisplaySolanaBalance);
