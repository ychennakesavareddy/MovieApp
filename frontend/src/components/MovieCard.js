// src/components/MovieCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import './MovieCard.css';

function MovieCard({ movie }) {
  return (
    <Card className="movie-card">
      <Link to={`/details/${movie.id}`} className="movie-card-link">
        <CardMedia
          component="img"
          image={movie.image?.medium}
          alt={movie.name}
        />
        <CardContent className="movie-card-content">
          <Typography variant="h6" component="div">
            {movie.name}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
}

export default MovieCard;