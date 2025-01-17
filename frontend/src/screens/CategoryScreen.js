// src/screens/CategoryScreen.js
import React, { useState, useEffect } from 'react';
import { Typography, Grid, Button, Box } from '@mui/material';
import MovieCard from '../components/MovieCard';
import './CategoryScreen.css';

function CategoryScreen({ category, searchQuery }) {
  const [items, setItems] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedSubcategory) return;

      let data = [];
      if (category === 'movies') {
        const response = await fetch(`http://localhost:5000/api/${selectedSubcategory}`);
        data = await response.json();
      } else if (category === 'sports') {
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${selectedSubcategory}`);
        data = await response.json();
      }
      const shows = data.map(item => item.show);
      setItems(shows);
    };

    fetchData();
  }, [selectedSubcategory, category]);

  const filteredItems = items.filter(item =>
    item && item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="category-screen">
      <Typography variant="h4" align="center" gutterBottom className="category-title">
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </Typography>
      <Box display="flex" justifyContent="center" mb={2} className="subcategory-buttons">
        {category === 'movies' && (
          <>
            <Button variant="contained" color="primary" onClick={() => setSelectedSubcategory('englishmovies')} style={{ margin: '0 10px' }}>English</Button>
            <Button variant="contained" color="primary" onClick={() => setSelectedSubcategory('telugumovies')} style={{ margin: '0 10px' }}>Telugu</Button>
            <Button variant="contained" color="primary" onClick={() => setSelectedSubcategory('hindimovies')} style={{ margin: '0 10px' }}>Hindi</Button>
          </>
        )}
        {category === 'sports' && (
          <>
            <Button variant="contained" color="primary" onClick={() => setSelectedSubcategory('cricket')} style={{ margin: '0 10px' }}>Cricket</Button>
            <Button variant="contained" color="primary" onClick={() => setSelectedSubcategory('kabbadi')} style={{ margin: '0 10px' }}>Kabbadi</Button>
            <Button variant="contained" color="primary" onClick={() => setSelectedSubcategory('chess')} style={{ margin: '0 10px' }}>Chess</Button>
          </>
        )}
      </Box>
      <div className="items-list">
        {filteredItems.map((item) => (
          <MovieCard key={item.id} movie={item} />
        ))}
      </div>
    </div>
  );
}

export default CategoryScreen;