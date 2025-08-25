'use client';

const categories = [
  'All Posts',
  'Ciadet',
  'Innovación',
  'Proyectos',
  'Sin categoría',
];

export default function BlogSection() {
  return (
    <section className="bg-white py-16" id="blog">
      <div className="container mx-auto text-center">
        <h2 className="mb-2 text-3xl font-bold">Blog</h2>
        <h3 className="mb-6 text-xl font-semibold">Noticias y blogs</h3>
        <div className="mb-8 flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <span
              key={cat}
              className="rounded-full bg-blue-100 px-4 py-2 font-medium text-blue-700"
            >
              {cat}
            </span>
          ))}
        </div>
        <div className="text-gray-500">Aquí irán las entradas del blog...</div>
      </div>
    </section>
  );
}
