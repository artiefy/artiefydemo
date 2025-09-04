'use client';
import Link from 'next/link';

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

import '~/styles/login.css';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <nav className="container mx-auto flex min-h-[120px] items-center justify-between px-6 py-8">
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
            <SignInButton mode="modal">
              <div
                aria-label="User Login Button"
                tabIndex={0}
                role="button"
                className="user-profile"
              >
                <div className="user-profile-inner">
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g data-name="Layer 2" id="Layer_2">
                      <path d="m15.626 11.769a6 6 0 1 0 -7.252 0 9.008 9.008 0 0 0 -5.374 8.231 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 9.008 9.008 0 0 0 -5.374-8.231zm-7.626-4.769a4 4 0 1 1 4 4 4 4 0 0 1 -4-4zm10 14h-12a1 1 0 0 1 -1-1 7 7 0 0 1 14 0 1 1 0 0 1 -1 1z" />
                    </g>
                  </svg>
                  <p>Iniciar sesión</p>
                </div>
              </div>
            </SignInButton>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
}
