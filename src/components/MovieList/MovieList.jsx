import React, { useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import moviesData from "../../data";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import "./MovieList.css";

const MovieList = () => {
  const [movies, setMovies] = useState(moviesData); // Movie list
  const [filterTitle, setFilterTitle] = useState(""); // Title filter
  const [filterRating, setFilterRating] = useState(0); // Rating filter
  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    posterURL: "",
    rating: 0,
  }); // New movie data
  const [open, setOpen] = useState(false); // Dialog open/close state
  const [filteredMovies, setFilteredMovies] = useState(movies); // Filtered movies
  const [userRating, setUserRating] = useState(""); // User input rating for filtering

  // Add a new movie
  const addMovie = (e) => {
    e.preventDefault();
    const { title, rating } = newMovie;

    // Validation for required fields
    if (!title.trim() || !rating) {
      alert("Please provide a title and a valid rating!");
      return;
    }

    // Add the movie to the list
    const updatedMovies = [
      ...movies,
      {
        ...newMovie,
        id: movies.length + 1,
        rating: parseFloat(rating), // Ensure rating is numeric
      },
    ];
    setMovies(updatedMovies);

    // Reset the form and close dialog
    setNewMovie({ title: "", description: "", posterURL: "", rating: 0 });
    setFilteredMovies(updatedMovies); // Update filtered movies
    setOpen(false);
  };

  // Handle search and filter button click
  const handleSearch = () => {
    // Filter the movies based on the title and rating
    const filtered = movies
      .filter((movie) => {
        // Check if the title matches (case-insensitive)
        const titleMatch = movie.title
          .toLowerCase()
          .includes(filterTitle.toLowerCase());

        // Check if the rating is equal to the user input
        const ratingMatch = movie.rating == filterRating;

        // Both title and rating need to match
        return titleMatch && ratingMatch;
      })
      .sort((a, b) => b.rating - a.rating); // Sort in descending order of rating
    setFilteredMovies(filtered);
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Watch What You Love</h1>

      {/* Filter and Search Section */}
      <div className="filter-container mb-4 d-flex flex-wrap justify-content-between align-items-center">
        {/* Left Section: Filter and Rating */}
        <div className="d-flex flex-column flex-md-row w-100 justify-content-between align-items-center">
          {/* Filter Input */}
          <div className="d-flex flex-column flex-md-row align-items-center w-100 mb-3 mb-md-0">
            <TextField
              fullWidth
              placeholder="Filter by title"
              variant="outlined"
              value={filterTitle}
              onChange={(e) => setFilterTitle(e.target.value)}
              InputProps={{
                style: { backgroundColor: "white" },
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              className="me-md-3"
            />
            {/* Rating Filter */}
            <div className="rating-filter mt-3 mt-md-0">
              <span className="me-2">Rating:</span>
              <Rating
                name="filter-rating"
                value={filterRating}
                onChange={(e, newValue) => setFilterRating(newValue || 0)}
                precision={0.5}
                sx={{ "& .MuiRating-iconEmpty": { color: "gold" } }}
              />
            </div>
          </div>
        </div>

        {/* Right Section: Buttons */}
        <div className="d-flex flex-wrap justify-content-md-end mt-3 mt-md-0">
          {/* Search Button */}
          <Button
            id="searchbtn"
            variant="contained"
            color="primary"
            onClick={handleSearch}
            className="me-2"
          >
            Search
          </Button>
          {/* Add Movie Button */}
          <Button
            id="add movie btn btn"
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
          >
            Add Movie
          </Button>
        </div>
      </div>

      {/* Dialog for Adding Movie */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add a New Movie</DialogTitle>
        <DialogContent>
          <form onSubmit={addMovie}>
            <TextField
              fullWidth
              margin="normal"
              label="Title"
              variant="outlined"
              value={newMovie.title}
              onChange={(e) =>
                setNewMovie({ ...newMovie, title: e.target.value })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Poster URL"
              variant="outlined"
              value={newMovie.posterURL}
              onChange={(e) =>
                setNewMovie({ ...newMovie, posterURL: e.target.value })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              value={newMovie.description}
              onChange={(e) =>
                setNewMovie({ ...newMovie, description: e.target.value })
              }
            />
            <div className="d-flex align-items-center mt-3">
              <span className="me-2">Rating:</span>
              <Rating
                name="add-rating"
                value={parseFloat(newMovie.rating) || 0}
                onChange={(e, newValue) =>
                  setNewMovie({ ...newMovie, rating: newValue || 0 })
                }
                precision={0.5}
                sx={{ "& .MuiRating-iconEmpty": { color: "gold" } }}
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={addMovie} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Movie Cards */}
      <div className="row g-3 mt-4">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div className="col-md-4" key={movie.id}>
              <MovieCard movie={movie} />
            </div>
          ))
        ) : (
          <p className="text-center">No movies match the filter criteria.</p>
        )}
      </div>
    </div>
  );
};

export default MovieList;
