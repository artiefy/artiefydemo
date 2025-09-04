'use client';

const services = [
  {
    icon: '👨‍💻',
    title: 'Implementación de Nuevas Tecnologías Emergentes en la Educación',
    desc: 'Integración de tecnologías avanzadas en el ámbito educativo para mejorar la calidad del aprendizaje y fomentar una enseñanza más interactiva y efectiva.',
  },
  {
    icon: '📚',
    title: 'Desarrollo y consultoría en Proyectos de Ciencia y Tecnología',
    desc: 'Lideramos proyectos de investigación que buscan resolver problemas complejos y generar conocimientos nuevos en colaboración con universidades e instituciones.',
  },
  {
    icon: '💻',
    title: 'Desarrollo de Software',
    desc: 'Creamos soluciones de software a medida, robustas, seguras y escalables, utilizando las últimas metodologías y tecnologías.',
  },
  {
    icon: '🧬',
    title: 'Desarrollo de Tecnología Biomédica',
    desc: 'Trabajamos en el desarrollo de tecnologías biomédicas innovadoras que mejoran la calidad de vida de las personas.',
  },
  {
    icon: '🤖',
    title: 'Desarrollo de Proyectos de Inteligencia Artificial',
    desc: 'Desarrollamos proyectos de IA que abordan problemas en diversos sectores, utilizando machine learning, deep learning y procesamiento de lenguaje natural.',
  },
  {
    icon: '📝',
    title: 'Contratación para el desarrollo social de las comunidades',
    desc: 'Experiencia en contratación estatal, desarrollando contratos del ICBF, licitaciones con alcaldías y contratos con la defensoría del pueblo.',
  },
];

export default function Services() {
  return (
    <section className="bg-white py-16" id="servicios">
      <div className="container mx-auto">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Nuestros Servicios
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {services.map((srv) => (
            <div
              key={srv.title}
              className="flex flex-col items-center rounded-lg bg-blue-50 p-6 text-center shadow transition hover:shadow-lg"
            >
              <div className="mb-3 text-4xl">{srv.icon}</div>
              <div className="mb-2 font-bold text-blue-900">{srv.title}</div>
              <div className="text-sm text-gray-700">{srv.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
