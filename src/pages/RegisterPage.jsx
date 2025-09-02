import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';
import AuthForm from '../components/AuthForm';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    try {
      await apiClient.post('/register/', { username, password });
      navigate('/login');
    } catch (err) {
      if (err.response && err.response.data.username) {
        setError(err.response.data.username[0]);
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <AuthForm
      formType="Register"
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      error={error}
    />
  );
}

export default RegisterPage;