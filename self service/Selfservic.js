const claims = [];
const articles = [
    { title: "How to File a Claim", content: "Step 1: ... " },
    { title: "Understanding Your Policy", content: "Your policy includes ..." },

];

document.getElementById('searchInput').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const results = articles.filter(article => article.title.toLowerCase().includes(query));
    displaySearchResults(results);
});

function displaySearchResults(results) {
    const container = document.getElementById('searchResults');
    container.innerHTML = '';
    results.forEach(article => {
        const div = document.createElement('div');
        div.innerHTML = `<strong>${article.title}</strong><p>${article.content}</p>`;
        container.appendChild(div);
    });
}

document.getElementById('submissionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const policyNumber = document.getElementById('policyNumber').value;
    const incidentDate = document.getElementById('incidentDate').value;
    const incidentDescription = document.getElementById('incidentDescription').value;
    
    // Simple validation
    if (!policyNumber || !incidentDate || !incidentDescription) {
        document.getElementById('formFeedback').textContent = "Please fill all fields.";
        return;
    }
    
    const newClaim = {
        claimNumber: `CLM${claims.length + 1}`,
        status: 'In Review',
        dateSubmitted: new Date().toLocaleDateString(),
        policyNumber,
        incidentDate,
        incidentDescription
    };

    claims.push(newClaim);
    displayClaims();
    document.getElementById('submissionForm').reset();
    document.getElementById('formFeedback').textContent = "Claim submitted successfully!";
});

function displayClaims() {
    const table = document.querySelector('#recentClaims table');
    table.innerHTML = `
        <tr>
            <th>Claim Number</th>
            <th>Status</th>
            <th>Date Submitted</th>
        </tr>`;
    claims.forEach(claim => {
        const row = table.insertRow();
        row.innerHTML = `
            <td>${claim.claimNumber}</td>
            <td>${claim.status}</td>
            <td>${claim.dateSubmitted}</td>`;
    });
}