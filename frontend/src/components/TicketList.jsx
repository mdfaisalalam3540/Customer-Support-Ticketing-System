import React, { useEffect, useState } from 'react';
import { getTickets, updateTicketStatus } from '../api/api';

const TicketList = ({ user }) => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchTickets = async () => {
            if (user && user.token) {
                console.log("User token:", user.token); // Check token here
                try {
                    const response = await getTickets(user.token);
                    setTickets(response.data);
                } catch (error) {
                    console.error("Error fetching tickets:", error);
                    alert("Failed to fetch tickets");
                }
            }
        };
        fetchTickets();
    }, [user]);

    const handleUpdateStatus = async (id, status) => {
        if (!user || user.role !== 'admin') {
            alert('Only admins can update ticket status');
            return;
        }
        try {
            await updateTicketStatus(id, { status }, user.token); // Fixed typo here
            alert('Ticket status updated');
            setTickets(tickets.map(ticket =>
                ticket._id === id ? { ...ticket, status } : ticket
            ));
        } catch (error) {
            console.error("Error updating status:", error);
            alert('Failed to update status');
        }
    };

    return (
        <div>
            <h2>Support Tickets</h2>
            <ul>
                {tickets.map(ticket => (
                    <li key={ticket._id}>
                        <p><strong>Issue:</strong> {ticket.issue}</p>
                        <p><strong>Status:</strong> {ticket.status}</p>
                        {user.role === 'admin' && (
                            <select
                                value={ticket.status}
                                onChange={(e) => handleUpdateStatus(ticket._id, e.target.value)}
                            >
                                <option value="open">Open</option>
                                <option value="in-progress">In Progress</option>
                                <option value="closed">Closed</option>
                            </select>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TicketList;
