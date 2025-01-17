// src/components/SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Button, TextField, Typography, Box, Container, Paper } from '@mui/material';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('User signed up successfully!');
      navigate('/signin');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Paper elevation={3} sx={{ p: 4, maxWidth: '400px', width: '100%' }}>
          <Box component="form" onSubmit={handleSignUp}>
            <Typography variant="h4" gutterBottom>
              Sign Up
            </Typography>
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2 }}
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mb: 2 }}>
              Sign Up
            </Button>
            <Button variant="text" onClick={() => navigate('/signin')} fullWidth>
              Already have an account? Sign In
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default SignUp;