'use client';
import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

import '~/styles/login.css';
import '~/styles/pattern.css';

const ofertaMenu = [
  { name: 'Diplomados y Cursos', icon: '📚', slug: 'diplomados-cursos' },
  { name: 'Carreras técnicas', icon: '🛠️', slug: 'carreras-tecnicas' },
  { name: 'Tecnologías', icon: '💡', slug: 'tecnologias' },
  { name: 'Pregrados', icon: '🎓', slug: 'pregrados' },
  { name: 'Posgrados', icon: '🏅', slug: 'posgrados' },
  { name: 'Maestrías', icon: '📖', slug: 'maestrias' },
  { name: 'Doctorados', icon: '🧑‍🔬', slug: 'doctorados' },
];

export default function Header() {
  const [showOfertaMenu, setShowOfertaMenu] = useState(false);
  const ofertaMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        ofertaMenuRef.current &&
        !ofertaMenuRef.current.contains(event.target as Node)
      ) {
        setShowOfertaMenu(false);
      }
    }
    if (showOfertaMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showOfertaMenu]);

  return (
    <header className="pattern-header-bg sticky top-0 z-50 shadow">
      <nav className="container mx-auto flex min-h-[120px] items-center justify-between px-6 py-8">
        <div className="rounded-lg bg-blue-100 px-4 py-2 text-3xl font-extrabold tracking-wide text-blue-700 shadow-md">
          CCOET
        </div>
        <ul className="flex gap-6 font-medium text-gray-700">
          <li>
            <Link
              href="#"
              className="font-semibold underline-offset-4 transition hover:text-blue-700 hover:underline"
            >
              Inicio
            </Link>
          </li>
          <li className="relative">
            <div ref={ofertaMenuRef} className="inline-block">
              <button
                type="button"
                onClick={() => setShowOfertaMenu((prev) => !prev)}
                className="flex items-center border-none bg-transparent p-0 font-semibold underline-offset-4 transition hover:text-blue-700 hover:underline"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Oferta Educativa
                <span className="ml-2">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <rect
                      x="4"
                      y="7"
                      width="16"
                      height="2"
                      rx="1"
                      fill="#2563eb"
                    />
                    <rect
                      x="4"
                      y="11"
                      width="16"
                      height="2"
                      rx="1"
                      fill="#2563eb"
                    />
                    <rect
                      x="4"
                      y="15"
                      width="16"
                      height="2"
                      rx="1"
                      fill="#2563eb"
                    />
                  </svg>
                </span>
              </button>
              {showOfertaMenu && (
                <div className="absolute top-full left-0 z-50 mt-2 w-56 rounded-xl border border-blue-100 bg-white shadow-lg">
                  <ul className="py-2">
                    {ofertaMenu.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={`/oferta/${item.slug}`}
                          className="flex items-center px-4 py-2 font-semibold text-blue-900 transition hover:bg-blue-50 hover:text-blue-700"
                        >
                          <span className="mr-2 text-xl">{item.icon}</span>
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </li>
          <li>
            <Link
              href="/about"
              className="font-semibold underline-offset-4 transition hover:text-blue-700 hover:underline"
            >
              ¿ Quienes Somos ?
            </Link>
          </li>
          <li>
            <Link
              href="#estudiantes"
              className="font-semibold underline-offset-4 transition hover:text-blue-700 hover:underline"
            >
              Estudiantes
            </Link>
          </li>
          <li>
            <Link
              href="#sedes"
              className="font-semibold underline-offset-4 transition hover:text-blue-700 hover:underline"
            >
              Sedes
            </Link>
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
