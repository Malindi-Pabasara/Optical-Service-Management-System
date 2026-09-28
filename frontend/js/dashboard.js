// Page Load 
document.addEventListener('DOMContentLoaded', () => {
    // LocalStorage Login to User Details
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) {
        alert('Please log in first. (Login)!');
        window.location.href = 'login.html';
        return;
    }

    // Dashboard User Name
    document.getElementById('userName').innerText = user.name;

    // User Appointments List Fetching
    fetchUserAppointments(user.id);
});

// 1. Appointments List
async function fetchUserAppointments(userId) {
    try {
        const response = await fetch(`http://localhost:5000/api/appointments/user/${userId}`);
        const appointments = await response.json();
        const listContainer = document.getElementById('appointmentsList');

        if (response.ok && appointments.length > 0) {
            listContainer.innerHTML = ''; // Clear previous list
            appointments.forEach(app => {
                const item = document.createElement('div');
                item.className = 'appointment-item';
                item.innerHTML = `
                    <p><strong>Date:</strong> ${app.appointment_date}</p>
                    <p><strong>Time:</strong> ${app.appointment_time}</p>
                    <p><strong>Notes:</strong> ${app.notes || 'No notes'}</p>
                `;
                listContainer.appendChild(item);
            });
        }
    } catch (error) {
        console.error('Error fetching appointments:', error);
    }
}

// 2. New Appointment Booking
document.getElementById('bookAppointmentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const user = JSON.parse(localStorage.getItem('user'));
    const date = document.getElementById('appointmentDate').value;
    const time = document.getElementById('appointmentTime').value;
    const notes = document.getElementById('appointmentNotes').value;

    try {
        const response = await fetch('http://localhost:5000/api/appointments/book', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: user.id,
                appointment_date: date,
                appointment_time: time,
                notes: notes
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert('The appointment has been successfully booked!');
            document.getElementById('bookAppointmentForm').reset();
            fetchUserAppointments(user.id); // List Refresh 
        } else {
            alert('An error: ' + data.message);
        }
    } catch (error) {
        alert('Cannot connect to the server!');
    }
});
    
    
// Logout 
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'login.html';
});


document.addEventListener("DOMContentLoaded", () => {
    loadPatientPrescriptions();
});

async function loadPatientPrescriptions() {
    const tableBody = document.getElementById("prescriptionTableBody");
    const token = localStorage.getItem("userToken"); // User Token

    try {
        // Backend Prescription URL 
    const response = await fetch("http://localhost:5000/api/prescriptions", {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    }
});

        const data = await response.json();

        if (response.ok && data.length > 0) {
            tableBody.innerHTML = ""; 
            
            data.forEach(prescription => {
                const row = `
                    <tr style="border-bottom: 1px solid #dee2e6;">
                        <td style="padding: 12px;">${new Date(prescription.date).toLocaleDateString()}</td>
                        <td style="padding: 12px;">Dr. ${prescription.doctorName}</td>
                        <td style="padding: 12px;"><span style="background: #e2f0fe; color: #025aa5; padding: 4px 8px; border-radius: 4px; font-size: 14px;">${prescription.diagnosis}</span></td>
                        <td style="padding: 12px;">${prescription.medication}</td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        } else {
            tableBody.innerHTML = `<tr><td colspan="4" style="padding: 15px; text-align: center; color: #777;">No prescriptions found.</td></tr>`;
        }
    } catch (error) {
        console.error("Error fetching prescriptions:", error);
        tableBody.innerHTML = `<tr><td colspan="4" style="padding: 15px; text-align: center; color: #dc3545;">Error loading prescriptions.</td></tr>`;
    }
}