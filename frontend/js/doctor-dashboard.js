document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    // Security: Doctor ක
    if (!user || user.role !== 'Doctor') {
        alert('Only doctors can access this page!');
        window.location.href = 'login.html';
        return;
    }

    document.getElementById('doctorName').innerText = user.name;

    // All Appointment to Backend 
    fetchAllAppointments();
});

// 1. Appointment List
async function fetchAllAppointments() {
    try {
        const response = await fetch('http://localhost:5000/api/appointments/all');
        const appointments = await response.json();
        const listContainer = document.getElementById('allAppointmentsList');

        if (response.ok && appointments.length > 0) {
            listContainer.innerHTML = '';
            appointments.forEach(app => {
                const item = document.createElement('div');
                item.className = 'appointment-item';
                item.style.borderLeft = '5px solid #3498db';
                item.style.cursor = 'pointer';
                item.innerHTML = `
                    <p><strong>Patient ID:</strong> ${app.user_id}</p>
                    <p><strong>Date:</strong> ${app.appointment_date} | <strong>Time:</strong> ${app.appointment_time}</p>
                    <p><strong>Notes:</strong> ${app.notes || 'None'}</p>
                    <button class="select-btn" onclick="selectPatient('${app.id}', '${app.user_id}')" style="background:#3498db; color:white; border:none; padding:5px 10px; border-radius:3px; cursor:pointer; margin-top:5px;">Select to Diagnose</button>
                `;
                listContainer.appendChild(item);
            });
        } else {
            listContainer.innerHTML = '<p>No appointments found.</p>';
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// 2. Appointment to Form 
function selectPatient(appointmentId, patientId) {
    document.getElementById('selectedAppointmentId').value = appointmentId;
    document.getElementById('selectedPatientId').value = patientId;
    document.getElementById('patientNameDisplay').innerText = `Patient (ID: ${patientId})`;
}

// 3. Prescription Save
document.getElementById('addPrescriptionForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const appointmentId = document.getElementById('selectedAppointmentId').value;
    const patientId = document.getElementById('selectedPatientId').value;
    const leftSphere = document.getElementById('leftSphere').value;
    const rightSphere = document.getElementById('rightSphere').value;
    const notes = document.getElementById('prescriptionNotes').value;

    if (!appointmentId) {
        alert('Please select a patient from the list first!');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/prescriptions/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                appointment_id: appointmentId,
                user_id: patientId,
                left_eye_sphere: leftSphere,
                right_eye_sphere: rightSphere,
                prescription_notes: notes
            })
        });

        if (response.ok) {
            alert('The prescription has been successfully saved!');
            document.getElementById('addPrescriptionForm').reset();
            document.getElementById('patientNameDisplay').innerText = '-';
        } else {
            alert('An error occurred!');
        }
    } catch (error) {
        alert('Cannot connect to the backend server!');
    }
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'login.html';
});