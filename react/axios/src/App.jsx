import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users'; // Replace with your mock API URL

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', username: '', email: '' });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    // Fetch users from the API
    axios.get(API_URL)
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleAddUser = () => {
    // Add a new user
    axios.post(API_URL, newUser)
      .then(response => setUsers([...users, response.data]))
      .catch(error => console.error('Error adding user:', error));

    // Clear the new user form
    setNewUser({ name: '', username: '', email: '' });
  };

  const handleEditUser = (user) => {
    // Set the user to be edited
    setEditingUser(user);
  };

  const handleUpdateUser = () => {
    // Update the edited user
    axios.put(`${API_URL}/${editingUser.id}`, editingUser)
      .then(response => {
        setUsers(users.map(user => (user.id === editingUser.id ? response.data : user)));
        setEditingUser(null);
      })
      .catch(error => console.error('Error updating user:', error));
  };

  const handleDeleteUser = (id) => {
    // Delete a user
    axios.delete(`${API_URL}/${id}`)
      .then(() => setUsers(users.filter(user => user.id !== id)))
      .catch(error => console.error('Error deleting user:', error));
  };

  return (
    <div className="App">
      <h1>User Management</h1>

      {/* Add User Form */}
      <div>
        <h2>Add User</h2>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>

      {/* User List */}
      <div>
        <h2>User List</h2>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.name} - {user.username} ({user.email})
              <button onClick={() => handleEditUser(user)}>Edit</button>
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Edit User Form */}
      {editingUser && (
        <div>
          <h2>Edit User</h2>
          <input
            type="text"
            placeholder="Name"
            value={editingUser.name}
            onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Username"
            value={editingUser.username}
            onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
          />
          <input
            type="text"
            placeholder="Email"
            value={editingUser.email}
            onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
          />
          <button onClick={handleUpdateUser}>Update User</button>
          <button onClick={() => setEditingUser(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default App;
