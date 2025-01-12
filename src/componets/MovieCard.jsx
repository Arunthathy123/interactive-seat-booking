import Link from 'next/link';

export default function MovieCard({ movie }) {
  console.log("movie-->", movie);
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const releaseDate = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString()
    : 'N/A';
  
  
  return (
    <Link href={`/movies/${movie.id}`}>
      <div className="gap-8 bg-[transparent] rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow">
        <img
          src={posterUrl}
          alt={movie.title}
          className="rounded-md h-96 w-full"
        />
        <div>
          <p className="text-sm text-gray-400 px-4 mt-6">Release Date: {releaseDate}</p>
          <h3 className="text-lg font-bold text-gray-200 py-2 px-4">{movie.title}</h3>
        </div>
      </div>
    </Link>
  );
}
