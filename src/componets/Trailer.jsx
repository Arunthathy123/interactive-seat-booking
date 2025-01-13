import { useEffect, useState } from 'react';

const Trailer = ({ movieId }) => {
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        );
        const data = await response.json();
        const officialTrailer = data.results.find(
          (video) => video.type === 'Trailer' && video.site === 'YouTube'
        );
        setTrailer(officialTrailer);
      } catch (error) {
        console.error('Error fetching trailer:', error);
      }
    };

    fetchTrailer();
  }, [movieId]);

  if (!trailer) return null;

  return (
    <div className="px-4 lg:px-10 py-8">
      <h2 className="text-2xl font-bold mb-2 text-gray-200">Trailer</h2>
      <hr className="mb-10" />
      <iframe
        width="100%"
        height="500"
        src={`https://www.youtube.com/embed/${trailer.key}`}
        title={trailer.name}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default Trailer;
