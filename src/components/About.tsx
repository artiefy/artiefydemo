'use client';

export default function About() {
  return (
    <section className="bg-gray-50 py-16" id="quienes-somos">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="mb-2 text-3xl font-bold">¿Quiénes Somos?</h2>
        <h3 className="mb-4 text-xl font-semibold">Bienvenidos a Ciadet!</h3>
        <p className="mb-6">
          Somos un centro de investigación y desarrollo tecnológico comprometido
          con la innovación y la excelencia.
        </p>
        <p className="mb-8">
          Nos dedicamos a la implementación de tecnologías emergentes en la
          educación, el desarrollo de proyectos de ciencia y tecnología, la
          creación de software avanzado, la innovación en tecnología biomédica y
          el desarrollo de soluciones de inteligencia artificial. Nuestro
          objetivo es transformar ideas visionarias en realidades prácticas que
          beneficien a la sociedad y potencien el conocimiento.
        </p>
        <a
          href="#quienes-somos"
          className="inline-block rounded-lg bg-blue-700 px-6 py-2 font-semibold text-white transition hover:bg-blue-800"
        >
          Ver más
        </a>
      </div>
    </section>
  );
}
