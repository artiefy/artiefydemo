'use client';
import Image from 'next/image';

const team = [
  {
    name: 'Pablo Enrique Chavarro Muñoz',
    role: 'Representante Legal',
    img: '/team/Teacher-1-2.jpg',
  },
  {
    name: 'Antonio Ruiz Cicery',
    role: 'Director General y Rector',
    img: '/team/rector.png',
  },
  {
    name: 'Juan Jose Ruiz Artunduaga',
    role: 'Director de Tecnologia e Investigación Academica',
    img: '/team/Teacher-3-2.jpg',
  },
  {
    name: 'Karol Gil Castillo',
    role: 'Investigación',
    img: '/team/Teacher-4-2.jpg',
  },
  {
    name: 'Odaris Sinisterra',
    role: 'Directora Buenaventura',
    img: '/team/Teacher-2-2.jpg',
  },
  {
    name: 'Richard Losada',
    role: 'Director Florencia',
    img: '/team/Teacher-6-2.jpg',
  },
  {
    name: 'Emilio Perlaza',
    role: 'Director Santander de Quilichao',
    img: '/team/Teacher-1-2.jpg',
  },
  {
    name: 'Katty Melo',
    role: 'Directora Tumaco',
    img: '/team/Teacher-5-2.jpg',
  },
  {
    name: 'Ingeniero Johan Stiven Garcia Conde',
    role: 'Director Leticia',
    img: '/team/Teacher-3-2.jpg',
  },
  {
    name: 'Alexandra Ospina',
    role: 'Profesora Adminitración y Contabilidad',
    img: '/team/Teacher-4-2.jpg',
  },
  {
    name: 'Johao Obdulio Valencia Gutierrez',
    role: 'Directora Buenaventura',
    img: '/team/Teacher-2-2.jpg',
  },
  {
    name: 'Alejandra Soto',
    role: 'Profesora Educación para la primera Infancia',
    img: '/team/Teacher-6-2.jpg',
  },
  {
    name: 'Laura Rubio Ruiz',
    role: 'Bienestar Estudiantil',
    img: '/team/Teacher-1-2.jpg',
  },
  {
    name: 'Eder Golu',
    role: 'Profesor de Energía Solar',
    img: '/team/Teacher-5-2.jpg',
  },
  {
    name: 'Jairzihno Cabera',
    role: 'Director Sede Santa Martha',
    img: '/team/Teacher-3-2.jpg',
  },
  {
    name: 'Diego Arturo',
    role: 'Profesor Programación de Software e iA',
    img: '/team/pr1.png',
  },
  {
    name: 'Hermes Torres',
    role: 'Director de Marketing y Ventas',
    img: '/team/pr1.png',
  },
];

export default function Team() {
  return (
    <section className="bg-white py-16" id="team">
      <div className="container mx-auto">
        <h2 className="mb-8 text-center text-3xl font-bold">Nuestro Equipo</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {team.map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center rounded-lg bg-gray-50 p-4 shadow"
            >
              <Image
                src={member.img}
                alt={member.name}
                width={96}
                height={96}
                className="mb-3 h-24 w-24 rounded-full border-4 border-blue-200 object-cover"
              />
              <div className="font-bold text-blue-900">{member.name}</div>
              <div className="text-sm text-gray-600">{member.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
