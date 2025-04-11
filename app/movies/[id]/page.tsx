// File: app/movies/[id]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MovieType } from "@/types/movie";
import { Play, ArrowLeft, Star } from "lucide-react";
import { ThemeProvider } from "@/components/theme-provider";
import { notFound } from "next/navigation";

async function getMovie(id: string) {
  try {
    // First try to fetch all movies
    const res = await fetch("https://www.freetestapi.com/api/v1/movies", {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch movies");
    }

    const movies: MovieType[] = await res.json();

    // Find the specific movie by ID
    const movie = movies.find((m) => m.id.toString() === id);

    if (!movie) {
      return null;
    }

    return movie;
  } catch (error) {
    console.error("Error fetching movie:", error);
    return null;
  }
}

export default async function MovieDetails({ params }: { params: any }) {
  const movie = await getMovie(params.id);

  if (!movie) {
    notFound();
  }
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-black text-white">
        {/* Back Button */}
        <div className="absolute top-6 left-6 z-20">
          <Link href="/">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft size={20} />
              Back
            </Button>
          </Link>
        </div>

        {/* Movie Backdrop */}
        <div className="relative h-screen w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />

          <div className="relative h-full w-full">
            <Image
              src={movie.poster}
              alt={movie.title}
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="absolute bottom-24 left-8 z-20 max-w-3xl md:left-16">
            <h1 className="text-4xl font-bold md:text-6xl">{movie.title}</h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-300">
              <div className="flex items-center">
                <Star className="mr-1 h-4 w-4 text-yellow-500" />
                <span>{movie.rating}/10</span>
              </div>
              <span>{movie.year}</span>
              <span>{movie.runtime} min</span>
              <span>{movie.language}</span>
            </div>

            <div className="mt-6 flex space-x-4">
              <Button className="flex items-center gap-2 bg-white text-black hover:bg-gray-200">
                <Play size={20} />
                Play
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                Add to My List
              </Button>
            </div>

            <p className="mt-6 text-lg leading-relaxed">{movie.plot}</p>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <h3 className="font-medium text-gray-400">Director</h3>
                <p className="mt-1">{movie.director}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-400">Cast</h3>
                <p className="mt-1">{movie.actors.join(", ")}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-400">Genres</h3>
                <p className="mt-1">{movie.genre.join(", ")}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-400">Awards</h3>
                <p className="mt-1">{movie.awards}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-400">Box Office</h3>
                <p className="mt-1">{movie.boxOffice}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-400">Production</h3>
                <p className="mt-1">{movie.production}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
