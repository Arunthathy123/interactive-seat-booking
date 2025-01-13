
"use client";
import { useParams } from 'next/navigation';
import Cast from './Cast';
import Trailer from './Trailer';
import Reviews from './Reviews';
import Recommendations from './Recommendations';

const MovieAllDetails = () => {
  const { id } = useParams();

 

  return (
    <div className="relative">
      <Cast movieId={id} />
      <Trailer movieId={id} />
      <Reviews movieId={id} />
      <Recommendations movieId={id} />
    </div>
  );
};

export default MovieAllDetails;
