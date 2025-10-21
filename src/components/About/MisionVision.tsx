'use client';

export default function MisionVision() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="animate-slideInLeft">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Nuestra <span className="text-blue-600">Misión</span>
            </h2>
            <p className="text-base leading-relaxed text-gray-700 md:text-lg">
              Generar conocimiento y desarrollo tecnológico de la investigación
              en los campos de las ciencias empiricoanaliticas, histórico
              hermenéuticas y critico-sociales en concordancia con el sistema
              nacional de ciencia, tecnología e innovación- SNCTI- con las
              necesidades del país, especialmente del occidente colombiano, como
              también fomentar la educación en todos los niveles de formación.
            </p>
          </div>
          <div className="animate-slideInRight">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Nuestra <span className="text-blue-600">Visión</span>
            </h2>
            <p className="text-base leading-relaxed text-gray-700 md:text-lg">
              El Centro de Investigación Académica Y Desarrollo Tecnológico Del
              Occidente Colombiano “Jorge Eliecer Gaitán” se convertirá en el
              año 2035, en uno de los centros de investigación privados mas
              importantes del occidente colombiano, con investigadores y grupos
              de investigación de altísima producción investigativa con
              incidencia en la región y en el pais.
              <br />
              <br />
              Tenemos mas de 14 años de experiencia en la educación y la
              contratación estatal.
              <br />
              <br />
              Graduando a mas de 40 mil estudiantes en todo el territorio
              colombiano.
              <br />
              <br />
              Tenemos experiencia en la contratación estatal, desarrollando
              contratos del icbf, licitaciones con alcaldías municipales y
              contratos con la defensoría del pueblo
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
