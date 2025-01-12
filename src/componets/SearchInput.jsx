"use client";
import { useState, useEffect } from "react";

const SearchInput = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY; 

  useEffect(() => {
    if (query) {
      fetchMovies(query);
    } else {
      setMovies([]); 
    }
  }, [query]);

  const fetchMovies = async (searchQuery) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
      );
      const data = await response.json();
      setMovies(data.results); // Update movies state with API response
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
    setLoading(false);
  };

  return (
    <div >
      <input
        type="text"
        className="mb-4 p-2 border"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading && <p>Loading...</p>}
      <div className="grid grid-cols-3 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="border p-4">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full"
            />
            <h3 className="mt-2 text-xl">{movie.title}</h3>
            <p>{movie.overview.slice(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
};


export default SearchInput;
