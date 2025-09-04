'use client';
import Link from 'next/link';

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <nav className="container mx-auto flex min-h-[70px] items-center justify-between px-6 py-2">
        <div className="rounded-lg bg-blue-100 px-4 py-2 text-3xl font-extrabold tracking-wide text-blue-700 shadow-md">
          CCOET
        </div>
        <ul className="flex gap-6 font-medium text-gray-700">
          <li>
            <Link href="#">Inicio</Link>
          </li>
          <li>
            <Link href="#oferta">Oferta Educativa</Link>
          </li>
          <li>
            <Link href="/about">¿ Quienes Somos ?</Link>
          </li>
          <li>
            <Link href="#estudiantes">Estudiantes</Link>
          </li>
          <li>
            <Link href="#sedes">Sedes</Link>
          </li>
        </ul>
        <div className="ml-4 flex items-center">
          <SignedIn>
            <UserButton showName />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">Iniciar sesión</SignInButton>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
}
