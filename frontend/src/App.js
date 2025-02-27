import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Buscar usuários
  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:3001/users');
    setUsers(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Adicionar usuário
  const addUser = async () => {
    await axios.post('http://localhost:3001/users', { name, email });
    fetchUsers();
  };

  return (
    <div>
      <h1>CRUD com React, Node.js e MySQL</h1>
      <div>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={addUser}>Adicionar Usuário</button>
      </div>

      <h2>Lista de Usuários</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
