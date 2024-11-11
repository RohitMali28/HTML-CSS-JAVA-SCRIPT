document.getElementById("claimForm").addEventListener("submit", function(event) {
    event.preventDefault();
    submitClaim();
});

let claims = [];

function showSection(sectionId) {
    document.querySelectorAll("main section").forEach(section => {
        section.classList.add("hidden");
    });
    document.getElementById(sectionId).classList.remove("hidden");
}

function submitClaim() {
    const policyNumber = document.getElementById("policyNumber").value;
    const incidentDate = document.getElementById("incidentDate").value;
    const incidentDescription = document.getElementById("incidentDescription").value;
    const fileUpload = document.getElementById("fileUpload").files;

    if (!policyNumber || !incidentDate || !incidentDescription) {
        document.getElementById("formMessage").textContent = "Please fill in all required fields.";
        document.getElementById("formMessage").style.color = "red";
        return;
    }

    const claimNumber = "CLM" + (claims.length + 1).toString().padStart(3, '0');
    const claim = {
        claimNumber,
        policyNumber,
        incidentDate,
        incidentDescription,
        files: fileUpload,
        status: "Submitted",
        submissionDate: new Date().toLocaleDateString()
    };

    claims.push(claim);
    document.getElementById("formMessage").textContent = "Claim submitted successfully!";
    document.getElementById("formMessage").style.color = "green";
    document.getElementById("claimForm").reset();
    updateClaimsTable();
}

function updateClaimsTable() {
    const claimsTableBody = document.getElementById("claimsTableBody");
    claimsTableBody.innerHTML = "";

    claims.forEach(claim => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${claim.claimNumber}</td>
            <td>${claim.status}</td>
            <td>${claim.submissionDate}</td>
            <td>
                <button onclick="editClaim('${claim.claimNumber}')">Edit</button>
                <button onclick="deleteClaim('${claim.claimNumber}')">Delete</button>
            </td>
        `;
        claimsTableBody.appendChild(row);
    });
}

function editClaim(claimNumber) {
    const claim = claims.find(c => c.claimNumber === claimNumber);
    if (claim) {
        document.getElementById("policyNumber").value = claim.policyNumber;
        document.getElementById("incidentDate").value = claim.incidentDate;
        document.getElementById("incidentDescription").value = claim.incidentDescription;
        showSection('fileClaim');
    }
}

function deleteClaim(claimNumber) {
    claims = claims.filter(c => c.claimNumber !== claimNumber);
    updateClaimsTable();
}

document.getElementById("searchBar").addEventListener("input", function() {
    const query = this.value.toLowerCase();
    const results = knowledgeBase.filter(article => article.title.toLowerCase().includes(query) || article.content.toLowerCase().includes(query));
    displaySearchResults(results);
});

const knowledgeBase = [
    { title: "How to File a Claim", content: "To file a claim, click on the 'File a Claim' button and fill out the form." },
    { title: "Claim Status", content: "You can track your claim status by clicking on the 'Track Claims' button." },
    { title: "Insurance Policies", content: "Learn more about our insurance policies by visiting our policies page." },
    { title: "Policy Types", content: "We offer various types of policies including health, auto, home, and life insurance." },
    { title: "Claim History", content: "You can view your claim history by clicking on the 'Track Claims' button." },
    { title: "Edit Policy Details", content: "To edit your policy details, contact our customer service." },
    { title: "Common Questions", content: "Find answers to common questions in our knowledge base." },
    { title: "Contact Support", content: "For further assistance, contact our support team." },
    { title: "Premium Payment", content: "Learn how to pay your insurance premiums online." },
    { title: "Renew Policy", content: "Find out how to renew your insurance policy." },
    { title: "Contact Detail's", content: "Mail us on: eruoiewr@gmail.com for more information Contact: +919090909090 "}
];

function displaySearchResults(results) {
    const searchResults = document.getElementById("searchResults");
    searchResults.innerHTML = "";

    results.forEach(result => {
        const article = document.createElement("div");
        article.innerHTML = `
            <h3>${result.title}</h3>
            <p>${result.content}</p>
        `;
        searchResults.appendChild(article);
    });
}