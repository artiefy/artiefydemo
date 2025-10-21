'use client';

export default function FooterPrograms() {
  return (
    <footer className="bg-background mt-12 border-t pt-12 pb-6">
      <div className="container mx-auto grid grid-cols-1 gap-10 px-4 text-sm md:grid-cols-3">
        <div>
          <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-[#01142B]">
            <span role="img" aria-label="Ubicación">
              📍
            </span>{' '}
            Ubicación
          </h3>
          <ul className="space-y-1">
            <li className="text-[#01142B]">Sede 1: calle 13 # 6-121 Jamundí</li>
            <li className="text-[#01142B]">
              Sede 2: Institución educativa Colegio España carrera 14 No. 12-11
            </li>
            <li className="text-[#01142B]">
              Punto de información universitario: Local 64 Centro Comercial Caña
              Dulce – Jamundí (carrera 10 entre calles 12 y 13)
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-[#01142B]">
            <span role="img" aria-label="Correo">
              ✉️
            </span>{' '}
            Correos institucionales
          </h3>
          <ul className="space-y-1">
            <li className="text-[#01142B]">ccoet0508@hotmail.com</li>
            <li className="text-[#01142B]">rectoria.ccoet@gmail.com</li>
            <li className="text-[#01142B]">Secretaria.ccoet@gmail.com</li>
            <li className="text-[#01142B]">
              Coordinaciónacademica.ccoet@gmail.com
            </li>
          </ul>
          <h3 className="mt-5 mb-2 flex items-center gap-2 text-lg font-bold text-[#01142B]">
            <span role="img" aria-label="Teléfono">
              📞
            </span>{' '}
            Teléfonos
          </h3>
          <p className="text-[#01142B]">3154304204 - 3187571157</p>
          <h3 className="mt-4 mb-2 flex items-center gap-2 text-lg font-bold text-[#01142B]">
            <span role="img" aria-label="WhatsApp">
              💬
            </span>{' '}
            WhatsApp
          </h3>
          <p className="text-[#01142B]">3154304204 - 3187571157</p>
        </div>
        <div>
          <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-[#01142B]">
            <span role="img" aria-label="Horario">
              ⏰
            </span>{' '}
            Horarios de atención
          </h3>
          <ul className="space-y-1">
            <li className="text-[#01142B]">Semana: 08:00 a.m a 6:00 p.m</li>
            <li className="text-[#01142B]">Sábado: 08:00 a.m a 4:00 p.m</li>
          </ul>
          <div className="mt-8 flex flex-col items-start gap-2">
            <span className="text-xs text-[#01142B]">
              © 2024 CCOET | Diseño y Desarrollo{' '}
              <a
                href="http://www.webseo.com.co"
                target="_blank"
                rel="noopener"
                className="underline hover:text-white"
              >
                www.webseo.com.co
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
