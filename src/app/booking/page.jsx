import MovieCard from "@/componets/MovieCard";
import { fetchMovies } from "@/services/imdbApi";

export default async function BookingPage() {

    const movies = await fetchMovies();
    return (
        <div className="p-6 min-h-screen">
            <div>
               {movies.map((movie)=>(
                <MovieCard key={movie.id} movie={movie} />
               ))} 
            </div>
        </div>
    );
}


