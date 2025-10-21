import Image from 'next/image';

export default function VisionSection() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div className="animate-slideInLeft hidden md:block">
            <Image
              src="https://ciadet.co/wp-content/uploads/2024/08/persona-trabajando-html-computadora-1024x768.jpg"
              alt="Persona trabajando en computadora"
              width={960}
              height={720}
              className="h-auto w-full rounded-lg shadow-md"
            />
          </div>
          <div className="animate-slideInRight">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Nuestra visión{' '}
              <span className="text-blue-600">Educación para todos</span>
            </h2>
            <p className="text-base leading-relaxed text-gray-700 md:text-lg">
              Somos un centro de investigación y desarrollo tecnológico
              comprometido con la innovación y la excelencia. Nos dedicamos a la
              implementación de tecnologías emergentes en la educación, el
              desarrollo de proyectos de ciencia y tecnología, la creación de
              software avanzado, la innovación en tecnología biomédica y el
              desarrollo de soluciones de inteligencia artificial. Nuestro
              objetivo es transformar ideas visionarias en realidades prácticas
              que beneficien a la sociedad y potencien el conocimiento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
