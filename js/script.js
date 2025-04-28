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

function caesarCipher(str, key) {
    return str.split('').map(char => {
        let code = char.charCodeAt(0);

        if (code >= 65 && code <= 90) {
            // Uppercase letters
            return String.fromCharCode(((code - 65 + key) % 26) + 65);
        } else if (code >= 97 && code <= 122) {
            // Lowercase letters
            return String.fromCharCode(((code - 97 + key) % 26) + 97);
        } else {
            // Non-alphabetic characters stay the same
            return char;
        }
    }).join('');
}

function encryptMessage() {
    const message = document.getElementById("messageInput").value;
    const key = parseInt(document.getElementById("keyInput").value);

    if (!message || isNaN(key)) {
        alert("Please enter both a message and a key!");
        return;
    }

    const encrypted = caesarCipher(message, key);
    displayCryptoResult("🔒 Encrypted Message: " + encrypted);
}

function decryptMessage() {
    const message = document.getElementById("messageInput").value;
    const key = parseInt(document.getElementById("keyInput").value);

    if (!message || isNaN(key)) {
        alert("Please enter both a message and a key!");
        return;
    }

    const decrypted = caesarCipher(message, 26 - (key % 26)); // Reverse the shift
    displayCryptoResult("🔓 Decrypted Message: " + decrypted);
}

function displayCryptoResult(text) {
    const resultsDiv = document.getElementById("cryptoResults");
    resultsDiv.innerHTML = ""; // clear previous results
    const p = document.createElement("p");
    p.textContent = text;
    resultsDiv.appendChild(p);
}

// Small fixed RSA example (tiny numbers for learning)
const p = 5;
const q = 11;
const n = p * q; // 5 * 11 = 55
const e = 3;     // public exponent
const d = 27;    // private exponent (precomputed manually)

function rsaEncrypt() {
    const m = parseInt(document.getElementById("rsaMessageInput").value);

    if (isNaN(m) || m >= n) {
        alert("Please enter a small number less than " + n);
        return;
    }

    const c = Math.pow(m, e) % n;
    displayRsaResult("🔒 Encrypted Message (C): " + c);
}

function rsaDecrypt() {
    const c = parseInt(document.getElementById("rsaMessageInput").value);

    if (isNaN(c) || c >= n) {
        alert("Please enter a small number less than " + n);
        return;
    }

    const m = Math.pow(c, d) % n;
    displayRsaResult("🔓 Decrypted Message (M): " + m);
}

function displayRsaResult(text) {
    const resultsDiv = document.getElementById("rsaResults");
    resultsDiv.innerHTML = ""; // clear previous
    const p = document.createElement("p");
    p.textContent = text;
    resultsDiv.appendChild(p);
}
