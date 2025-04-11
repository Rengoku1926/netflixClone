// File: components/MovieBanner.tsx
"use client"

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Play, Info, ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { MovieType } from '@/types/movie';
import { Button } from '@/components/ui/button';

interface MovieBannerProps {
  featuredMovies: MovieType[];
}

export default function MovieBanner({ featuredMovies }: MovieBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Holds the direction of the current slide animation ("next" or "prev")
  const [animationDirection, setAnimationDirection] = useState<'next' | 'prev' | null>(null);
  const router = useRouter();

  const currentMovie = featuredMovies[currentIndex];

  const handlePrev = () => {
    setAnimationDirection('prev');
    setCurrentIndex((prev) => (prev === 0 ? featuredMovies.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setAnimationDirection('next');
    setCurrentIndex((prev) => (prev === featuredMovies.length - 1 ? 0 : prev + 1));
  };

  // Reset animation direction after the animation completes (0.5s)
  useEffect(() => {
    if (animationDirection) {
      const timer = setTimeout(() => {
        setAnimationDirection(null);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [animationDirection, currentIndex]);

  const handlePlay = () => {
    router.push(`/movies/${currentMovie.id}`);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image with sliding animation */}
      <div className="absolute inset-0">
        {/* The image container has a key based on currentMovie.id so that it re-renders on change */}
        <div
          key={currentMovie.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out
            ${animationDirection === 'next' ? 'animate-slide-next' : ''}
            ${animationDirection === 'prev' ? 'animate-slide-prev' : ''}`}
        >
          <Image 
            src={currentMovie.poster}
            alt={currentMovie.title}
            fill
            priority
            className="object-cover"
          />
        </div>
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-1/4 left-8 z-20 max-w-lg md:left-16">
        <h1 className="text-4xl font-bold md:text-6xl">{currentMovie.title}</h1>
        <p className="mt-4 line-clamp-3 text-lg text-gray-200">{currentMovie.plot}</p>
        <div className="mt-6 flex space-x-4">
          <Button 
            onClick={handlePlay} 
            className="flex items-center gap-2 bg-white text-black hover:bg-gray-200"
          >
            <Play size={20} />
            Play Now
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Info size={20} />
            More Info
          </Button>
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="absolute inset-y-0 left-0 flex items-center z-30">
        <button onClick={handlePrev} className="p-4 text-white focus:outline-none">
          <ArrowLeft size={30} />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center z-30">
        <button onClick={handleNext} className="p-4 text-white focus:outline-none">
          <ArrowRight size={30} />
        </button>
      </div>
    </div>
  );
}
