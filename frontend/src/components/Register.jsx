import React, { useState } from 'react';
import { register } from '../api/api';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });

    const handleRegister = async () => {
        // Basic validation
        if (!formData.username || !formData.email || !formData.password) {
            alert('Please fill in all fields');
            return;
        }

        try {
            await register(formData);
            alert('Registered Successfully');
            // Optionally, you could reset the form or redirect the user here
        } catch (error) {
            console.error(error);
            alert('Registration failed: ' + (error.response?.data?.msg || 'Unknown error'));
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <input
                type='text'
                placeholder='Username'
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
            <input
                type='email'
                placeholder='Email'
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
                type='password'
                placeholder='Password'
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Register;

