import { MovieType } from "@/types/movie";
import MovieCard from "./MovieCard";

interface MovieSearchProps {
  movies: MovieType[];
  query: string;
}

export default function MovieSearch({ movies, query }: MovieSearchProps) {
    
  // Filter movies based on the query string (case-insensitive)
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="mt-8 px-4">
      <h2 className="text-2xl font-bold mb-4">
        Search Results for &ldquo;{query}&rdquo;
      </h2>
      {filteredMovies.length === 0 ? (
        <p>No movies found matching your search.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
}
