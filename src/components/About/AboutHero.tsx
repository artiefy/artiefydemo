'use client';

export default function AboutHero() {
  return (
    <section className="bg-gradient-to-br from-blue-900 to-blue-700 py-16 text-white">
      <div className="container mx-auto text-center">
        <h1 className="mb-4 text-4xl font-extrabold md:text-6xl">
          Acerca de <span className="text-blue-200">Nosotros</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg md:text-2xl">
          Somos un centro de investigación y desarrollo tecnológico comprometido
          con la innovación y la excelencia. Nos dedicamos a la implementación
          de tecnologías emergentes en la educación, el desarrollo de proyectos
          de ciencia y tecnología, la creación de software avanzado, la
          innovación en tecnología biomédica y el desarrollo de soluciones de
          inteligencia artificial.
        </p>
      </div>
    </section>
  );
}
