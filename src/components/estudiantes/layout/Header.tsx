'use client';

import { Suspense, useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SignedIn, SignedOut, SignInButton, useAuth } from '@clerk/nextjs';
import { Dialog, DialogPanel } from '@headlessui/react';
import { XMarkIcon as XMarkIconSolid } from '@heroicons/react/24/solid';

import { Button } from '~/components/estudiantes/ui/button';
import { Icons } from '~/components/estudiantes/ui/icons';

import { UserButtonWrapper } from '../auth/UserButtonWrapper';

import { NotificationHeader } from './NotificationHeader';

import '~/styles/barsicon.css';
import '~/styles/searchBar.css';
import '~/styles/headerSearchBar.css';
import '~/styles/headerMenu.css';

export function Header({
  onEspaciosClickAction,
}: {
  onEspaciosClickAction?: () => void;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchInProgress, setSearchInProgress] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  // New state to track if activity modal is open
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  // New state to track scroll direction
  const [_isScrollingDown, setIsScrollingDown] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  // MODAL DISPONIBLE MUY PRONTO
  // Solo para Espacios
  const [showEspaciosModal, setShowEspaciosModal] = useState(false);

  const { isLoaded: isAuthLoaded } = useAuth();
  const navItems = [
    { href: '/', label: 'Inicio' },
    { href: '/estudiantes', label: 'Cursos' },
    { href: '/comunidad', label: 'Espacios' },
    { href: '/planes', label: 'Planes' },
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
      // Restaurar visibilidad después del scroll
      setTimeout(() => {
        setIsHeaderVisible(true);
      }, 2000);
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
      setIsScrollingDown(isDown);

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
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignInClick = () => {
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!searchQuery.trim() || searchInProgress) return;

    setSearchInProgress(true);

    // Emit global search event
    const searchEvent = new CustomEvent('artiefy-search', {
      detail: { query: searchQuery.trim() },
    });
    window.dispatchEvent(searchEvent);

    // Clear the search input
    setSearchQuery('');
    setSearchInProgress(false);
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
              <SignInButton>
                <Button
                  className="border-primary bg-primary text-background hover:bg-background hover:text-primary relative skew-x-[-15deg] cursor-pointer rounded-none border p-5 text-xl font-light italic transition-all duration-200 hover:shadow-[0_0_30px_5px_rgba(0,189,216,0.815)] active:scale-95"
                  style={{
                    transition: '0.5s',
                    width: '180px',
                  }}
                  onClick={handleSignInClick}
                >
                  <span className="relative skew-x-[15deg] overflow-hidden font-semibold">
                    {isLoading ? (
                      <Icons.spinner className="size-6" />
                    ) : (
                      'Iniciar Sesión'
                    )}
                  </span>
                </Button>
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
  const handleEspaciosClick = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setShowEspaciosModal(true);
    onEspaciosClickAction?.();
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
        className={`sticky top-0 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-opacity-80 bg-[#01142B] shadow-md backdrop-blur-sm'
            : 'md:py-3'
        } ${!isHeaderVisible ? '-translate-y-full' : 'translate-y-0'} div-header-nav ${
          isActivityModalOpen ? 'z-40' : 'z-[9999]'
        }`}
      >
        <div className="container mx-auto max-w-7xl px-4 py-8">
          <div className="hidden w-full items-center md:flex md:justify-between">
            {!isScrolled ? (
              <div className="flex w-full items-center justify-between">
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
                <div className="div-header-nav flex gap-24">
                  {navItems.map((item) => {
                    const extraClass = `div-header-${item.label.toLowerCase()}`;
                    // Proyectos: acceso directo
                    if (item.label === 'Proyectos') {
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`text-lg font-light tracking-wide whitespace-nowrap text-white transition-colors hover:text-orange-500 active:scale-95 ${extraClass}`}
                        >
                          {item.label}
                        </Link>
                      );
                    }
                    // Espacios: mostrar modal
                    if (item.label === 'Espacios') {
                      return (
                        <button
                          key={item.href}
                          type="button"
                          className={`text-lg font-light tracking-wide whitespace-nowrap text-white transition-colors hover:text-orange-500 active:scale-95 ${extraClass} cursor-pointer border-0 bg-transparent outline-none`}
                          onClick={handleEspaciosClick}
                        >
                          {item.label}
                        </button>
                      );
                    }
                    // Cursos: subrayado si pathname === '/estudiantes' y hover azul solo si no está activo
                    if (item.label === 'Cursos') {
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`text-lg font-light tracking-wide whitespace-nowrap transition-colors active:scale-95 ${extraClass} ${pathname === '/estudiantes' ? 'text-blue-700 underline underline-offset-4' : 'text-white hover:text-blue-700'}`}
                        >
                          {item.label}
                        </Link>
                      );
                    }
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`text-lg font-light tracking-wide whitespace-nowrap text-white transition-colors hover:text-orange-500 active:scale-95 ${extraClass}`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
                <div className="flex justify-end">{renderAuthButton()}</div>
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
                        placeholder="Buscar..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="header-input border-primary"
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
                <div className="flex items-center gap-4">
                  <div className="header-menu">
                    <button
                      className="menu-selected"
                      onClick={toggleDropdown}
                      type="button"
                    >
                      Menú
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className={`menu-arrow ${isDropdownOpen ? 'rotate' : ''}`}
                      >
                        <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                      </svg>
                    </button>
                    <div
                      className={`menu-options ${isDropdownOpen ? 'show' : ''}`}
                    >
                      {navItems.map((item) => {
                        // Proyectos: acceso directo
                        if (item.label === 'Proyectos') {
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="menu-option hover:text-orange-500"
                              onClick={toggleDropdown}
                            >
                              {item.label}
                            </Link>
                          );
                        }
                        // Espacios: mostrar modal
                        if (item.label === 'Espacios') {
                          return (
                            <button
                              key={item.href}
                              type="button"
                              className="menu-option hover:text-orange-500"
                              onClick={handleEspaciosClick}
                            >
                              {item.label}
                            </button>
                          );
                        }
                        // Cursos: subrayado si pathname === '/estudiantes' y hover azul solo si no está activo
                        if (item.label === 'Cursos') {
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={`menu-option active:scale-95 ${pathname === '/estudiantes' ? 'text-blue-700 underline underline-offset-4' : 'hover:text-blue-700'}`}
                              onClick={toggleDropdown}
                            >
                              {item.label}
                            </Link>
                          );
                        }
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="menu-option hover:text-orange-500"
                            onClick={toggleDropdown}
                          >
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex justify-end">{renderAuthButton()}</div>
                </div>
              </div>
            )}
          </div>
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
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-[65%] max-w-sm bg-white p-6 shadow-xl">
            <div className="mt-9 flex items-center justify-between">
              <div className="relative size-[150px]">
                <Link href="/estudiantes">
                  <div className="relative size-[150px]">
                    <Image
                      src="/artiefy-logo2.svg"
                      alt="Logo Artiefy Mobile"
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
                  // Proyectos: acceso directo
                  if (item.label === 'Proyectos') {
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
                  }
                  // Espacios: mostrar modal
                  if (item.label === 'Espacios') {
                    return (
                      <li key={item.href}>
                        <button
                          type="button"
                          className="block w-full cursor-pointer border-0 bg-transparent text-left text-lg text-gray-900 transition-colors outline-none hover:text-orange-500 active:scale-95"
                          onClick={handleEspaciosClick}
                        >
                          {item.label}
                        </button>
                      </li>
                    );
                  }
                  // Cursos: subrayado si pathname === '/estudiantes' y hover azul solo si no está activo
                  if (item.label === 'Cursos') {
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`block text-lg text-gray-900 transition-colors active:scale-95 ${pathname === '/estudiantes' ? 'text-blue-700 underline underline-offset-4' : 'hover:text-blue-700'}`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  }
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
