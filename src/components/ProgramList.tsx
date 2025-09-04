'use client';

const tecnicos = [
  'TECNICO LABORAL EN ATENCION A LA PRIMERA INFANCIA',
  'TECNICO LABORAL EN ANIMACION, RECREACION Y DEPORTES',
  'TECNICO LABORAL EN ASISTENTE ADMINISTRATIVO',
  'TECNICO LABORAL EN AGENTE DE TRANSITO',
  'TECNICO LABORAL EN AUXILIAR CONTABLE DE TESORERIA Y FINANCIERO',
  'TECNICO LABORAL EN DISEÑO GRAFICO Y TRADE MARKETING',
  'TECNICO LABORAL EN ELECTRICISTA RESIDENCIAL',
  'TECNICO LABORAL EN DISEÑO DE APLICACIONES DIGITALES',
  'TECNICO LABORAL EN SISTEMAS INFORMATICOS',
];

const cursos = [
  'DIPLOMADO EN NEUROPSICOPEDAGOIA',
  'DIDACTICA DEL INGLES PARA EL PREESCOLAR',
  'MANTENIMIENTO Y REPARACION DE MOTOCICLETAS',
  'COPTELES CON BEBIDAS ANCESTRALES',
  'SEGURIDAD Y SALUD EN EL TRABAJO',
  'GESTION AMBIENTAL',
  'ADMINISTRACION PUBLICA',
  'CRIMINALISTICA E INVESTIGACION JUDICIAL',
];

export default function ProgramList() {
  return (
    <section className="bg-gray-50 py-16" id="oferta">
      <div className="container mx-auto text-center">
        <h2 className="mb-2 text-3xl font-bold">OFERTA ACADÉMICA</h2>
        <h3 className="mb-6 text-xl font-semibold">
          Educación para adultos - Bachillerato por Ciclos
        </h3>
        <h3 className="mb-6 text-xl font-semibold">
          Formación para el Trabajo y Desarrollo Humano
        </h3>
        <div className="mx-auto mb-10 max-w-5xl">
          <h4 className="mb-2 font-bold">Técnicos laborales</h4>
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {tecnicos.map((prog) => (
              <div
                key={prog}
                className="rounded-lg bg-blue-100 p-4 font-medium text-blue-800 shadow transition hover:scale-105"
              >
                {prog}
              </div>
            ))}
          </div>
          <h4 className="mb-2 font-bold">Cursos y Diplomados</h4>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {cursos.map((curso) => (
              <div
                key={curso}
                className="rounded-lg bg-green-100 p-4 font-medium text-green-900 shadow transition hover:scale-105"
              >
                {curso}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
