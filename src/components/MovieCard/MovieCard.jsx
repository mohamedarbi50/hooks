import React from "react";
import Rating from "@mui/material/Rating";
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  return (
    <div className="card h-100 shadow-sm border-0">
      <img
        src={movie.posterURL}
        className="card-img-top"
        alt={movie.title} // Make sure the alt text is descriptive
        style={{
          height: "250px",
          width: "100%",
          objectFit: "cover",
          borderRadius: "8px 8px 0 0",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
      />
      <div className="card-body">
        <h5 className="card-title">{movie.title}</h5>
        <p className="card-text">{movie.description}</p>
        <Rating
          name="read-only-rating"
          value={movie.rating || 0} 
        />
      </div>
    </div>
  );
};

export default MovieCard;
