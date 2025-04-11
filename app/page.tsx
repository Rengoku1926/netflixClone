// File: app/page.tsx
import MovieBanner from '@/components/MovieBanner';
import MovieCard from '@/components/MovieCard';
import MovieRow from '@/components/MovieRow';
import { ThemeProvider } from '@/components/theme-provider';
import { MovieType } from '@/types/movie';

async function getMovies() {
  const res = await fetch('https://www.freetestapi.com/api/v1/movies', { next: { revalidate: 3600 } });

  if (!res.ok) {
    throw new Error('Failed to fetch movies');
  }

  return res.json();
}

export default async function Home() {
  const movies: MovieType[] = await getMovies();

  // Get an array of 5 featured movies for the carousel
  const featuredMovies = movies.slice(0, 5);

  // Group movies by genre
  const genres = [...new Set(movies.flatMap(movie => movie.genre))];

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <main className="min-h-screen bg-black text-white">
        {/* Navbar */}
        <nav className="fixed top-0 z-50 w-full bg-gradient-to-b from-black to-transparent px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-red-600">NETFLIX</h1>
              <div className="hidden md:flex space-x-6">
                <a href="#" className="text-sm font-medium hover:text-gray-300">Home</a>
                <a href="#" className="text-sm font-medium hover:text-gray-300">TV Shows</a>
                <a href="#" className="text-sm font-medium hover:text-gray-300">Movies</a>
                <a href="#" className="text-sm font-medium hover:text-gray-300">New & Popular</a>
                <a href="#" className="text-sm font-medium hover:text-gray-300">My List</a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="hidden sm:block text-sm">Search</button>
              <div className="h-8 w-8 rounded-full bg-red-600"></div>
            </div>
          </div>
        </nav>

        {/* Featured Movie Carousel */}
        <MovieBanner featuredMovies={featuredMovies} />

        {/* Movie Rows by Genre */}
        <div className="mt-4 space-y-8 pb-16">
          {genres.map((genre) => {
            const genreMovies = movies.filter(movie => movie.genre.includes(genre));
            if (genreMovies.length > 0) {
              return <MovieRow key={genre} title={genre} movies={genreMovies} />;
            }
            return null;
          })}
          
          {/* Top Rated Movies */}
          <MovieRow 
            title="Top Rated" 
            movies={[...movies].sort((a, b) => b.rating - a.rating).slice(0, 10)} 
          />
        </div>
      </main>
    </ThemeProvider>
  );
}
