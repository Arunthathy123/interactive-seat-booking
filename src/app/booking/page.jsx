"use client";

import { useEffect, useState } from "react";
import Header from "@/componets/Header";
import { fetchMovies } from "@/services/imdbApi";
import LocationPopup from "@/componets/LocationPopup";
import CaroselBanner from "@/componets/CaroselBanner";
import MovieList from "@/componets/MovieList";

export default function BookingPage() {
    const [movies, setMovies] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState("");

    useEffect(() => {
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
            <div className="h-auto items-center">
                <Header />
            </div>
            <div className="min-h-screen">
                <div>
                    <LocationPopup onSelectLocation={handleLocationSelect} />
                    {selectedLocation && <p className="text-white">Selected Location: {selectedLocation}</p>}
                    <CaroselBanner />
                    <MovieList movies={movies} />
                </div>
            </div>
        </div>
    );
}
