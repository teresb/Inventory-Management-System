import React, { useState } from 'react';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (data.isAdmin) {
                alert('Welcome, Admin!');
                // Redirect to the admin dashboard or another admin-specific page
                window.location.href = '/admin-dashboard'; // You can create this page later
            } else {
                alert(data.message);
                // Redirect to a regular user page or dashboard
                window.location.href = '/user-dashboard'; // You can create this page later
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    


    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
                <label>Username:</label>
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <label>Password:</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit" style={{ marginTop: '20px' }}>Login</button>
            </form>
            <button 
                onClick={() => window.location.href='/register'} 
                style={{ marginTop: '20px' }}
            >
                Don't have an account? Register
            </button>
        </div>
    );
}

export default Login;
