let accountBalance = 1000.00;
let transactionHistory = [];

// Check if user is logged in and load their data
if (localStorage.getItem('loggedInUser')) {
  const loggedInUser = localStorage.getItem('loggedInUser');
  document.getElementById('login-section').style.display = 'none';
  document.getElementById('dashboard-section').style.display = 'block';

  // Retrieve user's account balance and transaction history from localStorage
  const storedBalance = localStorage.getItem(loggedInUser + '-accountBalance');
  const storedHistory = localStorage.getItem(loggedInUser + '-transactionHistory');

  if (storedBalance) {
    accountBalance = parseFloat(storedBalance);
  }

  if (storedHistory) {
    transactionHistory = JSON.parse(storedHistory);
  }

  updateAccountInfo();
  updateTransactionHistory();
  updateTime();
}

// Handle login functionality
document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  const storedPassword = localStorage.getItem(username);

  if (storedPassword && storedPassword === password) {
    localStorage.setItem('loggedInUser', username);
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('dashboard-section').style.display = 'block';

    // Load the stored account balance and transaction history for the logged-in user
    const storedBalance = localStorage.getItem(username + '-accountBalance');
    const storedHistory = localStorage.getItem(username + '-transactionHistory');

    if (storedBalance) {
      accountBalance = parseFloat(storedBalance);
    }

    if (storedHistory) {
      transactionHistory = JSON.parse(storedHistory);
    }

    updateAccountInfo();
    updateTransactionHistory();
    updateTime();
  } else {
    alert('Invalid credentials!');
  }
});

// Handle registration functionality
document.getElementById('registration-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (localStorage.getItem(username)) {
    alert('Username already exists!');
    return;
  }

  localStorage.setItem(username, password);
  alert('Registration successful! You can now log in.');

  document.getElementById('register-section').style.display = 'none';
  document.getElementById('login-section').style.display = 'block';
});

// Switch to registration page
document.getElementById('go-to-register').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('login-section').style.display = 'none';
  document.getElementById('register-section').style.display = 'block';
});

// Switch to login page
document.getElementById('go-to-login').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('register-section').style.display = 'none';
  document.getElementById('login-section').style.display = 'block';
});

// Handle transaction form submission (Deposit or Withdrawal)
document.getElementById('transaction-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const transactionType = document.getElementById('transaction-type').value;
  const amount = parseFloat(document.getElementById('amount').value);

  if (transactionType === 'deposit') {
    accountBalance += amount;
  } else if (transactionType === 'withdrawal') {
    if (accountBalance >= amount) {
      accountBalance -= amount;
    } else {
      alert('Insufficient funds!');
      return;
    }
  }

  const transaction = {
    date: new Date().toLocaleString(),
    type: transactionType,
    amount,
    balance: accountBalance.toFixed(2)
  };

  transactionHistory.push(transaction);

  // Save updated balance and transaction history to localStorage for the logged-in user
  const loggedInUser = localStorage.getItem('loggedInUser');
  localStorage.setItem(loggedInUser + '-accountBalance', accountBalance.toFixed(2));
  localStorage.setItem(loggedInUser + '-transactionHistory', JSON.stringify(transactionHistory));

  updateTransactionHistory();
  updateAccountInfo();
});

// Update account balance in the UI
function updateAccountInfo() {
  document.getElementById('account-balance').textContent = `Account Balance: $${accountBalance.toFixed(2)}`;
}

// Update transaction history table
function updateTransactionHistory() {
  const tbody = document.getElementById('transaction-history-body');
  tbody.innerHTML = '';

  transactionHistory.forEach(function(transaction) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${transaction.date}</td>
      <td>${transaction.type}</td>
      <td>$${transaction.amount.toFixed(2)}</td>
      <td>$${transaction.balance}</td>
    `;
    tbody.appendChild(row);
  });
}

// Handle logout functionality
document.getElementById('logout-button').addEventListener('click', function() {
  // Remove the logged-in user from localStorage and clear user-specific data
  const loggedInUser = localStorage.getItem('loggedInUser');
  localStorage.removeItem('loggedInUser');
  localStorage.removeItem(loggedInUser + '-accountBalance');
  localStorage.removeItem(loggedInUser + '-transactionHistory');

  // Redirect back to login section
  document.getElementById('dashboard-section').style.display = 'none';
  document.getElementById('login-section').style.display = 'block';
});

// Function to update current time
function updateTime() {
  const timeElement = document.getElementById('current-time');
  
  // Function to update the time every second
  setInterval(function() {
    const now = new Date();
    const currentTime = now.toLocaleString(); // You can customize the format here
    timeElement.textContent = `Current Time: ${currentTime}`;
  }, 1000); // Update every second
}