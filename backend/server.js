const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 5000;

// Enable CORS
app.use(cors());

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

// API routes
app.get('/api/englishmovies', (req, res) => {
  res.sendFile(path.join(__dirname, 'data', 'englishmovies.json'));
});

app.get('/api/telugumovies', (req, res) => {
  res.sendFile(path.join(__dirname, 'data', 'telugumovies.json'));
});

app.get('/api/hindimovies', (req, res) => {
  res.sendFile(path.join(__dirname, 'data', 'hindimovies.json'));
});

// Catch-all handler to serve React's index.html for any unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});