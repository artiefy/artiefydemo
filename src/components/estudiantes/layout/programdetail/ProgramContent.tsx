'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import Image from 'next/image';

import { useRouter } from '@bprogress/next/app';
import { useAuth } from '@clerk/nextjs';
import {
  ArrowRightCircleIcon,
  CheckCircleIcon,
  StarIcon,
} from '@heroicons/react/24/solid';
import { FaCheck, FaCrown } from 'react-icons/fa';
import { MdOutlineLockClock } from 'react-icons/md';
import { toast } from 'sonner';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '~/components/estudiantes/ui/alert';
import { AspectRatio } from '~/components/estudiantes/ui/aspect-ratio';
import { Badge } from '~/components/estudiantes/ui/badge';
import { Button } from '~/components/estudiantes/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '~/components/estudiantes/ui/card';
import { Icons } from '~/components/estudiantes/ui/icons';
import { isUserEnrolled } from '~/server/actions/estudiantes/courses/enrollInCourse';

import type { Course, MateriaWithCourse, Program } from '~/types';

interface ProgramContentProps {
  program: Program;
  isEnrolled: boolean;
  isSubscriptionActive: boolean;
  subscriptionEndDate: string | null;
  isCheckingEnrollment: boolean;
}

export function ProgramContent({
  program,
  isEnrolled,
  isSubscriptionActive,
  subscriptionEndDate,
  isCheckingEnrollment,
}: ProgramContentProps) {
  const router = useRouter({
    showProgress: true,
    startPosition: 0.3,
    disableSameURL: true,
  });
  const { userId, isSignedIn } = useAuth();
  const [courseEnrollments, setCourseEnrollments] = useState<
    Record<number, boolean>
  >({});
  const [isNavigating, setIsNavigating] = useState(false);
  const [enrollmentCache, setEnrollmentCache] = useState<
    Record<number, boolean>
  >({});
  // Add a state to track if client-side rendering has occurred
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true on first render
  useEffect(() => {
    setIsClient(true);
  }, []);

  const courses = useMemo(() => {
    const safeMateriasWithCursos =
      program.materias?.filter(
        (materia): materia is MateriaWithCourse & { curso: Course } =>
          materia.curso !== undefined && 'id' in materia.curso
      ) ?? [];

    const uniqueCourses = safeMateriasWithCursos.reduce(
      (acc, materia) => {
        if (!acc.some((item) => item.curso.id === materia.curso.id)) {
          acc.push(materia);
        }
        return acc;
      },
      [] as (MateriaWithCourse & { curso: Course })[]
    );

    return uniqueCourses.map((materia) => materia.curso);
  }, [program.materias]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  useEffect(() => {
    let isSubscribed = true;
    const checkTimeout = setTimeout(async () => {
      if (!userId || !isClient) return;

      try {
        const checksNeeded = courses.filter(
          (course) => enrollmentCache[course.id] === undefined
        );

        if (checksNeeded.length === 0) return;

        const enrollmentChecks = await Promise.all(
          checksNeeded.map(async (course) => {
            try {
              const isEnrolled = await isUserEnrolled(course.id, userId);
              return [course.id, isEnrolled] as [number, boolean];
            } catch {
              return [course.id, false] as [number, boolean];
            }
          })
        );

        if (isSubscribed) {
          const newEnrollments = Object.fromEntries(enrollmentChecks);
          setEnrollmentCache((prev) => ({ ...prev, ...newEnrollments }));
          setCourseEnrollments((prev) => ({ ...prev, ...newEnrollments }));
        }
      } catch (error) {
        console.error('Error checking enrollments:', error);
      }
    }, 500); // Debounce time

    return () => {
      isSubscribed = false;
      clearTimeout(checkTimeout);
    };
  }, [userId, courses, enrollmentCache, isClient]);

  const handleCourseClick = useCallback(
    (courseId: number, isActive: boolean) => {
      if (isNavigating || !isActive || !isSignedIn || !isEnrolled) {
        if (!isSignedIn) {
          const currentPath = window.location.pathname;
          void router.push(`/sign-in?redirect_url=${currentPath}`, {
            showProgress: true,
            startPosition: 0.3,
          });
        }
        return;
      }

      try {
        setIsNavigating(true);
        // Mantener el progressbar de @bprogress
        void router.push(`/estudiantes/cursos/${courseId}`, {
          showProgress: true,
          startPosition: 0.3,
          scroll: true,
        });
      } catch (error) {
        console.error('Navigation error:', error);
        toast.error('Error al navegar al curso');
      } finally {
        setTimeout(() => {
          setIsNavigating(false);
        }, 1000);
      }
    },
    [isSignedIn, isEnrolled, router, isNavigating]
  );

  return (
    <div className="bg-background relative rounded-lg border p-6 shadow-lg">
      {' '}
      {/* Fondo azul oscuro */}
      {isEnrolled && !isSubscriptionActive && (
        <Alert
          variant="destructive"
          className="mb-6 border-2 border-red-500 bg-red-50"
        >
          <div className="flex items-center gap-3">
            <FaCrown className="size-8 text-red-500" />
            <div className="flex-1">
              <AlertTitle className="mb-2 text-xl font-bold text-red-700">
                ¡Tu suscripción Premium ha expirado!
              </AlertTitle>
              <AlertDescription className="text-base text-red-600">
                <p className="mb-4">
                  Para seguir accediendo a los cursos de este programa y
                  continuar tu aprendizaje, necesitas renovar tu suscripción
                  Premium.
                </p>
                <Button
                  onClick={() => router.push('/planes')}
                  className="transform rounded-lg bg-red-500 px-6 py-2 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-red-600 active:scale-95"
                >
                  <FaCrown className="mr-2" />
                  Renovar Suscripción Premium
                </Button>
              </AlertDescription>
            </div>
          </div>
        </Alert>
      )}
      <div className="mb-6">
        <div className="mb-4 flex flex-row items-center justify-between">
          <h2 className="text-primary text-2xl font-bold">
            Cursos Del Programa
          </h2>
          {isClient && isSignedIn && isSubscriptionActive && (
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-2 text-green-500">
                <FaCheck className="size-4" />
                <span className="font-medium">Suscripción Activa</span>
              </div>
              {subscriptionEndDate && (
                <p className="text-sm text-red-500">
                  Finaliza: {formatDate(subscriptionEndDate)}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      <div
        className={
          !isSubscriptionActive && isEnrolled
            ? 'pointer-events-none opacity-50 blur-[1px] filter'
            : ''
        }
      >
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <div key={`${course.id}-${index}`} className="group relative">
              {/* Gradiente azul y sombra en hover, igual a StudentProgram */}
              <div className="animate-gradient absolute -inset-1.5 rounded-lg bg-gradient-to-r from-violet-600 via-violet-400 to-violet-800 opacity-0 blur-[4px] transition duration-500 group-hover:opacity-100" />
              <Card className="relative flex h-full flex-col justify-between overflow-hidden border-0 bg-gray-800 text-white shadow-lg transition-transform duration-300 ease-in-out group-hover:scale-[1.03]">
                {' '}
                {/* Fondo azul oscuro y sombra */}
                {/* Añadir Badge "Muy pronto" para cursos desactivados */}
                {!course.isActive && (
                  <div className="absolute top-2 right-2 z-10 rounded bg-yellow-400 px-2 py-1 text-xs font-bold text-gray-900 shadow">
                    Muy pronto
                  </div>
                )}
                <CardHeader className="px-6">
                  <AspectRatio ratio={16 / 9}>
                    <div className="relative size-full">
                      <Image
                        src={
                          course.coverImageKey
                            ? `${process.env.NEXT_PUBLIC_AWS_S3_URL}/${course.coverImageKey}`
                            : 'https://placehold.co/600x400/01142B/3AF4EF?text=Artiefy&font=MONTSERRAT'
                        }
                        alt={course.title || 'Imagen del curso'}
                        className="rounded-md object-cover transition-transform duration-300 hover:scale-105"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={75}
                      />
                    </div>
                  </AspectRatio>
                </CardHeader>
                <CardContent className="-mt-3 flex grow flex-col justify-between space-y-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-background rounded text-lg">
                      <div className="text-primary font-bold">
                        {course.title}
                      </div>
                    </CardTitle>
                    {isClient && courseEnrollments[course.id] && (
                      <div className="flex items-center text-green-500">
                        <CheckCircleIcon className="size-5" />
                        <span className="ml-1 text-sm font-bold">Inscrito</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="border-primary bg-background text-primary hover:bg-black/70"
                    >
                      {course.category?.name}
                    </Badge>
                    <p className="text-right text-sm font-bold text-red-500">
                      {course.modalidad?.name}
                    </p>
                  </div>
                  <p className="line-clamp-2 text-sm text-gray-300">
                    {course.description}
                  </p>
                  <div className="flex w-full justify-between">
                    <p className="text-sm font-bold text-gray-300 italic">
                      Educador:{' '}
                      <span className="font-bold italic">
                        {course.instructorName ?? 'No tiene'}
                      </span>
                    </p>
                    <div className="flex items-center">
                      <StarIcon className="size-5 text-yellow-500" />
                      <span className="ml-1 text-sm font-bold text-yellow-500">
                        {(course.rating ?? 0).toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 w-full">
                    {/* Use isClient to prevent hydration mismatch with dynamic content */}
                    {!isClient ? (
                      <Button
                        disabled
                        className="group/button relative inline-flex h-10 w-full items-center justify-center overflow-hidden rounded-md border border-white/20 bg-gray-600 text-gray-400"
                      >
                        <span className="font-bold">Cargando...</span>
                      </Button>
                    ) : isCheckingEnrollment && isSignedIn ? (
                      <Button
                        disabled
                        className="group/button bg-background text-primary relative inline-flex h-10 w-full items-center justify-center overflow-hidden rounded-md border border-white/20 p-2"
                      >
                        {/* Usar Icons.spinner en lugar del spinner personalizado */}
                        <Icons.spinner className="mr-2 size-4" />
                        <span className="font-bold">Cargando...</span>
                      </Button>
                    ) : (
                      <Button
                        onClick={() =>
                          handleCourseClick(course.id, course.isActive ?? false)
                        }
                        disabled={
                          !course.isActive ||
                          isCheckingEnrollment ||
                          !isSignedIn ||
                          !isEnrolled
                        }
                        className={`w-full ${
                          !course.isActive || !isSignedIn || !isEnrolled
                            ? 'cursor-not-allowed bg-gray-600 hover:bg-gray-600'
                            : ''
                        } group/button relative inline-flex h-10 items-center justify-center overflow-hidden rounded-md border border-white/20 ${
                          !course.isActive || !isSignedIn || !isEnrolled
                            ? 'pointer-events-none bg-gray-600 !font-extrabold !text-[#fff] !opacity-100' // Fuerza blanco puro y sin opacidad
                            : 'bg-background text-primary active:scale-95'
                        }`}
                      >
                        <span className="font-bold">
                          {!course.isActive ? (
                            <span className="flex items-center justify-center !font-extrabold !text-[#fff] !opacity-100">
                              <MdOutlineLockClock className="mr-1.5 size-5 !text-[#fff] !opacity-100" />
                              Muy pronto
                            </span>
                          ) : !isSignedIn ? (
                            'Iniciar Sesión'
                          ) : !isEnrolled ? (
                            'Requiere Inscripción'
                          ) : courseEnrollments[course.id] ? (
                            'Continuar Curso'
                          ) : (
                            'Ver Curso'
                          )}
                        </span>
                        {course.isActive && isEnrolled && (
                          <>
                            <ArrowRightCircleIcon className="animate-bounce-right ml-1.5 size-5" />
                            <div className="absolute inset-0 flex w-full [transform:skew(-13deg)_translateX(-100%)] justify-center group-hover/button:[transform:skew(-13deg)_translateX(100%)] group-hover/button:duration-1000">
                              <div className="relative h-full w-10 bg-white/30" />
                            </div>
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
