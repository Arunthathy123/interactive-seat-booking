import React, { useState } from "react";
import MovieCard from "@/componets/MovieCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "./Button";

const MovieList = ({ movies }) => {
    const [showAll, setShowAll] = useState(false);

    const handleToggle = () => {
        setShowAll(!showAll);
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className="mt-12 px-10">
            <div className="flex items-center justify-between mt-4 ">
                <h6 className="text-gray-200 font-bold text-lg">Now playing</h6>
                <Button
                    onClick={handleToggle}
                    text={showAll ? "See Less" : "See All"}
                    className="text-gray-200 underline decoration-red-700 underline-offset-4 hover:decoration-red-400 px-4 py-2 rounded"
                />

            </div>
            <hr className="text-gray-800 mt-3"/>
            <div className="mt-6">
                {!showAll ? (
                    <Slider {...settings}>
                        {movies.map((movie) => (
                            <div key={movie.id} className="px-6 py-1">
                                <MovieCard movie={movie} />
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieList;
