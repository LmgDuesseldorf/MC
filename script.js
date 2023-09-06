document.addEventListener("DOMContentLoaded", function () {
    // Replace 'your_server_ip' and 'your_server_port' with your Minecraft server's IP and port
    const serverIP = 'Class8d.mcserv.me';
    const serverPort = '40689';

    const serverStatusElement = document.getElementById('server-status');
    const consoleListElement = document.getElementById('console-list');
    const pingElement = document.getElementById('ping');

    async function fetchServerStatus() {
        try {
            const startTime = Date.now(); // Start measuring time
            const response = await fetch(`https://api.mcsrvstat.us/2/${serverIP}:${serverPort}`);
            const endTime = Date.now(); // Stop measuring time

            const data = await response.json();

            if (data.online) {
                serverStatusElement.innerText = `Players Online: ${data.players.online}`;
                const ping = endTime - startTime; // Calculate ping in milliseconds
                pingElement.innerText = `Ping: ${ping}ms`; // Display ping
            } else {
                serverStatusElement.innerText = 'Server is offline';
                pingElement.innerText = ''; // Clear ping if server is offline
            }
        } catch (error) {
            console.error('Error fetching server status:', error);
            serverStatusElement.innerText = 'Error fetching server status';
            pingElement.innerText = ''; // Clear ping on error
        }
    }

    // Function to add a message to the console list
    function addToConsole(message) {
        const listItem = document.createElement('li');
        listItem.innerText = message;
        consoleListElement.appendChild(listItem);
    }

    // Simulate adding a console message (replace this with actual console messages)
    // Remove or comment out the lines below to clear the messages
    // addToConsole('Welcome to the server!');
    // addToConsole('Player joined the game');
    // addToConsole('Server is running');

    fetchServerStatus();
    setInterval(fetchServerStatus, 5000); // Refresh server status every 5 seconds
});
