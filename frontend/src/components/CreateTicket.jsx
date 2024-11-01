import React, { useState } from 'react';
import { createTicket } from '../api/api';

const CreateTicket = ({ user }) => {
    const [issue, setIssue] = useState('');

    const handleCreateTicket = async () => {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        if (!token) {
            alert('You need to log in first');
            return;
        }
        try {
            const ticketData = { issue };
            const response = await createTicket(ticketData, token); // Call createTicket with token
            alert('Ticket created successfully: ' + JSON.stringify(response.data)); // Show success message
            setIssue(''); // Clear the issue input
        } catch (error) {
            console.error('Error response:', error.response); // Log the full error response
            const errorMessage = error.response?.data?.msg || 'Failed to create ticket';
            alert(errorMessage); // Show specific error message
        }
    };

    return (
        <div>
            <h2>Create a Support Ticket</h2>
            <textarea
                placeholder='Describe your issue...'
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
            />
            <button onClick={handleCreateTicket}>Submit Ticket</button>
        </div>
    );
};

export default CreateTicket;

