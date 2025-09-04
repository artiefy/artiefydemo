'use client';

const ofertaData: Record<
  string,
  { title: string; items: string[]; color: string }
> = {
  'diplomados-cursos': {
    title: 'Diplomados y Cursos',
    color: 'bg-blue-50',
    items: [
      'DIPLOMADO EN NEUROPSICOPEDAGOIA',
      'DIDACTICA DEL INGLES PARA EL PREESCOLAR',
      'MANTENIMIENTO Y REPARACION DE MOTOCICLETAS',
      'COPTELES CON BEBIDAS ANCESTRALES',
      'SEGURIDAD Y SALUD EN EL TRABAJO',
      'GESTION AMBIENTAL',
      'ADMINISTRACION PUBLICA',
      'CRIMINALISTICA E INVESTIGACION JUDICIAL',
    ],
  },
  'carreras-tecnicas': {
    title: 'Carreras técnicas',
    color: 'bg-green-50',
    items: [
      'TECNICO LABORAL EN ATENCION A LA PRIMERA INFANCIA',
      'TECNICO LABORAL EN ANIMACION, RECREACION Y DEPORTES',
      'TECNICO LABORAL EN ASISTENTE ADMINISTRATIVO',
      'TECNICO LABORAL EN AGENTE DE TRANSITO',
      'TECNICO LABORAL EN AUXILIAR CONTABLE DE TESORERIA Y FINANCIERO',
      'TECNICO LABORAL EN DISEÑO GRAFICO Y TRADE MARKETING',
      'TECNICO LABORAL EN ELECTRICISTA RESIDENCIAL',
      'TECNICO LABORAL EN DISEÑO DE APLICACIONES DIGITALES',
      'TECNICO LABORAL EN SISTEMAS INFORMATICOS',
    ],
  },
  tecnologias: {
    title: 'Tecnologías',
    color: 'bg-yellow-50',
    items: [
      'Tecnología en Desarrollo de Software',
      'Tecnología en Gestión Ambiental',
      'Tecnología en Energía Renovable',
    ],
  },
  pregrados: {
    title: 'Pregrados',
    color: 'bg-purple-50',
    items: [
      'Ingeniería de Sistemas',
      'Administración de Empresas',
      'Psicología',
    ],
  },
  posgrados: {
    title: 'Posgrados',
    color: 'bg-pink-50',
    items: [
      'Especialización en Gerencia de Proyectos',
      'Especialización en Educación',
    ],
  },
  maestrias: {
    title: 'Maestrías',
    color: 'bg-indigo-50',
    items: ['Maestría en Inteligencia Artificial', 'Maestría en Educación'],
  },
  doctorados: {
    title: 'Doctorados',
    color: 'bg-red-50',
    items: [
      'Doctorado en Ciencias de la Computación',
      'Doctorado en Educación',
    ],
  },
};

export default function OfertaDetalle({ category }: { category: string }) {
  const data = ofertaData[category];
  if (!data) {
    return (
      <section className="bg-gray-100 py-16 text-center">
        <h2 className="mb-4 text-2xl font-bold">Categoría no encontrada</h2>
        <p>Por favor selecciona una categoría válida.</p>
      </section>
    );
  }
  return (
    <section className={`py-16 ${data.color}`}>
      <div className="container mx-auto text-center">
        <h2 className="mb-8 text-4xl font-extrabold drop-shadow-lg">
          {data.title}
        </h2>
        <div className="grid grid-cols-1 justify-center gap-8 sm:grid-cols-2 md:grid-cols-3">
          {data.items.map((item) => (
            <div
              key={item}
              className="rounded-xl bg-white p-8 font-semibold text-blue-900 shadow-lg transition-all duration-300 hover:scale-105"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
