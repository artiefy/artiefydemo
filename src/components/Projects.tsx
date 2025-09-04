// Este componente ha sido eliminado y ya no se usa en la página principal.
import Image from 'next/image';

export default function Projects() {
  return (
    <section className="bg-white py-16" id="proyectos">
      <div className="container mx-auto text-center">
        <h2 className="mb-2 text-3xl font-bold">Nuestros Proyectos</h2>
        <p className="mx-auto mb-8 max-w-2xl">
          En el Ciadet, lideramos una variedad de proyectos innovadores que
          integran tecnologías de vanguardia en diferentes campos. Haciendo uso
          de las nuevas tecnologías emergentes para mejorar la sociedad, entre
          nuestros proyectos se encuentran Inteligencia Artificial en Ámbitos
          Hospitalarios y Financieros, Plataforma Educativa con Inteligencia
          Artificial para el desarrollo de proyecto, Impresión 3d con plástico
          reciclado, Tecnología para la Inclusión Educativa, Desarrollo de
          prótesis con inteligencia artificial.
        </p>
        <div className="mb-6 flex justify-center gap-6">
          <Image
            src="/ia-1-5.png"
            alt="ia 1 (5)"
            width={128}
            height={128}
            className="h-32 w-32 rounded-lg shadow"
            priority
          />
          <Image
            src="/ia-1-6.png"
            alt="ia 1 (6)"
            width={128}
            height={128}
            className="h-32 w-32 rounded-lg shadow"
            priority
          />
        </div>
        <a
          href="#proyectos"
          className="inline-block rounded-lg bg-blue-700 px-6 py-2 font-semibold text-white transition hover:bg-blue-800"
        >
          Ver más...
        </a>
      </div>
    </section>
  );
}
