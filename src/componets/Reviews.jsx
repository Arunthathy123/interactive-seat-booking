import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from './Button';
import Image from 'next/image';

const Reviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  const [seeAll, setSeeAll] = useState(false);
  const [activeReview, setActiveReview] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        );
        const data = await response.json();
        setReviews(data.results);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [movieId]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
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

  const openReview = (review) => {
    setActiveReview(review);
  };

  const closeReview = () => {
    setActiveReview(null);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = Math.ceil(rating - fullStars);
    const emptyStars = 5 - fullStars - halfStars;

    let stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="text-yellow-400">★</span>);
    }
    
    for (let i = 0; i < halfStars; i++) {
      stars.push(<span key={`half-${i}`} className="text-yellow-400">★</span>);
    }
    
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-400">★</span>);
    }

    return stars;
  };

  return (
    <div className="px-4 lg:px-10 py-8">
      <div className="flex items-center justify-between mt-4">
        <h2 className="text-2xl font-bold mb-2 text-gray-200">Reviews</h2>
        <Button
          onClick={() => setSeeAll(!seeAll)}
          text={seeAll ? "See Less" : "See All"}
          className="text-gray-200 underline decoration-red-700 underline-offset-4 hover:decoration-red-400 px-4 py-2 rounded"
        />
      </div>
      <hr className="mb-10" />
      {reviews.length === 1 ? (
        <div className="p-4 bg-gray-800 rounded-md shadow-md">
          <div className="flex items-center mb-2">
            <Image
              width={500}
              height={500}
              src={
                reviews[0].author_details?.avatar_path
                  ? `https://www.themoviedb.org/t/p/w500${reviews[0].author_details.avatar_path}`
                  : '/images/avathar.png'
              }
              alt={reviews[0].author}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="text-gray-200 font-semibold">{reviews[0].author}</p>
              {reviews[0].author_details?.rating && (
                <div className="flex items-center">
                  <div className="mr-2">{renderStars(reviews[0].author_details.rating)}</div>
                  <p className="text-gray-400 text-sm">({reviews[0].author_details.rating})</p>
                </div>
              )}
            </div>
          </div>
          <p className="text-gray-400">{reviews[0].content.substring(0, 150)}...</p>
          <button
            onClick={() => openReview(reviews[0])}
            className="text-blue-500 hover:text-blue-700 mt-2"
          >
            Read More
          </button>
        </div>
      ) : (
        <div>
          {seeAll ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <div key={review.id} className="p-4 bg-gray-800 rounded-md shadow-md">
                  <div className="flex items-center mb-2">
                    <Image
                      width={500}
                      height={500}
                      src={
                        review.author_details?.avatar_path
                          ? `https://www.themoviedb.org/t/p/w500${review.author_details.avatar_path}`
                          : '/images/avathar.png'
                      }
                      alt={review.author}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="text-gray-200 font-semibold">{review.author}</p>
                      {review.author_details?.rating && (
                        <div className="flex items-center">
                          <div className="mr-2">{renderStars(review.author_details.rating)}</div>
                          <p className="text-gray-400 text-sm">({review.author_details.rating})</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-400">{review.content.substring(0, 150)}...</p>
                  <button
                    onClick={() => openReview(review)}
                    className="text-blue-500 hover:text-blue-700 mt-2"
                  >
                    Read More
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <Slider {...settings} className="space-x-4">
              {reviews.map((review) => (
                <div key={review.id} className="p-4 bg-gray-800 rounded-md shadow-md w-full h-auto lg:h-48">
                  <div className="flex items-center mb-2">
                    <Image
                      width={500}
                      height={500}
                      src={
                        review.author_details?.avatar_path
                          ? `https://www.themoviedb.org/t/p/w500${review.author_details.avatar_path}`
                          : '/images/avathar.png'
                      }
                      alt={review.author}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="text-gray-200 font-semibold">{review.author}</p>
                      {review.author_details?.rating && (
                        <div className="flex items-center">
                          <div className="mr-2">{renderStars(review.author_details.rating)}</div>
                          <p className="text-gray-400 text-sm">({review.author_details.rating})</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-400">{review.content.substring(0, 150)}...</p>
                  <button
                    onClick={() => openReview(review)}
                    className="text-blue-500 hover:text-blue-700 mt-2"
                  >
                    Read More
                  </button>
                </div>
              ))}
            </Slider>
          )}
        </div>
      )}

      {activeReview && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-2">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full relative  h-3/4 overflow-y-auto">
            <button
              onClick={closeReview}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold text-gray-200 mb-4">{activeReview.author}</h3>
            <div className="scrollbar-custom w-full  h-5/6 overflow-y-auto p-4 bg-transparent rounded-lg">
              <p className="text-gray-300">{activeReview.content}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Reviews;
