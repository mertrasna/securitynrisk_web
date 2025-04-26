function reverseString(str) {
    return str.split('').reverse().join('');
}

function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash += str.charCodeAt(i) * (i + 1);
    }
    return hash;
}

function simulateAvailability(callback) {
    const isAvailable = Math.random() > 0.2; // 80% chance it's available
    if (isAvailable) {
        callback();
    } else {
        displayResult("Server is down. Retrying...");
        setTimeout(() => simulateAvailability(callback), 1000);
    }
}

function handleSecureBox() {
    document.getElementById("results").innerHTML = "";

    const message = document.getElementById("messageInput").value;
    if (!message) {
        alert("Please enter a message first!");
        return;
    }

    displayResult("Original message: " + message);

    // Confidentiality
    const encrypted = reverseString(message);
    displayResult("Encrypted (Confidentiality): " + encrypted);

    // Integrity
    const integrityHash = simpleHash(message);
    displayResult("Integrity Check (Hash): " + integrityHash);

    // Availability
    simulateAvailability(() => {
        displayResult("✅ Message sent successfully!");
    });
}

function displayResult(text) {
    const resultsDiv = document.getElementById("results");
    const p = document.createElement("p");
    p.textContent = text;
    resultsDiv.appendChild(p);
}
