document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Login Successfully (Login Success)!');
            
            
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            
             // User Role 
    if (data.user.role === 'Doctor') {
        window.location.href = 'doctor-dashboard.html';
    } else {
        window.location.href = 'dashboard.html';
    }
        } else {
            alert('Login Failed: ' + data.message);
        }

    } catch (error) {
        console.error('Error:', error);
        alert('The backend server is not running!');
    }
});