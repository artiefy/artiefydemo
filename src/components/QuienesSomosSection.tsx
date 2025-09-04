'use client';
import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { motion, useAnimation } from 'framer-motion';

export default function QuienesSomosSection() {
  const controlsLeft = useAnimation();
  const controlsRight = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current || animated) return;
      const rect = ref.current.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        controlsLeft.start('visible');
        controlsRight.start('visible');
        setAnimated(true);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controlsLeft, controlsRight, animated]);

  return (
    <section className="bg-white py-16" id="quienes-somos">
      <div
        ref={ref}
        className="container mx-auto flex flex-col items-center gap-10 md:flex-row md:gap-16"
      >
        <motion.div
          initial="hidden"
          animate={controlsLeft}
          variants={{
            hidden: { opacity: 0, x: -120 },
            visible: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.8, ease: 'easeOut' },
            },
          }}
          className="flex w-full flex-shrink-0 justify-center md:w-1/3"
        >
          <div className="rounded-xl bg-white p-0 shadow-[0_0_32px_0_rgba(0,0,0,0.45)]">
            <Image
              src="/quienessomos.jpg"
              alt="¿Quiénes Somos? Cover"
              width={320}
              height={480}
              className="h-[480px] w-auto rounded-xl object-cover"
              priority
            />
          </div>
        </motion.div>
        <motion.div
          initial="hidden"
          animate={controlsRight}
          variants={{
            hidden: { opacity: 0, x: 120 },
            visible: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.8, ease: 'easeOut' },
            },
          }}
          className="flex w-full flex-col items-center justify-center text-center md:w-2/3 md:items-start md:text-left"
        >
          <h2 className="mb-4 text-3xl font-bold text-blue-900">
            ¿Quiénes Somos?
          </h2>
          <p className="mb-6 text-lg text-gray-700">
            En Ciadet, impulsamos el desarrollo tecnológico y la investigación
            aplicada para transformar la educación y la sociedad. Nuestro equipo
            multidisciplinario trabaja en la creación de soluciones innovadoras
            en ciencia, tecnología, software y biomédica, con un enfoque en la
            inteligencia artificial y el impacto social. Creemos en el poder de
            la colaboración y la creatividad para convertir ideas en proyectos
            que generan valor y progreso.
          </p>
          <Link
            href="/about"
            className="inline-block rounded-lg bg-blue-700 px-6 py-2 font-semibold text-white transition hover:bg-blue-800"
          >
            Ver más
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
