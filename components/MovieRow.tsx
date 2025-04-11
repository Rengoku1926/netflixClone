import { MovieType } from '@/types/movie';
import MovieCard from './MovieCard';

export default function MovieRow({ title, movies }: { title: string; movies: MovieType[] }) {
  return (
    <div className="pl-4 md:pl-8 space-y-2">
      <h2 className="text-xl font-semibold md:text-2xl">{title}</h2>
      <div className="flex space-x-4 overflow-x-scroll scrollbar-hide pb-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
