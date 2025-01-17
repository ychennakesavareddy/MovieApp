// src/screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { Typography, Grid } from '@mui/material';
import MovieCard from '../components/MovieCard';
import './HomeScreen.css';

function HomeScreen({ searchQuery }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchPopularShows = async () => {
      const response = await fetch('https://api.tvmaze.com/shows');
      const data = await response.json();
      setItems(data);
    };

    fetchPopularShows();
  }, []);

  const filteredItems = items.filter(item =>
    item && item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-screen">
      <Typography variant="h4" align="center" gutterBottom className="home-title">
        Popular Shows and Movies
      </Typography>
      <div className="items-list">
        {filteredItems.map((item) => (
          <MovieCard key={item.id} movie={item} />
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;