'use client';

export default function Services() {
  const services = [
    {
      icon: 'fas fa-users-cog',
      title: 'Implementación de Nuevas Tecnologías Emergentes en la Educación',
      description:
        'Creemos que la educación es la base del progreso. Nos enfocamos en integrar las tecnologías más avanzadas en el ámbito educativo para mejorar la calidad del aprendizaje y fomentar una enseñanza más interactiva y efectiva por medio de nuestros cursos, diplomados y técnicos siendo dueños de instituciones de educación para el trabajo en todo el país.',
    },
    {
      icon: 'fas fa-book',
      title: 'Desarrollo y consultoría en Proyectos de Ciencia y Tecnología',
      description:
        'La ciencia y la tecnología son motores clave para el desarrollo sostenible. En CIADet, lideramos proyectos de investigación que buscan resolver problemas complejos y generar conocimientos nuevos. Colaboramos con universidades, instituciones de investigación y empresas para llevar a cabo estudios que contribuyan al avance científico y tecnológico.',
    },
    {
      icon: 'fas fa-laptop',
      title: 'Desarrollo de Software',
      description:
        'En el mundo digital actual, el software es fundamental para prácticamente todas las industrias. En CIADet, desarrollamos soluciones de software a medida que responden a las necesidades específicas de nuestros clientes. Nuestro equipo de expertos en desarrollo de software utiliza las últimas metodologías y tecnologías para crear aplicaciones robustas, seguras y escalables.',
    },
    {
      icon: 'fas fa-eye',
      title: 'Desarrollo de Tecnología Biomédica',
      description:
        'La salud y el bienestar son pilares esenciales de nuestra sociedad. En CIADET, trabajamos en el desarrollo de tecnologías biomédicas innovadoras que mejoran la calidad de vida de las personas. Desde dispositivos médicos avanzados hasta aplicaciones de salud digital, nuestros proyectos están diseñados para enfrentar los desafíos médicos más apremiantes y proporcionar soluciones efectivas.',
    },
    {
      icon: 'fas fa-robot',
      title: 'Desarrollo de Proyectos de Inteligencia Artificial',
      description:
        'La inteligencia artificial está revolucionando el mundo, y en CIADET estamos a la vanguardia de esta transformación. Desarrollamos proyectos de IA que abordan problemas en diversos sectores, desde la salud y la educación hasta la industria y los servicios. Utilizamos técnicas avanzadas de machine learning, deep learning y procesamiento de lenguaje natural para crear sistemas inteligentes que aprenden y se adaptan a las necesidades cambiantes.',
    },
    {
      icon: 'fas fa-user-edit',
      title: 'Contratación para el desarrollo social de las comunidades',
      description: '',
    },
  ];

  return (
    <section className="bg-gray-50 py-16" id="servicios">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
          Nuestros <span className="text-blue-600">Servicios</span>
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="animate-zoomIn rounded-lg bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <div className="mb-4 text-center">
                <i className={`${service.icon} text-4xl text-blue-600`} />
              </div>
              <h3 className="mb-4 text-center text-xl font-semibold">
                {service.title}
              </h3>
              <p className="text-center text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
