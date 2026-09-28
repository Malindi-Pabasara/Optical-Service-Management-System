document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault(); 

    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                role: 'Customer' 
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert('"Successfully registered! Now go to the login page.');
            window.location.href = 'login.html'; 
        } else {
            alert('An error occurred. ' + data.message);
        }

    } catch (error) {
        console.error('Error:', error);
        alert('The backend server is not running!');
    }
});