'use client';

import { useEffect, useState } from 'react';

import { Users } from 'lucide-react';

import { getProgramEnrollmentCount } from '~/server/actions/estudiantes/programs/getProgramEnrollmentCount';

interface Props {
  programId: number;
}

export function EnrollmentCountSmall({ programId }: Props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      const enrollmentCount = await getProgramEnrollmentCount(programId);
      setCount(enrollmentCount);
    };

    void fetchCount();
  }, [programId]);

  return (
    <div className="inline-flex items-center gap-1 rounded bg-violet-500/10 px-2 py-1">
      <span className="text-sm font-semibold text-violet-500">{count}</span>
      <Users className="size-4 text-violet-500" />
      <span className="text-sm font-medium text-violet-500">Estudiantes</span>
    </div>
  );
}
