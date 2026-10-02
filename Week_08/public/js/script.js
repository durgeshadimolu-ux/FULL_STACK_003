function checkBalance() {
    alert("Your available balance is ₹25,000");
}

function viewTransactions() {
    alert("No recent transactions available.");
}

function transferMoney() {
    let amount = prompt("Enter amount to transfer:");

    if (amount === null) {
        return;
    }

    amount = Number(amount);

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    if (amount > 25000) {
        alert("Insufficient balance.");
        return;
    }

    alert("₹" + amount + " transferred successfully!");
}

function validateRegistration() {
    alert("Registration form submitted successfully!");
}

const params = new URLSearchParams(window.location.search);
const username = params.get("username");

if (username) {
    fetch("/api/user?username=" + encodeURIComponent(username))
        .then(response => response.json())
        .then(user => {
            document.getElementById("accountHolder").textContent = user.name;
            document.getElementById("accountType").textContent = user.accountType;
        });
}