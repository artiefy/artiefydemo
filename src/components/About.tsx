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
      <div className="container mx-auto mt-8 max-w-3xl space-y-4 text-left">
        <h3 className="mb-4 text-xl font-semibold">Información de Contacto</h3>
        <div>
          <h4 className="text-lg font-bold">Ubicación</h4>
          <ul className="ml-6 list-disc">
            <li>Sede 1: calle 13 # 6-121 Jamundí</li>
            <li>
              Sede 2: Institución educativa Colegio España carrera 14 No. 12-11
            </li>
            <li>
              Punto de información universitario: Local 64 Centro Comercial Caña
              Dulce – Jamundí (carrera 10 entre calles 12 y 13)
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold">Correos institucionales</h4>
          <ul className="ml-6 list-disc">
            <li>ccoet0508@hotmail.com</li>
            <li>rectoria.ccoet@gmail.com</li>
            <li>Secretaria.ccoet@gmail.com</li>
            <li>Coordinaciónacademica.ccoet@gmail.com</li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold">Teléfonos de contacto</h4>
          <p>3154304204 - 3187571157</p>
          <h4 className="mt-2 text-lg font-bold">WhatsApp</h4>
          <p>3154304204 - 3187571157</p>
        </div>
        <div>
          <h4 className="text-lg font-bold">Horarios de atención</h4>
          <p>Semana: 08:00 a.m a 6:00 p.m</p>
          <p>Sábado: 08:00 a.m a 4:00 p.m</p>
        </div>
      </div>
    </section>
  );
}
