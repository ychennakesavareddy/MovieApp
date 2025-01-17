// src/screens/DetailsScreen.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import MovieModal from '../components/MovieModal';
import './DetailsScreen.css';

function DetailsScreen() {
  const { id } = useParams(); // Get the movie ID from the URL parameters
  const [movie, setMovie] = useState(null); // State to store movie details
  const [error, setError] = useState(null); // State to store error message
  const [open, setOpen] = useState(false); // State to manage modal open/close
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    // Function to fetch movie details from the API
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMovie(data); // Set the fetched movie details to state
      } catch (error) {
        setError(error.message); // Set error message if fetch fails
      }
    };

    fetchMovieDetails();
  }, [id]); // Dependency array includes id to refetch if it changes

  // Handlers for opening and closing the modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Render error message if there's an error
  if (error) {
    return <p>Error: {error}</p>;
  }

  // Render loading message while fetching data
  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div className="details-container">
      {/* Back button to navigate to the previous page */}
      <Button onClick={() => navigate(-1)} variant="contained" color="primary" className="back-button">
        Back
      </Button>
      <div className="details-content">
        {/* Display movie image */}
        <div className="details-image">
          <img src={movie.image?.original} alt={movie.name} />
        </div>
        <div className="details-info">
          {/* Display movie details */}
          <h1>{movie.name}</h1>
          <div dangerouslySetInnerHTML={{ __html: movie.summary }} />
          <p><strong>Genres:</strong> {movie.genres.join(', ')}</p>
          <p><strong>Premiered:</strong> {movie.premiered}</p>
          <p><strong>Status:</strong> {movie.status}</p>
          <p><strong>Rating:</strong> {movie.rating?.average || 'N/A'}</p>
          {movie.officialSite && (
            <p><strong>Official Site:</strong> <a href={movie.officialSite} target="_blank" rel="noopener noreferrer">{movie.officialSite}</a></p>
          )}
          <div className="buttons">
            {/* Button to open the modal */}
            <Button variant="contained" color="primary" className="watch-button" onClick={handleOpen}>Watch Now</Button>
            {/* Button to download the movie */}
            <a href={movie.url} download>
              <Button variant="contained" color="secondary" className="download-button">Download</Button>
            </a>
          </div>
        </div>
      </div>
      {/* Movie modal component */}
      <MovieModal open={open} handleClose={handleClose} movieUrl="https://www.example.com/path/to/movie.mp4" />
    </div>
  );
}

export default DetailsScreen;