import Image from 'next/image'
import Link from 'next/link'
import { MovieType } from '@/types/movie'
import { Play, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface MovieBannerProps {
  featuredMovies: MovieType[]
}

export default function MovieBanner({ featuredMovies }: MovieBannerProps) {
  const currentMovie = featuredMovies[0] 

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={currentMovie.poster}
          alt={currentMovie.title}
          fill
          priority
          className="object-cover"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-1/4 left-8 z-20 max-w-lg md:left-16">
        <h1 className="text-4xl font-bold md:text-6xl">{currentMovie.title}</h1>
        <p className="mt-4 line-clamp-3 text-lg text-gray-200">{currentMovie.plot}</p>
        <div className="mt-6 flex space-x-4">
          <Link href={`/movies/${currentMovie.id}`}>
            <Button className="flex items-center gap-2 bg-white text-black hover:bg-gray-200">
              <Play size={20} />
              Play Now
            </Button>
          </Link>
          <Button variant="outline" className="flex items-center gap-2">
            <Info size={20} />
            More Info
          </Button>
        </div>
      </div>
    </div>
  )
}
