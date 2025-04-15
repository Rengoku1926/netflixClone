import Image from 'next/image'
import Link from 'next/link'
import { MovieType } from '@/types/movie'

export default function MovieCard({ movie }: { movie: MovieType }) {
  return (
    <Link
      href={`/movies/${movie.id}`}
      className="relative flex-shrink-0 transition-transform duration-300 ease-out hover:scale-110 hover:z-10 group"
      style={{ width: '240px' }}
    >
      <div className="aspect-[2/3] overflow-hidden rounded-md bg-gray-800">
        <Image
          src={movie.poster}
          alt={movie.title}
          width={240}
          height={360}
          className="object-cover h-full w-full"
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gray-900 p-2 rounded-b-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="font-medium truncate">{movie.title}</h3>
        <div className="flex items-center justify-between text-xs text-gray-300">
          <span>{movie.year}</span>
          <span className="flex items-center">⭐ {movie.rating.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  )
}
