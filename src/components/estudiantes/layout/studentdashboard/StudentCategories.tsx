/* eslint-disable @next/next/no-img-element */
'use client';

import { useCallback, useEffect, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useProgress } from '@bprogress/next';
import { FunnelIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { FiCode } from 'react-icons/fi';
import useSWR from 'swr';

import { Icons } from '~/components/estudiantes/ui/icons';
import { Input } from '~/components/estudiantes/ui/input';
import {
  restoreScrollPosition as _restoreScrollPosition,
  saveScrollPosition,
} from '~/utils/scrollPosition';

import type { Category } from '~/types';

interface CourseCategoriesProps {
  allCategories: Category[];
  featuredCategories: Category[];
}

interface CategoriesData {
  allCategories: Category[];
  featuredCategories: Category[];
}

export default function StudentCategories({
  allCategories,
  featuredCategories,
}: CourseCategoriesProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { start, stop } = useProgress();
  const [loadingCategory, setLoadingCategory] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState(
    searchParams?.get('query') ?? ''
  );

  // Sync local searchQuery when URL changes
  useEffect(() => {
    setSearchQuery(searchParams?.get('query') ?? '');
    setLoadingCategory(null);
    setIsSearching(false);
    stop();

    // Scroll to results after search or category filter
    if (searchParams?.has('query') || searchParams?.has('category')) {
      setTimeout(() => {
        const resultsSection = document.getElementById('courses-list-section');
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  }, [searchParams, stop]);

  // Usar SWR para el fetching y caching de datos
  const { data: categoriesData } = useSWR<CategoriesData>('/api/categories', {
    fallbackData: { allCategories, featuredCategories },
    revalidateOnFocus: false, // Solo revalidar cuando sea necesario
    revalidateOnReconnect: false,
  });

  const handleCategorySelect = (category: string | null) => {
    saveScrollPosition();
    start();
    setLoadingCategory(category ?? 'all');
    const params = new URLSearchParams();
    if (category) {
      params.set('category', category);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearch = useCallback(() => {
    saveScrollPosition();
    const params = new URLSearchParams();
    if (searchQuery) {
      params.set('query', searchQuery);
    }
    start();
    setIsSearching(true);
    router.push(`${pathname}?${params.toString()}`);
  }, [searchQuery, pathname, router, start]);

  useEffect(() => {
    setLoadingCategory(null);
    setIsSearching(false);
    stop();

    // Scroll to results after search or category filter
    if (searchParams?.has('query') || searchParams?.has('category')) {
      setTimeout(() => {
        const resultsSection = document.getElementById('courses-list-section');
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  }, [searchParams, stop]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <section className="div-filters mt-16 px-8 sm:px-12 md:px-10 lg:px-20">
      <div className="container mx-auto">
        <div className="mb-8 flex flex-col items-center justify-between lg:flex-row">
          <div className="relative mb-4 w-full sm:w-3/4 md:w-1/3 lg:mb-0 lg:w-1/3">
            <FunnelIcon className="absolute top-1/2 left-3 size-5 -translate-y-1/2 fill-gray-500" />
            <select
              className="focus:border-primary focus:ring-primary block w-full cursor-pointer rounded-lg border border-gray-300 bg-[#01142B] p-2 pl-10 text-sm text-white"
              onChange={(e) => handleCategorySelect(e.target.value || null)}
              value={searchParams?.get('category') ?? ''}
              aria-label="Seleccionar categoría"
            >
              <option value="" className="bg-[#01142B] text-white">
                Todas las categorías
              </option>
              {categoriesData?.allCategories?.map((category) => (
                <option
                  key={category.id}
                  value={category.id.toString()}
                  className="bg-[#01142B] text-white"
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full lg:ml-auto lg:w-1/3">
            <div className="relative w-full max-w-lg">
              {/* Agregado name="search" y data-role para que el script global detecte el clear (x) */}
              <Input
                name="search"
                data-role="course-search"
                type="search"
                placeholder="Buscar cursos..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const v = e.target.value;
                  setSearchQuery(v);
                  // si se borra, limpiar query de URL
                  if (v === '' && searchParams?.has('query')) {
                    router.push(pathname);
                  }
                }}
                onKeyDown={handleKeyDown}
                className="w-full bg-[#01142B] pr-10 text-white placeholder:text-gray-300"
                aria-label="Buscar cursos"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                {isSearching ? (
                  <Icons.spinner
                    className="text-background size-4"
                    aria-hidden="true"
                  />
                ) : (
                  <MagnifyingGlassIcon
                    className="size-4 fill-gray-400"
                    aria-hidden="true"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="hidden grid-cols-2 gap-3 sm:grid sm:grid-cols-4 lg:grid-cols-8">
          {/* Botón "Todos los cursos" solo visible en desktop */}
          <div
            className={`flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-800 p-3 text-center transition-transform hover:scale-105 hover:shadow-lg active:scale-95 ${
              loadingCategory === 'all' ? 'pr-4' : ''
            }`}
            onClick={() => handleCategorySelect(null)}
            role="button"
            tabIndex={0}
            aria-label="Mostrar todos los cursos"
          >
            <div className="flex h-full flex-col items-center justify-center">
              {loadingCategory === 'all' ? (
                <>
                  <Icons.spinner
                    className="size-8 text-white"
                    aria-hidden="true"
                  />
                  <p className="mt-2 text-xs text-white">Buscando Cursos...</p>
                </>
              ) : (
                <>
                  <div className="mb-3 text-2xl text-blue-600">
                    <FiCode className="size-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-sm font-semibold text-white">
                    Todos los cursos
                  </h3>
                </>
              )}
            </div>
          </div>

          {/* Categorías destacadas solo visibles en desktop */}
          {categoriesData?.featuredCategories
            ?.filter((category) => category.is_featured)
            .map((category: Category, index: number) => (
              <div
                key={category.id}
                className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-800 p-3 text-center transition-transform hover:scale-105 hover:shadow-lg active:scale-95"
                onClick={() => handleCategorySelect(category.id.toString())}
                role="button"
                tabIndex={0}
                aria-label={`Mostrar cursos de ${category.name}`}
              >
                <div className="flex h-full flex-col items-center justify-center">
                  {loadingCategory === category.id.toString() ? (
                    <>
                      <Icons.spinner
                        className="size-8 text-white"
                        aria-hidden="true"
                      />
                      <p className="mt-2 text-xs text-white">
                        Buscando Cursos...
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="mb-3 text-2xl text-blue-600">
                        {/* usar img nativa en lugar de next/image para iconos pequeños */}
                        <img
                          src={`/${
                            index === 0
                              ? 'alembic-svgrepo-com.svg'
                              : index === 1
                                ? 'list-svgrepo-com.svg'
                                : index === 2
                                  ? 'brush-svgrepo-com.svg'
                                  : index === 3
                                    ? 'web-page-browser-analysis-screen-svgrepo-com.svg'
                                    : index === 4
                                      ? 'database-svgrepo-com.svg'
                                      : index === 5
                                        ? 'api-interface-svgrepo-com.png'
                                        : index === 6
                                          ? 'cloud-computing-ai-svgrepo-com.png'
                                          : 'code-svgrepo-com.svg'
                          }`}
                          alt={category.name}
                          width={36}
                          height={36}
                          className="size-9"
                        />
                      </div>
                      <h3 className="text-sm font-semibold text-white">
                        {category.name}
                      </h3>
                      <p className="mt-1 text-xs text-gray-300">
                        {`${category.courses?.length ?? 0} curso${
                          category.courses?.length !== 1 ? 's' : ''
                        }`}
                      </p>
                    </>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

// Nuevo componente reutilizable para la barra de búsqueda
export function CourseSearchBar({
  defaultQuery = '',
  onSearchAction,
  className = '',
}: {
  defaultQuery?: string;
  // rename to onSearchAction to indicate server action / avoid non-serializable prop warning
  onSearchAction?: (query: string) => void;
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(defaultQuery);
  const { start } = useProgress();
  const [isSearching, setIsSearching] = useState(false);

  // Sync with URL param
  useEffect(() => {
    const q = searchParams?.get('query') ?? '';
    setQuery(q || defaultQuery);
  }, [searchParams, defaultQuery]);

  const handleSearch = useCallback(() => {
    start();
    setIsSearching(true);

    if (onSearchAction) {
      onSearchAction(query);
      setIsSearching(false);
      return;
    }

    const params = new URLSearchParams();
    if (query) params.set('query', query);
    router.push(`${pathname}?${params.toString()}`);
    setIsSearching(false);
  }, [onSearchAction, query, router, pathname, start]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className={`relative w-full max-w-lg ${className}`}>
      {/* Agregado name="search" para consistencia */}
      <Input
        name="search"
        type="search"
        placeholder="Buscar cursos..."
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const v = e.target.value;
          setQuery(v);
          // si se borra, limpiar query de URL
          if (v === '' && searchParams?.has('query')) {
            router.push(pathname);
          }
        }}
        onKeyDown={handleKeyDown}
        className="w-full bg-[#01142B] pr-10 text-white placeholder:text-gray-300"
        aria-label="Buscar cursos"
        autoComplete="off"
        data-no-chatbot="true"
      />
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        {isSearching ? (
          <Icons.spinner
            className="text-background size-4"
            aria-hidden="true"
          />
        ) : (
          <MagnifyingGlassIcon
            className="size-4 fill-gray-400"
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
}
