'use client';

const stats = [
  { label: 'Estudiantes graduados', value: '40', suffix: 'k' },
  { label: 'Programas educativos', value: '50', suffix: '+' },
  { label: 'Docentes', value: '30', suffix: '' },
  { label: 'Satisfacción', value: '100', suffix: '%' },
];

export default function Stats() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto flex flex-wrap justify-center gap-10">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-5xl font-extrabold text-blue-700">
              {stat.value}
              <span className="text-2xl font-bold">{stat.suffix}</span>
            </div>
            <div className="mt-2 text-lg text-gray-700">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
