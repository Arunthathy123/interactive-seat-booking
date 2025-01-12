// pages/BookingPage.js
"use client"; // Mark this file as a client-side component

import { useEffect, useState } from "react";
import Header from "@/componets/Header";
import MovieCard from "@/componets/MovieCard";
import { fetchMovies } from "@/services/imdbApi";
import LocationPopup from "@/componets/LocationPopup";

export default function BookingPage() {
    const [movies, setMovies] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState("");

    useEffect(() => {
        // Fetch movies inside useEffect
        const getMovies = async () => {
            const movieData = await fetchMovies();
            setMovies(movieData);
        };

        getMovies();
    }, []);

    const handleLocationSelect = (location) => {
        setSelectedLocation(location);
        console.log("Selected location:", location);
    };

    return (
        <div>
            <div className="h-10 items-center">
                <Header />
            </div>
            <div className="p-6 min-h-screen">
                <div>
                    <LocationPopup onSelectLocation={handleLocationSelect} />
                    {selectedLocation && <p>Selected Location: {selectedLocation}</p>}

                    {movies.length > 0 ? (
                        movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))
                    ) : (
                        <p>Loading movies...</p>
                    )}
                </div>
            </div>
        </div>
    );
}
