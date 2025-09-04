'use client';
import { useEffect, useRef, useState } from 'react';

import { motion, useAnimation } from 'framer-motion';

const noticias = [
  {
    titulo: 'La importancia de la educación continua',
    resumen:
      'Descubre cómo la formación permanente impulsa el crecimiento profesional y personal.',
    fecha: '2024-06-01',
    portada: '', // Aquí puedes poner la ruta de la imagen de portada en el futuro
  },
  {
    titulo: 'Innovación educativa: tendencias 2024',
    resumen:
      'Explora las nuevas tecnologías y metodologías que están transformando el aprendizaje.',
    fecha: '2024-05-20',
    portada: '',
  },
  {
    titulo: 'Educación virtual: ventajas y desafíos',
    resumen:
      'Analizamos los beneficios y retos de estudiar en plataformas digitales.',
    fecha: '2024-05-10',
    portada: '',
  },
];

export default function BlogSection() {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current || animated) return;
      const rect = ref.current.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        controls.start('visible');
        setAnimated(true);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls, animated]);

  return (
    <section className="bg-white py-16" id="blog">
      <div className="container mx-auto text-center">
        <h2 className="mb-2 text-5xl font-extrabold">Blog</h2>
        <h3 className="mb-8 text-xl font-semibold">Noticias y blogs</h3>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1.2, ease: 'easeOut' },
            },
          }}
          className="flex flex-wrap justify-center gap-10"
        >
          {noticias.map((noticia, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 40, boxShadow: 'none' },
                visible: {
                  opacity: 1,
                  y: 0,
                  boxShadow: '0 8px 32px 0 rgba(37,99,235,0.12)',
                  transition: {
                    duration: 0.8,
                    ease: 'easeOut',
                    delay: idx * 0.15,
                  },
                },
              }}
              className="flex w-full max-w-sm flex-col items-center overflow-hidden rounded-2xl border border-blue-100 bg-white p-0 shadow-lg transition-all"
              style={{ minHeight: 300 }}
            >
              {/* Espacio para imagen de portada */}
              <div className="flex h-48 w-full items-center justify-center bg-blue-50">
                {/* <img src={noticia.portada} alt="Portada" className="h-full w-full object-cover" /> */}
              </div>
              <div className="flex w-full flex-col items-center p-6">
                <button
                  className="mb-4 text-lg font-bold text-blue-900 hover:underline focus:underline"
                  // TODO: implementar navegación al detalle de la noticia
                  tabIndex={0}
                  aria-label={`Ver detalle de ${noticia.titulo}`}
                  type="button"
                >
                  {noticia.titulo}
                </button>
                <span className="mb-2 text-sm text-gray-400">
                  {noticia.fecha}
                </span>
                <p className="mb-4 text-gray-700">{noticia.resumen}</p>
                <button
                  className="mt-auto rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white transition hover:bg-blue-800"
                  // TODO: implementar navegación al detalle de la noticia
                  tabIndex={0}
                  aria-label={`Leer más sobre ${noticia.titulo}`}
                  type="button"
                >
                  Leer más
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
