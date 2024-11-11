let userLoggedIn = false;
let currentUser = {
    name: 'John Doe',
    balance: 1000,
    accountHistory: []
};

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Mock login validation
    if (username === 'user' && password === 'pass') {
        userLoggedIn = true;
        currentUser.name = username;
        document.getElementById('user-name').innerText = username;
        document.getElementById('balance').innerText = currentUser.balance;
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
    } else {
        alert('Invalid credentials!');
    }
}

function logout() {
    userLoggedIn = false;
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
}

function sendOTP() {
    const mobileNumber = prompt('Enter your mobile number:');
    // Logic to send OTP (mock)
    alert(`OTP sent to ${mobileNumber}.`);
    // Here you would implement actual OTP logic
}

function withdraw() {
    const amount = prompt('Enter amount to withdraw:');
    if (amount <= currentUser.balance) {
        currentUser.balance -= amount;
        alert(`Withdrew ${amount}. New balance is ${currentUser.balance}.`);
        document.getElementById('balance').innerText = currentUser.balance;
    } else {
        alert('Insufficient funds!');
    }
}

function deposit() {
    const amount = prompt('Enter amount to deposit:');
    currentUser.balance += parseInt(amount);
    alert(`Deposited ${amount}. New balance is ${currentUser.balance}.`);
    document.getElementById('balance').innerText = currentUser.balance;
}

function sendMoney() {
    const amount = prompt('Enter amount to send:');
    const toAccount = prompt('Enter account number to send to:');
    // Logic to send money (mock)
    alert(`Sent ${amount} to account ${toAccount}.`);
}