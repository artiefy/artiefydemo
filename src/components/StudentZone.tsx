'use client';

export default function StudentZone() {
  return (
    <section className="bg-blue-50 py-16" id="estudiantes">
      <div className="container mx-auto text-center">
        <h2 className="mb-2 text-3xl font-bold">ZONA ESTUDIANTES</h2>
        <p className="mx-auto mb-6 max-w-xl">
          Contamos con la plataforma q10, para que accedas a todo el contenido
          de tus programas y revises las grabaciones de las clases, en el ciadet
          queremos estar en la vanguardia de la educación.
        </p>
        <a
          href="#estudiantes"
          className="inline-block rounded-lg bg-blue-700 px-6 py-2 font-semibold text-white transition hover:bg-blue-800"
        >
          Ingresar
        </a>
      </div>
    </section>
  );
}
