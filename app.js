document.addEventListener('DOMContentLoaded', function () {
    fetchSolanaBalance();
    startCountdown();
});

function startCountdown() {
    // Fixed end time for the countdown (e.g., March 20, 2024, 12:00:00 UTC)
    var endTime = new Date('2024-03-20T12:00:00Z').getTime();

    // Update the countdown every 1 second
    var timer = setInterval(function () {
        var now = new Date().getTime();
        var distance = endTime - now;

        // Time calculations for hours, minutes, and seconds
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="timer"
        document.getElementById("timer").innerHTML = hours + "h " + minutes + "m " + seconds + "s ";

        // If the countdown is over, write some text
        if (distance < 0) {
            clearInterval(timer);
            document.getElementById("timer").innerHTML = "EXPIRED";
        }
    }, 1000);
}

async function fetchSolanaBalance() {
    const walletAddress = '97xH1PV8zGhMbEZCuMN2TQTCTsZ5HgkvQvm2ncfqT2TZ'; // Wallet address
    try {
        console.log("Attempting to create connection...");
        const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'), 'confirmed');
        console.log("Connection established.");

        console.log("Creating public key from wallet address...");
        const publicKey = new solanaWeb3.PublicKey(walletAddress);
        console.log("Public key created:", publicKey.toString());

        console.log("Fetching balance for the wallet...");
        const balance = await connection.getBalance(publicKey);
        console.log(`Balance in lamports: ${balance}`);
        console.log(`Balance in SOL: ${(balance / solanaWeb3.LAMPORTS_PER_SOL).toFixed(9)}`);

        document.getElementById('balance').innerText = `Wallet Balance: ${(balance / solanaWeb3.LAMPORTS_PER_SOL).toFixed(9)} SOL`;
    } catch (error) {
        console.error("Error fetching Solana balance:", error);
        document.getElementById('balance').innerText = "Error fetching balance";
    }
}
