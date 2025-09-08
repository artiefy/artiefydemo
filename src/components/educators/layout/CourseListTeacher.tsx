import Image from 'next/image';
import Link from 'next/link';

import { ArrowRightIcon, StarIcon } from '@heroicons/react/24/solid';

import { AspectRatio } from '~/components/educators/ui/aspect-ratio';
import { Badge } from '~/components/educators/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/educators/ui/card';
import { Button } from '~/components/estudiantes/ui/button';

// Interfaz para los cursos
interface Course {
  id: number;
  title: string;
  coverImageKey: string | null;
  categoryid: string;
  description: string;
  instructor: string;
  rating?: number;
  modalidadesid: string;
  nivelid: string;
  createdAt: string;
}

// Propiedades del componente para la lista de cursos
interface CourseListTeacherProps {
  courses: Course[];
}

export default function CourseListTeacher({ courses }: CourseListTeacherProps) {
  // Retorno la vista del componente que muestra la lista de cursos para los educadores en el dashboard
  return (
    <div className="grid grid-cols-1 gap-4 px-8 sm:grid-cols-2 lg:grid-cols-3 lg:px-2">
      {courses.map((course) => (
        <div key={course.id} className="group relative">
          <div className="animate-gradient absolute -inset-0.5 rounded-xl bg-linear-to-r from-[#3AF4EF] via-[#00BDD8] to-[#01142B] opacity-0 blur-sm transition duration-500 group-hover:opacity-100" />
          <Card className="zoom-in relative flex h-full flex-col justify-between overflow-hidden border-0 bg-gray-800 px-2 pt-2 text-white transition-transform duration-300 ease-in-out hover:scale-[1.02]">
            <CardHeader>
              <AspectRatio ratio={16 / 9}>
                <div className="relative size-full">
                  <Image
                    src={
                      course.coverImageKey
                        ? `${process.env.NEXT_PUBLIC_AWS_S3_URL}/${course.coverImageKey}`
                        : '/placeholder.svg'
                    }
                    alt={course.title || 'Imagen del curso'}
                    className="object-cover px-2 pt-2 transition-transform duration-300 hover:scale-105"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={75}
                  />
                </div>
              </AspectRatio>
            </CardHeader>

            <CardContent className="flex grow flex-col justify-between space-y-2 px-2">
              <CardTitle className="text-background rounded-lg text-lg">
                <div className="text-primary w-full font-bold">
                  {course.title}
                </div>
              </CardTitle>
              <div className="flex items-center">
                {' '}
                <Badge
                  variant="outline"
                  className="border-primary bg-background text-primary hover:bg-black/70"
                >
                  {course.categoryid}
                </Badge>
              </div>
              <p className="line-clamp-2 text-sm text-gray-300">
                Descripcion: {course.description}
              </p>
            </CardContent>
            <CardFooter className="flex flex-col items-start justify-between space-y-2 px-2">
              <div className="flex w-full justify-between">
                <p className="text-sm font-bold text-gray-300 italic">
                  Educador:{' '}
                  <span className="font-bold italic">{course.instructor}</span>
                </p>
                <p className="text-sm font-bold text-red-500">
                  {course.modalidadesid}
                </p>
              </div>
              <div className="flex w-full items-center justify-between">
                <Button asChild>
                  <Link
                    href={`/dashboard/educadores/cursos/${course.id}`}
                    className="group/button bg-background text-primary relative inline-flex items-center justify-center overflow-hidden rounded-md border border-white/20 p-2 active:scale-95"
                  >
                    <p className="font-bold">Ver Curso</p>
                    <ArrowRightIcon className="animate-bounce-right size-5" />
                    <div className="absolute inset-0 flex w-full [transform:skew(-13deg)_translateX(-100%)] justify-center group-hover/button:[transform:skew(-13deg)_translateX(100%)] group-hover/button:duration-1000">
                      <div className="relative h-full w-10 bg-white/30" />
                    </div>
                  </Link>
                </Button>
                <div className="flex items-center">
                  <StarIcon className="size-5 text-yellow-500" />
                  <span className="ml-1 text-sm font-bold text-yellow-500">
                    {(course.rating ?? 0).toFixed(1)}
                  </span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
}
