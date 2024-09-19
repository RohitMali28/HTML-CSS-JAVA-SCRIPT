const transactionForm = document.getElementById('transaction-form');
const transactionHistoryTable = document.getElementById('transaction-history-table');
const transactionHistoryBody = document.getElementById('transaction-history-body');

let accountBalance = 1000.00;
let transactionHistory = [];

transactionForm.addEventListener('submit', (e) => {
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
    transactionType,
    amount,
    balance: accountBalance.toFixed(2)
  };

  transactionHistory.push(transaction);

  updateTransactionHistory();
  updateAccountBalance();
});

function updateTransactionHistory() {
  transactionHistoryBody.innerHTML = '';
  transactionHistory.forEach((transaction, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${transaction.date}</td>
      <td>${transaction.transactionType}</td>
      <td>${transaction.amount.toFixed(2)}</td>
      <td>${transaction.balance}</td>
    `;
    transactionHistoryBody.appendChild(row);
  });
}

function updateAccountBalance() {
  document.querySelector('.account-info p:nth-child(2)').textContent = `Account Balance: $${accountBalance.toFixed(2)}`;
}