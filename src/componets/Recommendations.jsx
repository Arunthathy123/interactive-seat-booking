import { useEffect, useState } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Recommendations = ({ movieId }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        );
        const data = await response.json();
        setRecommendations(data.results);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchRecommendations();
  }, [movieId]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="px-6 lg:px-10 py-8 mt-20">
        <h2 className="text-2xl font-bold mb-2 text-gray-200">Recommendations</h2>
        <hr className="mb-10" />
        <Slider {...settings} className='px-4 lg:px-0'>
            {recommendations.map((movie) => (
            <div key={movie.id} className="p-2">
                <Image
                src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                alt={movie.title}
                width={150}
                height={220}
                className="rounded-md object-cover"
                />
                <p className="mt-2 text-gray-200 text-center">{movie.title}</p>
            </div>
            ))}
        </Slider>
    </div>
  );
};

export default Recommendations;
