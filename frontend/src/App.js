// src/App.js
import React, { useState } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Button, TextField, Container, Box, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import HomeScreen from './screens/HomeScreen';
import CategoryScreen from './screens/CategoryScreen';
import DetailsScreen from './screens/DetailsScreen';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Admin from './components/Admin';
import PrivateRoute from './components/PrivateRoute';
import { auth } from './firebase';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation hook to get the current path
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    signOut(auth);
    navigate('/signin');
  };

  const hideSearchBar = ['/signin', '/signup', '/admin'].includes(location.pathname);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
          <Button color="inherit" onClick={() => navigate('/movies')}>Movies</Button>
          <Button color="inherit" onClick={() => navigate('/sports')}>Sports</Button>
          <Box sx={{ flexGrow: 1 }} />
          {user && (
            <IconButton color="inherit" onClick={handleProfileMenuOpen}>
              <Avatar>{user.email.charAt(0).toUpperCase()}</Avatar>
            </IconButton>
          )}
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
          >
            <MenuItem disabled>{user?.email}</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Container>
        {!hideSearchBar && (
          <Box my={2} className="search-bar">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search for movies or sports..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Box>
        )}
        <Routes>
          <Route path="/" element={<PrivateRoute><HomeScreen searchQuery={searchQuery} /></PrivateRoute>} />
          <Route path="/movies" element={<PrivateRoute><CategoryScreen category="movies" searchQuery={searchQuery} /></PrivateRoute>} />
          <Route path="/sports" element={<PrivateRoute><CategoryScreen category="sports" searchQuery={searchQuery} /></PrivateRoute>} />
          <Route path="/details/:id" element={<PrivateRoute><DetailsScreen /></PrivateRoute>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;