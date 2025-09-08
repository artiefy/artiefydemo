const numberPattern = /\d+/;

export const extractLessonOrder = (title: string): number => {
  // Use RegExp.exec() instead of String.match()
  const match = numberPattern.exec(title);
  return match ? parseInt(match[0], 10) : Number.MAX_SAFE_INTEGER;
};

export const extractNumbersFromTitle = (title: string) => {
  // Eliminar lógica especial para bienvenida/presentación
  // Solo usar el orden numérico

  // SESIÓN X: Clase Y: ...
  const sessionClassColon = /sesión\s*(\d+)\s*:\s*clase\s*(\d+)/i.exec(title);
  if (sessionClassColon) {
    return {
      session: parseInt(sessionClassColon[1], 10),
      class: parseInt(sessionClassColon[2], 10),
    };
  }

  // SESION X - Clase Y
  const sessionClassDash = /sesion\s*(\d+)\s*-\s*clase\s*(\d+)/i.exec(title);
  if (sessionClassDash) {
    return {
      session: parseInt(sessionClassDash[1], 10),
      class: parseInt(sessionClassDash[2], 10),
    };
  }

  // SESION X: ...
  const sessionOnly = /sesión\s*(\d+)/i.exec(title);
  if (sessionOnly) {
    return {
      session: parseInt(sessionOnly[1], 10),
      class: 0,
    };
  }

  // Clase Y: ...
  const classOnly = /clase\s*(\d+)/i.exec(title);
  if (classOnly) {
    return {
      session: 0,
      class: parseInt(classOnly[1], 10),
    };
  }

  // Default: put at the end
  return { session: 999, class: 999 };
};

export const sortLessons = <T extends { title: string }>(lessons: T[]): T[] => {
  return [...lessons].sort((a, b) => {
    const numbersA = extractNumbersFromTitle(a.title);
    const numbersB = extractNumbersFromTitle(b.title);

    if (numbersA.session !== numbersB.session) {
      return numbersA.session - numbersB.session;
    }
    return numbersA.class - numbersB.class;
  });
};
