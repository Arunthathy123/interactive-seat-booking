"use client";
import Button from '@/componets/Button';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const MovieDetails = () => {
  const { id } = useParams(); // Getting the dynamic id parameter
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchMovieDetails = async () => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
          );
          if (!response.ok) {
            throw new Error('Failed to fetch movie details');
          }
          const data = await response.json();
          setMovie(data);
        } catch (error) {
          console.error('Error fetching movie details:', error);
        }
      };

      fetchMovieDetails();
    }
  }, [id]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  const bannerUrl = movie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` : '';
  const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '';

  return (
    <div className="relative">
        {/* Image with 100vh height, object-fit: cover to prevent stretching */}
        {bannerUrl && (
            <img
            src={bannerUrl}
            alt={movie.title}
            className="absolute top-0 left-0 w-full h-full lg:h-[70vh] object-cover"
            />
        )}
        {/* Black overlay with opacity */}
        <div className="absolute top-0 left-0 w-full  h-full lg:h-[70vh] bg-black opacity-80" />

        <div className='relative z-10 flex flex-col lg:flex-row items-center h-full lg:h-[70vh] gap-14 justify-between px-10 py-16'>
            {/* Poster Image Section */}
            <div className="lg:w-1/3 mb-8 lg:mb-0">
                <img
                    src={posterUrl}
                    alt={movie.title}
                    className="rounded-md h-auto max-h-[400px] w-full object-cover"
                />
            </div>

                
            <div className="lg:w-2/3 text-white">
                <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold whitespace-nowrap">{movie.title}</h1>
                <p className="mt-4">{movie.overview}</p>
                <p className="mt-2">Release Date: {movie.release_date}</p>
                <Button className='px-4 py-2 bg-red-700 rounded-lg mt-6 text-white text-lg'  text='Book Ticket'/>
            </div>
        </div>
    </div>
  );
};

export default MovieDetails;
