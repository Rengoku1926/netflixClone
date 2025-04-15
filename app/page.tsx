import MovieBanner from '@/components/MovieBanner';
import MovieRow from '@/components/MovieRow';
import MovieSearch from '@/components/MovieSearch';
import { ThemeProvider } from '@/components/theme-provider';
import { MovieType } from '@/types/movie';
import {movies as allMovies} from '@/data/data'

// async function getMovies() {
//   const res = await fetch('https://www.freetestapi.com/api/v1/movies', {
//     next: { revalidate: 3600 },
//   });
//   if (!res.ok) {
//     throw new Error('Failed to fetch movies');
//   }
//   return res.json();
// }

export default async function Home({
  searchParams,
}: {
  searchParams: any; // searchParams might be a promise or a plain object
}) {
  const movies: MovieType[] = allMovies;
  const featuredMovies = movies.slice(0, 5);
  const genres = [...new Set(movies.flatMap(movie => movie.genre))];

  const resolvedSearchParams = await Promise.resolve(searchParams);

  const query =
    typeof resolvedSearchParams.get === 'function'
      ? resolvedSearchParams.get('q') || ''
      : resolvedSearchParams.q || '';

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
                <a href="/" className="text-sm font-medium hover:text-gray-300">
                  Home
                </a>
                <a href="/tv-shows" className="text-sm font-medium hover:text-gray-300">
                  TV Shows
                </a>
                <a href="/movies" className="text-sm font-medium hover:text-gray-300">
                  Movies
                </a>
                <a href="/new-popular" className="text-sm font-medium hover:text-gray-300">
                  New &amp; Popular
                </a>
                <a href="/my-list" className="text-sm font-medium hover:text-gray-300">
                  My List
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Search Form */}
              <form method="get" action="/" className="flex">
                <input
                  type="text"
                  name="q"
                  defaultValue={query}
                  placeholder="Search movies..."
                  className="text-sm px-2 py-1 rounded bg-gray-800 text-white"
                />
                <button
                  type="submit"
                  className="ml-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500"
                >
                  Search
                </button>
              </form>
              <div className="h-8 w-8 rounded-full bg-red-600"></div>
            </div>
          </div>
        </nav>

        {/* Featured Movie Carousel */}
        <MovieBanner featuredMovies={featuredMovies} />

        {/* Render Search Results if query exists */}
        {query && <MovieSearch movies={movies} query={query} />}

        {/* Movie Rows by Genre */}
        <section className="mt-4 space-y-8 pb-16 px-4">
          {genres.map((genre) => {
            const genreMovies = movies.filter(movie => movie.genre.includes(genre));
            return genreMovies.length > 0 ? (
              <MovieRow key={genre} title={genre} movies={genreMovies} />
            ) : null;
          })}

          {/* Top Rated Movies */}
          <MovieRow
            title="Top Rated"
            movies={[...movies].sort((a, b) => b.rating - a.rating).slice(0, 10)}
          />
        </section>
      </main>
    </ThemeProvider>
  );
}
