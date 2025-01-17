// src/components/MovieModal.js
import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './MovieModal.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  outline: 'none',
};

function MovieModal({ open, handleClose, movieUrl }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="movie-modal-title"
      aria-describedby="movie-modal-description"
    >
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography id="movie-modal-title" variant="h6" component="h2">
          Movie Player
        </Typography>
        <div className="movie-player">
          <video width="100%" height="400px" controls>
            <source src={movieUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </Box>
    </Modal>
  );
}

export default MovieModal;