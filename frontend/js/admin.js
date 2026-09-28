document.addEventListener("DOMContentLoaded", () => {
    
    loadAdminDashboardData();
});

async function loadAdminDashboardData() {
    // 1. Doctors Data
    const dummyDoctors = [
        { id: "D001", name: "Sunil Perera", specialization: "Eye Surgeon", email: "sunil@gmail.com" },
        { id: "D002", name: "Kasun Alwis", specialization: "Optometrist", email: "kasun@gmail.com" },
        { id: "D003", name: "Chathuranga Silva", specialization: "General Physician", email: "chathuranga@gmail.com" }
    ];

    // 2. Patients Data
    const dummyPatients = [
        { id: "P001", name: "Hiru Amasha", email: "hiru@gmail.com", phone: "0771234567" },
        { id: "P002", name: "Kamil Perera", email: "kamil@gmail.com", phone: "0719876543" },
        { id: "P003", name: "Nipun Pranandu", email: "nipun@gmail.com", phone: "0751112223" }
    ];

    // UI Counters
    document.getElementById("totalDoctors").innerText = dummyDoctors.length;
    document.getElementById("totalPatients").innerText = dummyPatients.length;

    // Doctors Table 
    const doctorsTable = document.getElementById("adminDoctorsTable");
    if (doctorsTable) {
        doctorsTable.innerHTML = "";
        dummyDoctors.forEach(doc => {
            doctorsTable.innerHTML += `
                <tr>
                    <td><strong>Dr. ${doc.name}</strong></td>
                    <td><span class="badge bg-secondary">${doc.specialization}</span></td>
                    <td>${doc.email}</td>
                    <td>
                        <button class="btn btn-sm btn-danger" onclick="deleteUser('${doc.id}', 'doctor')">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </td>
                </tr>`;
        });
    }

    // Patients Table 
    const patientsTable = document.getElementById("adminPatientsTable");
    if (patientsTable) {
        patientsTable.innerHTML = "";
        dummyPatients.forEach(pat => {
            patientsTable.innerHTML += `
                <tr>
                    <td>${pat.name}</td>
                    <td>${pat.email}</td>
                    <td>${pat.phone}</td>
                    <td>
                        <button class="btn btn-sm btn-danger" onclick="deleteUser('${pat.id}', 'patient')">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </td>
                </tr>`;
        });
    }
}

function deleteUser(userId, role) {
    if (confirm(`Do you believe this ${role}  (ID: ${userId}) It needs to be removed from the system?`)) {
        alert("Successful! ");
    }
}

function adminLogout() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userRole");
    window.location.href = "login.html";
}