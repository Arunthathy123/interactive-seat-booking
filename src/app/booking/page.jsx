// pages/BookingPage.js
"use client"; // Mark this file as a client-side component

import { useEffect, useState } from "react";
import Header from "@/componets/Header";
import MovieCard from "@/componets/MovieCard";
import { fetchMovies } from "@/services/imdbApi";
import LocationPopup from "@/componets/LocationPopup";
import CaroselBanner from "@/componets/CaroselBanner";

export default function BookingPage() {
    const [movies, setMovies] = useState([]);
    console.log("movies-->>", movies);
    
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
    };

    return (
        <div className="bg-[#191919]">
            <div className="h-auto  items-center">
                <Header />
            </div>
            <div className=" min-h-screen">
                <div>
                    <LocationPopup onSelectLocation={handleLocationSelect} />
                    {selectedLocation && <p cl>Selected Location: {selectedLocation}</p>}
                    <CaroselBanner />
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 mt-12 px-6">
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
        </div>
    );
}
