'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { SignedIn, SignedOut, SignInButton, useAuth } from '@clerk/nextjs';
import { Dialog, DialogPanel } from '@headlessui/react';
import { XMarkIcon as XMarkIconSolid } from '@heroicons/react/24/solid';

import { Icons } from '~/components/estudiantes/ui/icons';

import { UserButtonWrapper } from '../auth/UserButtonWrapper';

import { NotificationHeader } from './NotificationHeader';

import '~/styles/barsicon.css';
import '~/styles/searchBar.css';
import '~/styles/headerSearchBar.css';
import '~/styles/headerMenu.css';
import '~/styles/login.css';


export function Header({
  onEspaciosClickAction,
}: {
  onEspaciosClickAction?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams(); // <-- existing (kept)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  // New state to track if activity modal is open
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  // New state to track scroll direction
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  // MODAL DISPONIBLE MUY PRONTO
  // Solo para Espacios
  const [showEspaciosModal, setShowEspaciosModal] = useState(false);
  // submenu de Oferta Educativa (copiado de Header1)
  const [showOfertaMenu, setShowOfertaMenu] = useState(false);

  const { isLoaded: isAuthLoaded } = useAuth();
  // Nav items adjusted to match Header1 order and labels
  const navItems = [
    { href: '/', label: 'Inicio' },
    { href: '#', label: 'Oferta Educativa' }, // handled via ofertaMenu
    { href: '/about', label: '¿ Quienes Somos ?' },
    { href: '/estudiantes', label: 'Estudiantes' },
    { href: '#sedes', label: 'Sedes' },
  ];

  const ofertaMenu = [
    {
      name: 'Diplomados y Cursos',
      slug: 'diplomados',
      icon: '📚',
      href: '/estudiantes#cursos-list-section',
    },
    {
      name: 'Carreras técnicas',
      slug: 'carreras-tecnicas',
      icon: '🛠️',
      href: '/programs',
    },
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Listen for activity modal open/close events
  useEffect(() => {
    const handleModalOpen = () => {
      setIsActivityModalOpen(true);
    };

    const handleModalClose = () => {
      setIsActivityModalOpen(false);
    };

    const handleHideHeaderTemporarily = () => {
      setIsHeaderVisible(false);
      setTimeout(() => {
        setIsHeaderVisible(true);
      }, 1200);
    };

    window.addEventListener('activity-modal-open', handleModalOpen);
    window.addEventListener('activity-modal-close', handleModalClose);
    window.addEventListener(
      'hide-header-temporarily',
      handleHideHeaderTemporarily
    );

    return () => {
      window.removeEventListener('activity-modal-open', handleModalOpen);
      window.removeEventListener('activity-modal-close', handleModalClose);
      window.removeEventListener(
        'hide-header-temporarily',
        handleHideHeaderTemporarily
      );
    };
  }, []);

  // Enhanced scroll handling for direction detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine scroll direction
      const isDown = currentScrollY > lastScrollY;

      // Show header if scrolling down, hide if scrolling up
      if (currentScrollY > 100) {
        setIsHeaderVisible(isDown);
      } else {
        setIsHeaderVisible(true); // Always show header at the top of the page
      }

      // Update last scroll position
      setLastScrollY(currentScrollY);

      // Original scroll behavior for visual changes
      setIsScrolled(currentScrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.header-menu')) {
        setIsDropdownOpen(false);
      }
      // cerrar Oferta Educativa si se hace click fuera
      if (!target.closest('.oferta-menu')) {
        setShowOfertaMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = useCallback(() => {
    const params = new URLSearchParams();
    if (searchQuery) {
      params.set('query', searchQuery);
    }
    router.push(`${pathname}?${params.toString()}`);
    setTimeout(() => {
      const resultsSection = document.getElementById('courses-list-section');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  }, [searchQuery, pathname, router]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const renderAuthButton = () => {
    if (!mounted) {
      return (
        <div className="flex w-[180px] items-center justify-start">
          <Icons.spinner className="text-primary h-5 w-5" />
        </div>
      );
    }

    return (
      <div className="flex min-w-[180px] items-center justify-end">
        {!isAuthLoaded ? (
          <div className="flex min-w-[180px] items-center justify-start">
            <Icons.spinner className="text-primary h-5 w-5" />
          </div>
        ) : (
          <>
            <SignedOut>
              {/* Usar mismo markup / estilos que Header1 para mantener apariencia */}
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

            <SignedIn>
              <div className="flex items-center gap-2">
                <div className="perfil-header">
                  <Suspense
                    fallback={
                      <div className="flex min-w-[180px] items-center justify-start">
                        <Icons.spinner className="text-primary ml-2 h-5 w-5" />
                      </div>
                    }
                  >
                    <UserButtonWrapper />
                  </Suspense>
                </div>
                <div className="campana-header relative">
                  <NotificationHeader /> {/* Remove count prop */}
                </div>
              </div>
            </SignedIn>
          </>
        )}
      </div>
    );
  };

  // Funciones para interceptar clicks y mostrar el modal
  // Proyectos: acceso directo, sin modal
  // const handleProyectosClick = (e?: React.MouseEvent) => {
  //   e?.preventDefault();
  //   setShowProyectosModal(true);
  //   onProyectosClickAction?.();
  // };
  // prefix with _ to silence eslint
  const _handleEspaciosClick = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setShowEspaciosModal(true);
    onEspaciosClickAction?.();
  };

  // Sincroniza el input con el parámetro query de la URL
  useEffect(() => {
    const q = searchParams?.get('query') ?? '';
    setSearchQuery(q);
  }, [searchParams]);

  // Helper para scroll a la sección de cursos
  const handleDiplomadosClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowOfertaMenu(false);
    if (window.location.pathname === '/estudiantes') {
      setTimeout(() => {
        const el = document.getElementById('courses-list-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      window.location.href = '/estudiantes#courses-list-section';
    }
  };

  const handleCarrerasClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowOfertaMenu(false);
    window.location.href = '/programs';
  };

  return (
    <>
      {/* Modal "Disponible muy pronto" solo para Espacios */}
      <Dialog
        open={showEspaciosModal}
        onClose={() => setShowEspaciosModal(false)}
        className="fixed inset-0 z-[100] flex items-center justify-center"
      >
        <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
        <DialogPanel className="relative mx-auto flex w-full max-w-md flex-col items-center rounded-2xl bg-white p-8 shadow-2xl">
          <span className="from-primary mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr to-blue-400 shadow-lg">
            <svg
              className="h-10 w-10 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
              />
            </svg>
          </span>
          <h2 className="text-secondary mb-2 text-center text-2xl font-bold">
            ¡Disponible muy pronto!
          </h2>
          <p className="mb-4 text-center text-gray-600">
            La sección de{' '}
            <span className="text-secondary font-semibold">Espacios</span>{' '}
            estará habilitada próximamente.
            <br />
            ¡Gracias por tu interés!
          </p>
          <button
            className="bg-secondary mt-2 rounded px-6 py-2 font-semibold text-white shadow transition hover:bg-blue-700"
            onClick={() => setShowEspaciosModal(false)}
          >
            Cerrar
          </button>
        </DialogPanel>
      </Dialog>
      <header
        className={`sticky top-0 w-full transition-transform duration-300 ${
          !isHeaderVisible ? '-translate-y-full' : 'translate-y-0'
        } div-header-nav bg-white shadow ${
          isActivityModalOpen ? 'z-40' : 'z-[9999]'
        }`}
      >
        {/* Use same container / spacing as Header1 (min height, padding) */}
        <div className="container mx-auto flex min-h-[120px] items-center justify-between px-6 py-8">
          <div className="hidden w-full items-center md:flex md:justify-between">
            {!isScrolled ? (
              <div className="flex w-full items-center justify-between">
                <div className="shrink-0">
                  <Link href="/estudiantes">
                    {/* título / logo con estilo Header1 */}
                    <div className="flex items-center rounded-lg bg-blue-100 px-6 py-3 shadow-lg">
                      <span
                        className="font-serif text-5xl font-extrabold tracking-wide text-blue-700 drop-shadow-lg md:text-6xl lg:text-7xl"
                        style={{
                          letterSpacing: '0.04em',
                          textShadow:
                            '0 2px 16px rgba(37,99,235,0.18), 0 1px 0 #fff',
                        }}
                      >
                        CCOET
                      </span>
                    </div>
                  </Link>
                </div>
                {/* usar spacing y look de Header1; add extra margin-left to separate logo from labels */}
                <div className="div-header-nav ml-8 flex items-center gap-6">
                  {navItems.map((item) => {
                    // Oferta Educativa
                    if (item.label === 'Oferta Educativa') {
                      return (
                        <div
                          key="oferta"
                          className="oferta-menu relative inline-block"
                        >
                          <button
                            type="button"
                            onClick={() => setShowOfertaMenu((s) => !s)}
                            className={`flex items-center border-none bg-transparent p-0 text-lg font-bold ${
                              isScrolled ? 'text-primary' : 'text-black'
                            } underline-offset-4 transition hover:text-blue-700 hover:underline focus:text-blue-700 focus:underline`}
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                            }}
                          >
                            Oferta Educativa
                            <span className="ml-2">
                              <svg
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
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
                                {ofertaMenu.map((m) => (
                                  <li key={m.slug}>
                                    <Link
                                      href={m.href}
                                      className="flex items-center px-4 py-2 font-semibold text-blue-900 transition hover:bg-blue-50 hover:text-blue-700"
                                    >
                                      <span className="mr-2 text-xl">
                                        {m.icon}
                                      </span>
                                      <span>{m.name}</span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      );
                    }
                    // Estudiantes: subrayado azul si activo
                    if (item.label === 'Estudiantes') {
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`text-lg font-bold underline-offset-4 transition-colors ${
                            isScrolled ? 'text-primary' : 'text-black'
                          } ${
                            pathname === '/estudiantes'
                              ? 'text-blue-700 underline'
                              : 'hover:text-blue-700 hover:underline focus:text-blue-700 focus:underline'
                          }`}
                        >
                          {item.label}
                        </Link>
                      );
                    }
                    // Otros labels: negros, hover azul, subrayado azul si activo
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`text-lg font-bold underline-offset-4 transition-colors ${
                          isScrolled ? 'text-primary' : 'text-black'
                        } ${
                          pathname === item.href
                            ? 'text-blue-700 underline'
                            : 'hover:text-blue-700 hover:underline focus:text-blue-700 focus:underline'
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
                {/* place auth button further separated from nav like Header1 */}
                <div className="ml-6 flex items-center justify-end">
                  {renderAuthButton()}
                </div>
              </div>
            ) : (
              <div className="flex w-full items-center">
                <div className="shrink-0">
                  <Link href="/estudiantes">
                    <div className="flex items-center rounded-lg bg-blue-100 px-6 py-3 shadow-lg">
                      <span
                        className="font-serif text-3xl font-extrabold tracking-wide text-blue-700 drop-shadow-lg md:text-4xl lg:text-5xl"
                        style={{
                          letterSpacing: '0.04em',
                          textShadow:
                            '0 2px 16px rgba(37,99,235,0.18), 0 1px 0 #fff',
                        }}
                      >
                        CCOET
                      </span>
                    </div>
                  </Link>
                </div>
                <div className="flex flex-1 justify-center gap-6">
                  <form onSubmit={handleSearch} className="w-[700px]">
                    <div className="header-search-container">
                      <input
                        type="search"
                        name="search"
                        className="header-input text-background w-full bg-white pr-10"
                        placeholder="Buscar cursos..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        aria-label="Buscar cursos"
                      />
                      <svg
                        viewBox="0 0 24 24"
                        className="header-search__icon"
                        onClick={handleSearch}
                      >
                        <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
                      </svg>
                    </div>
                  </form>
                </div>
                {/* small-screen menu + auth */}
                <div className="flex items-center gap-4">
                  <div className="header-menu">
                    <button
                      className="menu-selected flex items-center gap-2"
                      onClick={toggleDropdown}
                      type="button"
                    >
                      <span className="font-bold text-black">Menú</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className={`menu-arrow text-black ${isDropdownOpen ? 'rotate' : ''}`}
                        style={{ width: 22, height: 22 }}
                      >
                        <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                      </svg>
                    </button>
                    <div
                      className={`menu-options ${isDropdownOpen ? 'show' : ''} rounded-xl border border-blue-100 bg-white py-2 shadow-lg`}
                      style={{
                        minWidth: 220,
                        marginTop: 12,
                        left: '50%',
                        transform: 'translateX(-50%)',
                      }}
                    >
                      <ul className="flex flex-col gap-1">
                        {navItems.map((item) => {
                          // Oferta Educativa -> submenú lateral izquierdo para evitar taparse
                          if (item.label === 'Oferta Educativa') {
                            return (
                              <li
                                key="oferta"
                                className="group relative"
                                style={{ position: 'relative' }}
                              >
                                <div
                                  className={`mb-2 rounded px-4 py-2 font-bold transition-colors ${
                                    pathname === item.href
                                      ? 'text-blue-700 underline underline-offset-4'
                                      : isScrolled
                                        ? 'text-primary'
                                        : 'text-black'
                                  } cursor-pointer group-hover:text-blue-700`}
                                  tabIndex={0}
                                >
                                  Oferta Educativa
                                </div>
                                {/* Submenú lateral a la izquierda, usando left-auto y right-0 y mayor separación */}
                                <ul
                                  className="absolute top-0 right-[90%] left-auto z-50 w-56 rounded-xl border border-blue-100 bg-white opacity-0 shadow-lg transition-opacity group-hover:visible group-hover:opacity-100"
                                  style={{
                                    marginLeft: '0',
                                    marginRight: '32px',
                                  }}
                                >
                                  <li key="diplomados">
                                    <a
                                      href="/estudiantes#courses-list-section"
                                      className="flex items-center px-4 py-2 font-semibold text-black transition-colors hover:text-blue-700"
                                      onClick={handleDiplomadosClick}
                                    >
                                      <span className="mr-2 text-xl">📚</span>
                                      <span>Diplomados y Cursos</span>
                                    </a>
                                  </li>
                                  <li key="carreras-tecnicas">
                                    <a
                                      href="/programs"
                                      className="flex items-center px-4 py-2 font-semibold text-black transition-colors hover:text-blue-700"
                                      onClick={handleCarrerasClick}
                                    >
                                      <span className="mr-2 text-xl">🛠️</span>
                                      <span>Carreras técnicas</span>
                                    </a>
                                  </li>
                                </ul>
                              </li>
                            );
                          }
                          // Estudiantes: subrayado azul si activo
                          if (item.label === 'Estudiantes') {
                            return (
                              <li key={item.href}>
                                <Link
                                  href={item.href}
                                  className={`block rounded px-4 py-2 text-lg transition-colors ${
                                    pathname === item.href
                                      ? 'text-blue-700 underline underline-offset-4'
                                      : isScrolled
                                        ? 'text-primary'
                                        : 'text-black'
                                  } hover:text-blue-700 hover:underline focus:text-blue-700 focus:underline`}
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {item.label}
                                </Link>
                              </li>
                            );
                          }
                          // Otros labels: negros, hover azul, subrayado azul si activo
                          return (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                className={`block rounded px-4 py-2 text-lg transition-colors ${
                                  pathname === item.href
                                    ? 'text-blue-700 underline underline-offset-4'
                                    : isScrolled
                                      ? 'text-primary'
                                      : 'text-black'
                                } hover:text-blue-700 hover:underline focus:text-blue-700 focus:underline`}
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {item.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  <div className="flex justify-end">{renderAuthButton()}</div>
                </div>
              </div>
            )}
          </div>
          {/* mobile header fallback */}
          <div className="flex w-full items-center justify-between md:hidden">
            <div className="shrink-0">
              <Link href="/estudiantes">
                <div className="flex items-center rounded-lg bg-blue-100 px-6 py-3 shadow-lg">
                  <span
                    className="font-serif text-3xl font-extrabold tracking-wide text-blue-700 drop-shadow-lg md:text-4xl lg:text-5xl"
                    style={{
                      letterSpacing: '0.04em',
                      textShadow:
                        '0 2px 16px rgba(37,99,235,0.18), 0 1px 0 #fff',
                    }}
                  >
                    CCOET
                  </span>
                </div>
              </Link>
            </div>
            <label className="hamburger mr-2 flex h-8 w-8 items-center justify-center md:h-12 md:w-12">
              <input
                type="checkbox"
                checked={mobileMenuOpen}
                onChange={(e) => setMobileMenuOpen(e.target.checked)}
              />
              <svg viewBox="0 0 32 32">
                <path
                  className="line line-top-bottom"
                  d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                />
                <path className="line" d="M7 16 27 16" />
              </svg>
            </label>
          </div>
        </div>
        <Dialog
          as="div"
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-50 md:hidden"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <DialogPanel className="fixed inset-y-0 top-16 right-0 z-50 w-[65%] max-w-sm bg-white p-6 shadow-xl">
            <div className="mt-9 flex items-center justify-between">
              <div className="relative size-[150px]">
                <Link href="/estudiantes">
                  <div className="relative size-[150px]">
                    <Image
                      src="/CCOET-logo2.svg"
                      alt="Logo CCOET Mobile"
                      fill
                      unoptimized
                      className="object-contain"
                      sizes="150px"
                    />
                  </div>
                </Link>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="ml-5 rounded-full text-gray-600 transition-all duration-200 hover:bg-gray-100 focus:outline-none active:bg-gray-200"
                aria-label="Close menu"
              >
                <XMarkIconSolid className="size-8" />
              </button>
            </div>
            <nav className="pb-7">
              <ul className="space-y-12">
                {navItems.map((item) => {
                  // Oferta Educativa -> mostrar sublista de ofertaMenu
                  if (item.label === 'Oferta Educativa') {
                    return (
                      <li key="oferta">
                        <div className="mb-2 font-bold">Oferta Educativa</div>
                        <ul className="ml-4 space-y-2">
                          {ofertaMenu.map((m) => (
                            <li key={m.slug}>
                              <Link
                                href={m.href}
                                className="block text-lg text-gray-900 transition-colors hover:text-blue-700"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {m.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    );
                  }

                  // Estudiantes -> enlace destacado cuando corresponde
                  if (item.label === 'Estudiantes') {
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`block text-lg text-gray-900 transition-colors active:scale-95 ${
                            pathname === '/estudiantes'
                              ? 'text-blue-700 underline underline-offset-4'
                              : 'hover:text-blue-700'
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  }

                  // Default render para el resto de items
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block text-lg text-gray-900 transition-colors hover:text-orange-500 active:scale-95"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="div-auth mt-6 flex items-center justify-center">
              <Suspense
                fallback={
                  <div className="flex min-w-[180px] items-center justify-start">
                    <Icons.spinner className="text-background h-5 w-5" />
                  </div>
                }
              >
                {renderAuthButton()}
              </Suspense>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </>
  );
}
