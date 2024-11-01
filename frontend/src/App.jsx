import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import CreateTicket from './components/CreateTicket';
import TicketList from './components/TicketList';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <div>
      <h1>Customer Support Ticketing System</h1>
      <Register />
      <Login setUser = {setUser} />
      <CreateTicket user = {user} />
      <TicketList user = {user} />
    </div>
  )
}

export default App

