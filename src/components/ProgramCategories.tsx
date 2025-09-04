'use client';
import { useEffect, useRef } from 'react';

import Link from 'next/link';

import { motion, useAnimation } from 'framer-motion';

import PatternBg from '~/components/ui/PatternBg';

import type { Route } from 'next';

const categories = [
  {
    name: 'Diplomados y Cursos',
    slug: 'diplomados-cursos',
    color: 'bg-blue-100',
    icon: '📚',
  },
  {
    name: 'Carreras técnicas',
    slug: 'carreras-tecnicas',
    color: 'bg-green-100',
    icon: '🛠️',
  },
  {
    name: 'Tecnologías',
    slug: 'tecnologias',
    color: 'bg-yellow-100',
    icon: '💡',
  },
  { name: 'Pregrados', slug: 'pregrados', color: 'bg-purple-100', icon: '🎓' },
  { name: 'Posgrados', slug: 'posgrados', color: 'bg-pink-100', icon: '🏅' },
  { name: 'Maestrías', slug: 'maestrias', color: 'bg-indigo-100', icon: '📖' },
  { name: 'Doctorados', slug: 'doctorados', color: 'bg-red-100', icon: '🧑‍🔬' },
];

export default function ProgramCategories() {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        controls.start('visible');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

  return (
    <section className="relative py-10 text-white" id="oferta">
      <PatternBg />
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, scale: 0.85 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.7, ease: 'easeOut' },
          },
        }}
        className="relative container mx-auto max-w-[1600px] px-4 text-center md:px-8 lg:px-16 xl:px-32 2xl:px-48"
      >
        <h2 className="mb-6 text-4xl font-extrabold drop-shadow-lg">
          Oferta Académica
        </h2>
        <p className="mx-auto mb-8 max-w-[1000px] text-lg text-blue-100 lg:max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1600px]">
          En CCOET ofrecemos diplomados, cursos, carreras técnicas laborales y
          alianzas educativas para que puedas homologar y avanzar en tus
          estudios profesionales, desde pregrados hasta postgrados. Descubre
          nuestra amplia oferta académica y elige el camino que impulse tu
          futuro.
        </p>
        <div className="flex w-full flex-col items-center gap-8">
          <div className="flex w-full flex-wrap justify-center gap-10 md:gap-14 lg:gap-16 xl:gap-20 2xl:gap-24">
            {categories.slice(0, 3).map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={controls}
                variants={{
                  hidden: { opacity: 0, scale: 0.7 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: {
                      duration: 0.7,
                      ease: 'easeOut',
                      delay: Math.random() * 0.6 + i * 0.1,
                    },
                  },
                }}
              >
                <Link
                  href={`/oferta/${cat.slug}` as Route}
                  className={`flex w-64 transform flex-col items-center justify-center rounded-xl p-5 shadow-lg transition-all duration-300 hover:scale-105 ${cat.color} text-blue-900 hover:text-blue-800`}
                >
                  <span className="mb-2 text-4xl">{cat.icon}</span>
                  <span className="text-lg font-bold">{cat.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="flex w-full flex-wrap justify-center gap-10 md:gap-14 lg:gap-16 xl:gap-20 2xl:gap-24">
            {categories.slice(3, 6).map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={controls}
                variants={{
                  hidden: { opacity: 0, scale: 0.7 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: {
                      duration: 0.7,
                      ease: 'easeOut',
                      delay: Math.random() * 0.6 + i * 0.1,
                    },
                  },
                }}
              >
                <Link
                  href={`/oferta/${cat.slug}` as Route}
                  className={`flex w-64 transform flex-col items-center justify-center rounded-xl p-5 shadow-lg transition-all duration-300 hover:scale-105 ${cat.color} text-blue-900 hover:text-blue-800`}
                >
                  <span className="mb-2 text-4xl">{cat.icon}</span>
                  <span className="text-lg font-bold">{cat.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="flex w-full justify-center gap-10 md:gap-14 lg:gap-16 xl:gap-20 2xl:gap-24">
            {categories[6] && (
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={controls}
                variants={{
                  hidden: { opacity: 0, scale: 0.7 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: {
                      duration: 0.7,
                      ease: 'easeOut',
                      delay: Math.random() * 0.6 + 0.3,
                    },
                  },
                }}
              >
                <Link
                  href={`/oferta/${categories[6].slug}` as Route}
                  className={`flex w-64 transform flex-col items-center justify-center rounded-xl p-5 shadow-lg transition-all duration-300 hover:scale-105 ${categories[6].color ?? ''} text-blue-900 hover:text-blue-800`}
                >
                  <span className="mb-2 text-4xl">
                    {categories[6].icon ?? ''}
                  </span>
                  <span className="text-lg font-bold">
                    {categories[6].name ?? ''}
                  </span>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
