
export default function MovieCard({ movie }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-white rounded-lg shadow-md p-4">
      <img src={movie.image} alt={movie.title} className="rounded-md" />
      <h3 className="text-lg font-bold mt-2">{movie.title}</h3>
    </div>
  );
}
