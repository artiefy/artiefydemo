'use client';
import Image from 'next/image';

export default function Team() {
  const team = [
    {
      name: 'Pablo Enrique Chavarro Muñoz',
      role: 'Representante Legal',
      img: 'https://ciadet.co/wp-content/uploads/2024/08/Teacher-1-2.jpg',
    },
    {
      name: 'Antonio Ruiz Cicery',
      role: 'Director General y Rector',
      img: 'https://ciadet.co/wp-content/uploads/2024/08/rector.png',
    },
    {
      name: 'Juan Jose Ruiz Artunduaga',
      role: 'Director de Tecnologia e Investigación Academica',
      img: 'https://ciadet.co/wp-content/uploads/2024/08/Teacher-3-2.jpg',
    },
    {
      name: 'Karol Gil Castillo',
      role: 'Investigación',
      img: 'https://ciadet.co/wp-content/uploads/2024/08/Teacher-4-2.jpg',
    },
    {
      name: 'Odaris Sinisterra',
      role: 'Directora Buenaventura',
      img: 'https://ciadet.co/wp-content/uploads/2024/08/Teacher-2-2.jpg',
    },
    {
      name: 'Richard Losada',
      role: 'Director Florencia',
      img: 'https://ciadet.co/wp-content/uploads/2024/08/Teacher-6-2.jpg',
    },
    {
      name: 'Emilio Perlaza',
      role: 'Drector Santander de Quilichao',
      img: 'https://ciadet.co/wp-content/uploads/2024/08/Teacher-1-2.jpg',
    },
    {
      name: 'Katty Melo',
      role: 'Directora Tumaco',
      img: 'https://ciadet.co/wp-content/uploads/2024/08/Teacher-5-2.jpg',
    },
    {
      name: 'Ingeniero Johan Stiven Garcia Conde',
      role: 'Director Leticia',
      img: 'https://ciadet.co/wp-content/uploads/2024/08/Teacher-3-2.jpg',
    },
    {
      name: 'Alexandra Ospina',
      role: 'Profesora Adminitración y Contabilidad',
      img: 'https://ciadet.co/wp-content/uploads/2024/08/Teacher-4-2.jpg',
    },
    {
      name: 'Johao Obdulio Valencia Gutierrez',
      role: 'Directora Buenaventura',
      img: 'https://ciadet.co/wp-content/uploads/2024/08/Teacher-2-2.jpg',
    },
    {
      name: 'Alejandra Soto',
      role: 'Profesora Educación para la primera Infancia',
      img: 'https://ciadet.co/wp-content/uploads/2024/08/Teacher-6-2.jpg',
    },
    {
      name: 'Laura Rubio Ruiz',
      role: 'Bienestar Estudiantil',
      img: 'https://ciadet.co/wp-content/uploads/2024/08/Teacher-1-2.jpg',
    },
    {
      name: 'Eder Golu',
      role: 'Profesor de Energía Solar',
      img: 'https://ciadet.co/wp-content/uploads/2024/08/Teacher-5-2.jpg',
    },
    {
      name: 'Jairzihno Cabera',
      role: 'Director Sede Santa Martha',
      img: 'https://ciadet.co/wp-content/uploads/2024/08/Teacher-3-2.jpg',
    },
    {
      name: 'Diego Arturo',
      role: 'Profesor Programación de Software e iA',
      img: 'https://ciadet.co/wp-content/uploads/2024/08/pr1.png',
    },
    {
      name: 'Hermes Torres',
      role: 'Director de Marketing y Ventas',
      img: 'https://ciadet.co/wp-content/uploads/2024/08/pr1.png',
    },
  ];

  return (
    <section className="bg-gray-50 py-16" id="team">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl">
          Mentores del curso
        </h2>
        <p className="mb-12 text-center text-base md:text-lg">
          Asesores de instrucción
          <br />
          Contamos con un excelente grupo de profesionales educadores, que
          cumplen a cabalidad el compromiso con nuestros estudiantes
        </p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {team.map((member, index) => (
            <div
              key={index}
              className="animate-zoomIn rounded-lg bg-white p-6 text-center shadow-md"
            >
              <Image
                src={member.img}
                alt={member.name}
                width={96}
                height={96}
                className="mx-auto mb-4 rounded-full"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
