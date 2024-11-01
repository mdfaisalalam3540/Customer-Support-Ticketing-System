import React, { useState } from 'react';
import { login } from '../api/api';

const Login = ({ setUser }) => {
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleLogin = async () => {
        try {
            const response = await login(formData);
            const token = response.data.token;
            const role = response.data.role;

            // Save token and role to localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);

            // Update user state with token and role
            setUser({ token, role });

            alert('Login Successful');
        } catch (error) {
            console.error("Error during login:", error);
            alert('Login failed');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
