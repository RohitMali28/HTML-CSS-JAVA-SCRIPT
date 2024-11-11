// Mock Data Storage
let users = JSON.parse(localStorage.getItem("users")) || [];
let attendanceRecords = JSON.parse(localStorage.getItem("attendanceRecords")) || {};

// Store user registration data
document.getElementById("registerForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("newEmail").value;
    const password = document.getElementById("newPassword").value;

    if (users.some(user => user.email === email)) {
        alert("User already exists!");
        return;
    }

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful!");
    window.location.href = "login.html";
});

// Login Functionality
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        localStorage.setItem("loggedInUser", email);
        window.location.href = "dashboard.html";
    } else {
        alert("Username or Passward is Wrong");
    }
});

// Check-in and Check-out Logic
const loggedInUser = localStorage.getItem("loggedInUser");

if (loggedInUser) {
    document.getElementById("checkInButton").addEventListener("click", function () {
        const date = new Date().toLocaleDateString();
        const checkInTime = new Date().toLocaleTimeString();

        if (!attendanceRecords[loggedInUser]) {
            attendanceRecords[loggedInUser] = {};
        }
        attendanceRecords[loggedInUser][date] = { checkIn: checkInTime, checkOut: null };
        localStorage.setItem("attendanceRecords", JSON.stringify(attendanceRecords));
        alert(`Check-in successful at ${checkInTime}`);
        document.getElementById("checkOutButton").disabled = false;
    });

    document.getElementById("checkOutButton").addEventListener("click", function () {
        const date = new Date().toLocaleDateString();
        const checkOutTime = new Date().toLocaleTimeString();

        if (attendanceRecords[loggedInUser] && attendanceRecords[loggedInUser][date]) {
            attendanceRecords[loggedInUser][date].checkOut = checkOutTime;
            localStorage.setItem("attendanceRecords", JSON.stringify(attendanceRecords));
            alert(`Check-out successful at ${checkOutTime}`);
            document.getElementById("checkOutButton").disabled = true;
        }
    });

    // Display Attendance History
    const historyBody = document.getElementById("historyBody");
    if (attendanceRecords[loggedInUser]) {
        for (let date in attendanceRecords[loggedInUser]) {
            const record = attendanceRecords[loggedInUser][date];
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${date}</td>
                <td>${record.checkIn || 'Absent'}</td>
                <td>${record.checkOut || ''}</td>
                <td>${record.checkIn ? 'Present' : 'Absent'}</td>
            `;
            historyBody.appendChild(row);
        }
    }
}

// Logout Logic
document.getElementById("logoutButton")?.addEventListener("click", function () {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
});