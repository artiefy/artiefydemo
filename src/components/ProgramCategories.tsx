'use client';
import { useEffect, useRef } from 'react';

import Link from 'next/link';

import { motion, useAnimation } from 'framer-motion';

import PatternBg from '~/components/ui/PatternBg';

import type { Route } from 'next';

const categories = [
  {
    title: 'Diplomados y Cursos',
    description: 'Programas especializados para el desarrollo profesional',
    icon: '📚',
    color: 'from-blue-400/60 to-blue-600/60', // fondo azulado transparente
    programs: ['Administración', 'Marketing Digital', 'Recursos Humanos'],
    href: '/estudiantes#cursos-list-section', // Redirige a la zona de cursos lista
  },
  {
    title: 'Carreras técnicas',
    description: 'Formación técnica especializada para el mercado laboral',
    icon: '🛠️',
    color: 'from-cyan-400/60 to-blue-500/60', // fondo azulado transparente
    programs: ['Sistemas', 'Mecánica', 'Electrónica'],
    href: '/estudiantes#diplomados-section', // Redirige a la zona de programas
  },
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
            {categories.slice(0, 2).map((cat, _i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }} // amount más bajo para que aparezcan antes
                transition={{ duration: 0.4, ease: 'easeOut' }} // duración más corta
              >
                <Link
                  href={cat.href as Route}
                  className={`flex w-64 transform flex-col items-center justify-center rounded-xl p-5 shadow-lg transition-all duration-300 hover:scale-105 ${cat.color} text-blue-900 hover:text-blue-800`}
                >
                  <div
                    className={`relative flex flex-col items-center rounded-2xl bg-blue-100/70 p-8 shadow-lg backdrop-blur-md transition-transform duration-300 hover:scale-105 ${cat.color}`}
                  >
                    <span className="mb-2 text-4xl">{cat.icon}</span>
                    <span className="text-lg font-bold">{cat.title}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
