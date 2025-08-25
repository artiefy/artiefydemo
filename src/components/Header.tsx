'use client';
import Link from 'next/link';

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="text-xl font-bold text-blue-700">Ciadet</div>
        <ul className="flex gap-6 font-medium text-gray-700">
          <li>
            <Link href="#">Inicio</Link>
          </li>
          <li>
            <Link href="#oferta">Oferta Educativa</Link>
          </li>
          <li>
            <Link href="#quienes-somos">¿ Quienes Somos ?</Link>
          </li>
          <li>
            <Link href="#estudiantes">Estudiantes</Link>
          </li>
          <li>
            <Link href="#sedes">Sedes</Link>
          </li>
        </ul>
        <div>
          <SignedIn>
            <UserButton
              userProfileMode="navigation"
              userProfileUrl="/user"
              signInUrl="/sign-in"
            />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal" />
          </SignedOut>
        </div>
      </nav>
    </header>
  );
}
