'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { useUser } from '@clerk/nextjs';
import { CheckCircleIcon, StarIcon } from '@heroicons/react/24/solid';
import { FaCalendar, FaCheck, FaTrophy, FaUserGraduate } from 'react-icons/fa';
import { toast } from 'sonner';
import useSWR from 'swr';

import { EnrollmentCount } from '~/components/estudiantes/layout/EnrollmentCount';
import { AspectRatio } from '~/components/estudiantes/ui/aspect-ratio';
import { Badge } from '~/components/estudiantes/ui/badge';
import { Button } from '~/components/estudiantes/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
} from '~/components/estudiantes/ui/card';
import { Icons } from '~/components/estudiantes/ui/icons';
import { blurDataURL } from '~/lib/blurDataUrl';
import { formatDate, type GradesApiResponse } from '~/lib/utils2';

import { ProgramContent } from './ProgramContent';
import { ProgramGradesModal } from './ProgramGradesModal';

import type { Program } from '~/types';

interface ProgramHeaderProps {
  program: Program;
  isEnrolled: boolean;
  isEnrolling: boolean;
  isUnenrolling: boolean;
  isSubscriptionActive: boolean;
  subscriptionEndDate: string | null;
  onEnrollAction: () => Promise<void>;
  onUnenrollAction: () => Promise<void>;
  isCheckingEnrollment: boolean;
}

// Add error type
interface FetchError {
  error?: string;
  message?: string;
}

export function ProgramHeader({
  program,
  isEnrolled,
  isEnrolling,
  isUnenrolling,
  isSubscriptionActive,
  subscriptionEndDate: _subscriptionEndDate,
  onEnrollAction,
  onUnenrollAction,
  isCheckingEnrollment,
}: ProgramHeaderProps) {
  const { user, isSignedIn } = useUser();
  const [isGradeModalOpen, setIsGradeModalOpen] = useState(false);
  const [isLoadingGrade, setIsLoadingGrade] = useState(true);
  // Agregar estado para controlar renderizado después de hidratación
  const [isClient, setIsClient] = useState(false);

  // Establecer isClient en true después del primer renderizado
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Replace useEffect with useSWR
  // Improve error handling with proper types
  const { data: gradesData, error: gradesError } = useSWR<
    GradesApiResponse,
    FetchError
  >(
    user?.id
      ? `/api/grades/program?userId=${user.id}&programId=${program.id}`
      : null,
    async (url: string): Promise<GradesApiResponse> => {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Error fetching grades');
      const data = (await res.json()) as GradesApiResponse;
      return data;
    },
    {
      refreshInterval: 5000, // Poll every 5 seconds
      revalidateOnFocus: true,
    }
  );

  // Agrupa por curso y toma solo una nota final por curso (la primera materia encontrada)
  const allCourses =
    program.materias?.map((m) => m.curso?.title ?? 'Curso sin nombre') ?? [];
  const uniqueCourses = Array.from(new Set(allCourses));

  const coursesGrades: CourseGrade[] = uniqueCourses.map((courseTitle) => {
    // Busca la primera materia de ese curso en gradesData
    const materiaDelCurso = gradesData?.materias?.find(
      (m) => m.courseTitle === courseTitle
    );
    // Toma la nota final de esa materia (todas tienen la misma)
    const finalGrade = materiaDelCurso ? Number(materiaDelCurso.grade) : 0;
    return {
      courseTitle,
      finalGrade,
    };
  });

  // Promedio temporal del programa usando la nota final de cada curso
  const programAverage =
    coursesGrades.length > 0
      ? Number(
          (
            coursesGrades.reduce((a, b) => a + (b.finalGrade ?? 0), 0) /
            coursesGrades.length
          ).toFixed(2)
        )
      : 0;

  interface CourseGrade {
    courseTitle: string;
    finalGrade: number;
  }

  // Update loading state based on SWR
  // Update loading state with proper error handling
  useEffect(() => {
    setIsLoadingGrade(!gradesData && !gradesError);
  }, [gradesData, gradesError]);

  // Verificar plan Premium y fecha de vencimiento
  const isPremium = user?.publicMetadata?.planType === 'Premium';
  const subscriptionEndDate = user?.publicMetadata?.subscriptionEndDate as
    | string
    | null;
  const isSubscriptionValid =
    isPremium &&
    (!subscriptionEndDate || new Date(subscriptionEndDate) > new Date());
  const canEnroll = isSubscriptionActive && isSubscriptionValid;

  const getCategoryName = (program: Program) => {
    return program.category?.name ?? 'Sin categoría';
  };

  const handleSignInRedirect = async () => {
    toast.error('Inicio de sesión requerido', {
      description: 'Debes iniciar sesión para inscribirte en este programa',
      duration: 3000,
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const currentPath = `/estudiantes/programas/${program.id}`;
    const returnUrl = encodeURIComponent(currentPath);
    window.location.href = `/sign-in?redirect_url=${returnUrl}`;
  };

  const handleEnrollClick = async () => {
    if (!canEnroll) {
      window.open('/planes', '_blank', 'noopener,noreferrer');
      return;
    }
    await onEnrollAction();
  };

  const canAccessGrades = isEnrolled;

  // Renderizar un botón simplificado en SSR, para evitar diferencias de hidratación
  const renderEnrollmentButton = () => {
    // Si estamos en el servidor o no se ha hidratado aún, mostrar un botón estático básico
    if (!isClient) {
      return (
        <Button
          disabled={true}
          className="relative inline-block h-12 w-64 cursor-pointer rounded-xl bg-gray-800 p-px leading-6 font-semibold text-white shadow-2xl shadow-zinc-900 disabled:opacity-50"
        >
          <span className="relative z-10 block rounded-xl bg-gray-950 px-6 py-3">
            <div className="relative z-10 flex items-center justify-center space-x-2">
              <span>Cargando...</span>
            </div>
          </span>
        </Button>
      );
    }

    // En el cliente (después de hidratación), mostrar el botón completo
    if (!isSignedIn) {
      return (
        <Button
          onClick={handleSignInRedirect}
          className="relative inline-block h-12 w-64 cursor-pointer rounded-xl bg-gray-800 p-px leading-6 font-semibold text-white shadow-2xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
        >
          <span className="relative z-10 block rounded-xl bg-gray-950 px-6 py-3">
            <div className="relative z-10 flex items-center justify-center space-x-2">
              <span>Iniciar sesión</span>
            </div>
          </span>
        </Button>
      );
    } else if (isEnrolled) {
      return (
        <div className="flex w-full flex-col space-y-4">
          <Button
            className="bg-primary text-background hover:bg-primary/90 h-12 w-64 justify-center border-white/20 text-lg font-semibold transition-colors active:scale-95"
            disabled={true}
          >
            <FaCheck className="mr-2" /> Suscrito Al Programa
          </Button>
          <Button
            className="h-12 w-64 justify-center border-white/20 bg-red-500 text-lg font-semibold hover:bg-red-600"
            onClick={onUnenrollAction}
            disabled={isUnenrolling}
          >
            {isUnenrolling ? (
              <Icons.spinner className="size-9 text-white" />
            ) : (
              'Cancelar Suscripción'
            )}
          </Button>
        </div>
      );
    } else {
      const isDisabled = isEnrolling || isCheckingEnrollment;

      return (
        <Button
          onClick={handleEnrollClick}
          disabled={isDisabled}
          className="relative inline-block h-12 w-64 cursor-pointer rounded-xl bg-gray-800 p-px leading-6 font-semibold text-white shadow-2xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          <span className="relative z-10 block rounded-xl bg-gray-950 px-6 py-3">
            <div className="relative z-10 flex items-center justify-center space-x-2">
              {isCheckingEnrollment ? (
                <>
                  <Icons.spinner
                    className="text-white"
                    style={{ width: '20px', height: '20px' }}
                  />
                  <span>Cargando...</span>
                </>
              ) : isEnrolling ? (
                <>
                  <Icons.spinner
                    className="text-white"
                    style={{ width: '25px', height: '25px' }}
                  />
                  <span>Inscribiendo...</span>
                </>
              ) : (
                <>
                  <span>
                    {!canEnroll
                      ? 'Obtener Plan Premium'
                      : 'Inscribirse al Programa'}
                  </span>
                  <svg
                    className="size-6"
                    data-slot="icon"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                      fillRule="evenodd"
                    />
                  </svg>
                </>
              )}
            </div>
          </span>
        </Button>
      );
    }
  };

  // Renderizar el botón duplicado arriba de ProgramContent con espacio dinámico
  const renderTopEnrollmentButton = () => {
    // Si está inscrito, muestra ambos botones y deja espacio
    if (isEnrolled) {
      return (
        <div className="mb-0 flex justify-center pt-2 sm:mb-0">
          <div className="relative h-32 w-64">{renderEnrollmentButton()}</div>
        </div>
      );
    }
    // Si NO está inscrito, muestra solo el botón y elimina el espacio extra
    return (
      <div className="flex justify-center pt-3 sm:pt-0">
        <div className="relative h-16 w-64">{renderEnrollmentButton()}</div>
      </div>
    );
  };

  return (
    <Card className="overflow-hidden bg-gray-800 p-0 text-white">
      {' '}
      {/* Cambiado a fondo oscuro */}
      <CardHeader className="px-0">
        <AspectRatio ratio={16 / 6}>
          <Image
            src={
              program.coverImageKey
                ? `${process.env.NEXT_PUBLIC_AWS_S3_URL}/${program.coverImageKey}`
                : 'https://placehold.co/600x400/01142B/3AF4EF?text=Artiefy&font=MONTSERRAT'
            }
            alt={program.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL={blurDataURL}
          />
          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 via-black/50 to-transparent p-4 md:p-6">
            <h1 className="line-clamp-2 text-xl font-bold text-white md:text-2xl lg:text-3xl">
              <span className="inline">
                {program.title}{' '}
                {isEnrolled && (
                  <CheckCircleIcon className="mb-1 ml-1 inline-block h-6 w-6 flex-shrink-0 align-middle text-green-500" />
                )}
              </span>
            </h1>
          </div>
        </AspectRatio>
      </CardHeader>
      <CardContent className="mx-auto w-full max-w-7xl space-y-4 px-4 sm:px-6">
        {/* Program metadata */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
              <Badge
                variant="outline"
                className="border-primary bg-background text-primary w-fit hover:bg-black/70"
              >
                {getCategoryName(program)}
              </Badge>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="flex items-center">
                  <FaCalendar className="mr-2 text-white" />{' '}
                  {/* icono blanco */}
                  <span className="text-xs text-white sm:text-sm">
                    Creado: {formatDate(program.createdAt?.toString() ?? '')}
                  </span>
                </div>
                <div className="flex items-center">
                  <FaCalendar className="mr-2 text-white" />{' '}
                  {/* icono blanco */}
                  <span className="text-xs text-white sm:text-sm">
                    Actualizado:{' '}
                    {formatDate(program.updatedAt?.toString() ?? '')}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-center">
              <FaUserGraduate className="mr-2 text-blue-600" />
              <EnrollmentCount programId={parseInt(program.id)} />
            </div>
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon
                  key={index}
                  className={`h-4 w-4 sm:h-5 sm:w-5 ${
                    index < Math.floor(program.rating ?? 0)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="ml-2 text-base font-semibold text-yellow-400 sm:text-lg">
                {program.rating?.toFixed(1) ?? '0.0'}
              </span>
            </div>
          </div>
        </div>

        {/* Program description */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
          <div className="prose max-w-none">
            <p className="text-sm leading-relaxed text-white sm:text-base">
              {/* Cambiado a blanco */}
              {program.description ?? 'No hay descripción disponible.'}
            </p>
          </div>
          <Button
            onClick={() => setIsGradeModalOpen(true)}
            disabled={!canAccessGrades}
            className="h-9 w-full shrink-0 bg-blue-500 px-4 font-semibold text-white hover:bg-blue-600 sm:w-auto"
            aria-label={
              !isEnrolled
                ? 'Debes inscribirte al programa'
                : 'Ver tus calificaciones'
            }
          >
            <FaTrophy className="mr-2 h-4 w-4" />
            <span className="text-sm font-semibold">Mis Calificaciones</span>
          </Button>
        </div>

        {/* --- NUEVO: Botón de inscripción arriba de la descripción con espacio dinámico --- */}
        {renderTopEnrollmentButton()}

        {/* Program courses */}
        <ProgramContent
          program={program}
          isEnrolled={isEnrolled}
          isSubscriptionActive={isSubscriptionActive}
          subscriptionEndDate={_subscriptionEndDate}
          isCheckingEnrollment={isCheckingEnrollment}
        />

        {/* Botón de inscripción abajo como antes */}
        <div className="flex justify-center pt-4">
          <div className="relative h-32 w-64">{renderEnrollmentButton()}</div>
        </div>
        <ProgramGradesModal
          isOpen={isGradeModalOpen}
          onCloseAction={() => setIsGradeModalOpen(false)}
          programTitle={program.title}
          finalGrade={programAverage}
          isLoading={isLoadingGrade}
          coursesGrades={coursesGrades}
        />
      </CardContent>
    </Card>
  );
}
