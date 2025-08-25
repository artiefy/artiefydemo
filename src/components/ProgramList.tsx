'use client';

const programs = [
  'Diplomados y Cursos',
  'Carreras técnicas',
  'Tecnologías',
  'Pregrados',
  'Posgrados',
  'Maestrías',
  'Doctorados',
];

export default function ProgramList() {
  return (
    <section className="bg-gray-50 py-16" id="oferta">
      <div className="container mx-auto text-center">
        <h2 className="mb-2 text-3xl font-bold">Nuestros Programas</h2>
        <h3 className="mb-6 text-xl font-semibold">Oferta Educativa</h3>
        <p className="mx-auto mb-10 max-w-2xl">
          El Ciadet cuenta con cursos, diplomados, carreras técnicas laborales y
          con alianzas para que puedas homologar y continuar tus estudios
          profesionales tanto en pregrados como postgrados, presiona el botón
          para conocer más de nuestra amplia oferta educativa.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {programs.map((prog) => (
            <div
              key={prog}
              className="w-64 rounded-lg bg-white p-6 font-medium text-blue-800 shadow transition hover:scale-105"
            >
              {prog}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
