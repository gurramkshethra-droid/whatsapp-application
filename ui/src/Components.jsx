import { useState } from 'react';
import { useAuth } from './AuthContext';

export const Login = () => {
  const [name, setName] = useState(''); // Local State
  const { login } = useAuth();           // Global Actions

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) login({ name, role: 'Developer' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login Screen</h2>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Enter username" 
      />
      <button type="submit">Login</button>
    </form>
  );
};

export const Home = () => {
  const { user } = useAuth();
  return <h2>Welcome to the Home Screen, {user?.name}!</h2>;
};

export const Profile = () => {
  const { user, logout } = useAuth();
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
      <h2>Profile Screen</h2>
      <p><strong>Username:</strong> {user?.name}</p>
      <p><strong>Role:</strong> {user?.role}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};