'use client';
import Image from 'next/image';

export default function HeroCarousel() {
  return (
    <section
      className="relative bg-gradient-to-br from-blue-700 to-blue-400 py-24 text-white"
      id="hero"
    >
      <div className="container mx-auto flex flex-col items-center text-center">
        <h1 className="mb-4 text-4xl font-extrabold drop-shadow-lg md:text-6xl">
          Conviértete en el <br />
          Arquitecto del futuro
        </h1>
        <p className="mb-8 text-xl md:text-2xl">
          Programas tecnológicos innovadores
        </p>
        <div className="flex justify-center gap-4">
          <Image
            src="/ia-1-5.png"
            alt="ia 1 (5)"
            width={128}
            height={128}
            className="h-32 w-32 rounded-lg shadow-lg"
            priority
          />
          <Image
            src="/ia-1-6.png"
            alt="ia 1 (6)"
            width={128}
            height={128}
            className="h-32 w-32 rounded-lg shadow-lg"
            priority
          />
        </div>
      </div>
    </section>
  );
}
