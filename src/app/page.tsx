'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useUser } from '@clerk/nextjs';

import Footer from '../components/Footer';
import Header from '../components/Header1';
import HeroCarousel from '../components/HeroCarousel';
import ProgramCategories from '../components/ProgramCategories';
import QuienesSomosSection from '../components/QuienesSomosSection';
import Stats from '../components/Stats';
import StudentZone from '../components/StudentZone';

export default function Home() {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (user && user.publicMetadata?.role !== 'super-admin') {
      if (user.publicMetadata?.role === 'admin') {
        router.replace('/dashboard/admin');
      } else if (user.publicMetadata?.role === 'educador') {
        router.replace('/dashboard/educadores');
      } else if (user.publicMetadata?.role === 'estudiante') {
        router.replace('/estudiantes');
      } else {
        router.replace('/');
      }
    }
  }, [user, router]);

  return (
    <>
      <Header />
      <HeroCarousel />
      <ProgramCategories />
      <Stats />
      <QuienesSomosSection />
      <StudentZone />
      <Footer />
    </>
  );
}
