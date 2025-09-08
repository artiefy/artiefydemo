'use client';
import { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import { SignedIn, SignedOut, SignInButton, useAuth } from '@clerk/nextjs';
import { motion, useAnimation } from 'framer-motion';

export default function StudentZone() {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);
  const router = useRouter();
  const { isSignedIn } = useAuth();

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

  const handleIngresarClick = () => {
    if (isSignedIn) {
      router.push('/estudiantes');
    }
    // Si no está signed in, el SignInButton manejará el modal automáticamente
  };

  return (
    <section
      className="relative bg-blue-50"
      style={{ minHeight: '400px', height: '400px' }}
      id="estudiantes"
    >
      {/* Video de fondo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 z-0 h-[400px] w-full object-cover opacity-40"
        style={{ minHeight: '400px', height: '400px' }}
      >
        <source src="/escribiendo.mp4" type="video/mp4" />
        Tu navegador no soporta el video.
      </video>
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
        className="relative z-10 flex h-[400px] min-h-[400px] w-full items-center justify-center"
      >
        <div className="flex w-full flex-col items-center justify-center text-center">
          <h2 className="mb-2 text-5xl font-extrabold">
            <span className="text-black">ZONA</span>{' '}
            <span className="text-blue-700">ESTUDIANTES</span>
          </h2>
          <p className="mx-auto mb-6 max-w-4xl text-lg text-black">
            Accede a nuestra plataforma educativa virtual para consultar tus
            programas, materiales y grabaciones de clase. En CCOET, apostamos
            por la tecnología para potenciar tu aprendizaje y experiencia
            académica.
          </p>

          {/* Mostrar diferentes botones según el estado de autenticación */}
          <SignedOut>
            <SignInButton mode="modal">
              <span className="inline-block cursor-pointer rounded-lg bg-blue-700 px-6 py-2 font-semibold text-white transition hover:bg-blue-800">
                Ingresar
              </span>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <button
              onClick={handleIngresarClick}
              className="inline-block cursor-pointer rounded-lg bg-blue-700 px-6 py-2 font-semibold text-white transition hover:bg-blue-800"
            >
              Ir a Cursos
            </button>
          </SignedIn>
        </div>
      </motion.div>
    </section>
  );
}
