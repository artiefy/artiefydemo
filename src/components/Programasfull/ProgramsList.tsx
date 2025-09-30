'use client';

import React from 'react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '~/components/estudiantes/ui/card';
import { Skeleton } from '~/components/estudiantes/ui/skeleton';

import ProgramCard from './ProgramCard';

interface Category {
  name?: string;
}

interface ProgramItem {
  id: string;
  title: string;
  description?: string | null;
  coverImageKey?: string | null;
  category?: Category;
  rating?: number | null;
  totalStudents?: number;
}

interface ProgramsListProps {
  programs: ProgramItem[];
  loading?: boolean;
}

export default function ProgramsList({ programs, loading }: ProgramsListProps) {
  if (loading) {
    // Skeleton igual al diseño de la tarjeta
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="group relative m-2 sm:m-2">
            <div className="animate-gradient absolute -inset-1.5 rounded-lg bg-gradient-to-r from-violet-600 via-violet-400 to-violet-800 opacity-0 blur-[4px] transition duration-500 group-hover:opacity-100" />
            <Card className="relative flex h-full flex-col justify-between overflow-hidden border-0 bg-gray-800 text-white">
              <CardHeader className="-mb-2">
                <div className="relative aspect-video overflow-hidden">
                  <Skeleton className="bg-primary/20 absolute inset-0 h-full w-full rounded-lg" />
                </div>
              </CardHeader>
              <CardContent className="flex grow flex-col justify-between space-y-0.5 px-6 sm:space-y-4">
                <div className="flex min-h-[90px] flex-col space-y-2 sm:min-h-[120px] sm:space-y-4">
                  <Skeleton className="bg-primary/20 mb-2 h-5 w-2/3" />
                  <Skeleton className="bg-primary/10 h-4 w-full" />
                </div>
                <div className="-mt-2 flex items-center justify-between space-y-0 sm:-mt-4">
                  <Skeleton className="bg-primary/20 h-6 w-24 rounded" />
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Skeleton
                        key={idx}
                        className="bg-primary/10 h-4 w-4 rounded-full"
                      />
                    ))}
                    <Skeleton className="bg-primary/10 ml-1 h-4 w-8" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="-mt-4 px-6 pt-1 sm:-mt-2 sm:px-6">
                <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <Skeleton className="bg-primary/10 h-5 w-16" />
                  <Skeleton className="bg-primary/20 h-7 w-24 rounded" />
                </div>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    );
  }

  if (!programs.length)
    return (
      <div className="py-12 text-center">No hay programas disponibles.</div>
    );

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {programs.map((program) => (
        <ProgramCard key={program.id} program={program} />
      ))}
    </div>
  );
}
