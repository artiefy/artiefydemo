'use client';

import { useEffect, useState } from 'react';

import { Header } from '~/components/estudiantes/layout/Header';
import FooterPrograms from '~/components/FooterPrograms';
import ProgramsList from '~/components/Programasfull/ProgramsList';

import type { Program } from '~/types';

export default function ProgramasPage() {
  // tipar explícitamente para evitar inferencia a never[]
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/super-admin/programs');
        if (!res.ok) throw new Error('Error fetching programs');
        const data = await res.json();
        if (mounted) setPrograms(Array.isArray(data) ? data : []);
      } catch {
        if (mounted) setPrograms([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <header className="mb-8">
          <h1 className="text-3xl font-bold" style={{ color: '#01142B' }}>
            Programas
          </h1>
          <p className="mt-2" style={{ color: '#01142B' }}>
            Explora todos los programas disponibles.
          </p>
        </header>
        <ProgramsList programs={programs} loading={loading} />
      </main>
      <FooterPrograms />
    </>
  );
}
