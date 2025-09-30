'use client';

export function FooterWhite() {
  return (
    <footer className="mt-12 border-t border-blue-800 bg-white pt-12 pb-6 text-gray-900">
      <div className="container mx-auto grid grid-cols-1 gap-10 px-4 text-sm md:grid-cols-3">
        <div>
          <h3 className="mb-3 flex items-center gap-2 text-lg font-bold">
            <span role="img" aria-label="Ubicación">
              📍
            </span>{' '}
            Ubicación
          </h3>
          <ul className="space-y-1">
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
          <h3 className="mb-3 flex items-center gap-2 text-lg font-bold">
            <span role="img" aria-label="Correo">
              ✉️
            </span>{' '}
            Correos institucionales
          </h3>
          <ul className="space-y-1">
            <li>ccoet0508@hotmail.com</li>
            <li>rectoria.ccoet@gmail.com</li>
            <li>Secretaria.ccoet@gmail.com</li>
            <li>Coordinaciónacademica.ccoet@gmail.com</li>
          </ul>
          <h3 className="mt-5 mb-2 flex items-center gap-2 text-lg font-bold">
            <span role="img" aria-label="Teléfono">
              📞
            </span>{' '}
            Teléfonos
          </h3>
          <p>3154304204 - 3187571157</p>
          <h3 className="mt-4 mb-2 flex items-center gap-2 text-lg font-bold">
            <span role="img" aria-label="WhatsApp">
              💬
            </span>{' '}
            WhatsApp
          </h3>
          <p>3154304204 - 3187571157</p>
        </div>
        <div>
          <h3 className="mb-3 flex items-center gap-2 text-lg font-bold">
            <span role="img" aria-label="Horario">
              ⏰
            </span>{' '}
            Horarios de atención
          </h3>
          <ul className="space-y-1">
            <li>Semana: 08:00 a.m a 6:00 p.m</li>
            <li>Sábado: 08:00 a.m a 4:00 p.m</li>
          </ul>
          <div className="mt-8 flex flex-col items-start gap-2">
            <span className="text-xs text-gray-300">
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
            <div className="mt-2 flex gap-3">
              <a
                href="https://www.facebook.com/CiadetColombia"
                target="_blank"
                rel="noopener"
                aria-label="Facebook"
              >
                <svg
                  className="h-5 w-5 fill-current hover:text-white"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0h-21.35C.597 0 0 .592 0 1.326v21.348C0 23.408.597 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.403 24 24 23.408 24 22.674V1.326C24 .592 23.403 0 22.675 0" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/ciadet_edu/"
                target="_blank"
                rel="noopener"
                aria-label="Instagram"
              >
                <svg
                  className="h-5 w-5 fill-current hover:text-white"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.011 3.584-.069 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.011-4.85-.069c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.771.128 4.659.334 3.608 1.384 2.558 2.434 2.352 3.546 2.294 4.827 2.236 6.107 2.224 6.516 2.224 12s.012 5.893.07 7.173c.058 1.281.264 2.393 1.314 3.443 1.05 1.05 2.162 1.256 3.443 1.314C8.332 23.988 8.741 24 12 24s3.668-.012 4.948-.07c1.281-.058 2.393-.264 3.443-1.314 1.05-1.05 1.256-2.162 1.314-3.443.058-1.28.07-1.689.07-7.173s-.012-5.893-.07-7.173c-.058-1.281-.264-2.393-1.314-3.443C19.341.334 18.229.128 16.948.07 15.668.012 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/ciadet/"
                target="_blank"
                rel="noopener"
                aria-label="LinkedIn"
              >
                <svg
                  className="h-5 w-5 fill-current hover:text-white"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.3c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.3h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.38v4.59h-3v-9h2.88v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function FooterBackground() {
  return (
    <footer className="mt-12 border-t border-blue-800 bg-[#01142B] pt-12 pb-6 text-white">
      <div className="container mx-auto grid grid-cols-1 gap-10 px-4 text-sm md:grid-cols-3">
        <div>
          <h3 className="mb-3 flex items-center gap-2 text-lg font-bold">
            <span role="img" aria-label="Ubicación">
              📍
            </span>{' '}
            Ubicación
          </h3>
          <ul className="space-y-1">
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
          <h3 className="mb-3 flex items-center gap-2 text-lg font-bold">
            <span role="img" aria-label="Correo">
              ✉️
            </span>{' '}
            Correos institucionales
          </h3>
          <ul className="space-y-1">
            <li>ccoet0508@hotmail.com</li>
            <li>rectoria.ccoet@gmail.com</li>
            <li>Secretaria.ccoet@gmail.com</li>
            <li>Coordinaciónacademica.ccoet@gmail.com</li>
          </ul>
          <h3 className="mt-5 mb-2 flex items-center gap-2 text-lg font-bold">
            <span role="img" aria-label="Teléfono">
              📞
            </span>{' '}
            Teléfonos
          </h3>
          <p>3154304204 - 3187571157</p>
          <h3 className="mt-4 mb-2 flex items-center gap-2 text-lg font-bold">
            <span role="img" aria-label="WhatsApp">
              💬
            </span>{' '}
            WhatsApp
          </h3>
          <p>3154304204 - 3187571157</p>
        </div>
        <div>
          <h3 className="mb-3 flex items-center gap-2 text-lg font-bold">
            <span role="img" aria-label="Horario">
              ⏰
            </span>{' '}
            Horarios de atención
          </h3>
          <ul className="space-y-1">
            <li>Semana: 08:00 a.m a 6:00 p.m</li>
            <li>Sábado: 08:00 a.m a 4:00 p.m</li>
          </ul>
          <div className="mt-8 flex flex-col items-start gap-2">
            <span className="text-xs text-gray-300">
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
            <div className="mt-2 flex gap-3">
              <a
                href="https://www.facebook.com/CiadetColombia"
                target="_blank"
                rel="noopener"
                aria-label="Facebook"
              >
                <svg
                  className="h-5 w-5 fill-current hover:text-white"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0h-21.35C.597 0 0 .592 0 1.326v21.348C0 23.408.597 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.403 24 24 23.408 24 22.674V1.326C24 .592 23.403 0 22.675 0" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/ciadet_edu/"
                target="_blank"
                rel="noopener"
                aria-label="Instagram"
              >
                <svg
                  className="h-5 w-5 fill-current hover:text-white"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.011 3.584-.069 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.011-4.85-.069c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.771.128 4.659.334 3.608 1.384 2.558 2.434 2.352 3.546 2.294 4.827 2.236 6.107 2.224 6.516 2.224 12s.012 5.893.07 7.173c.058 1.281.264 2.393 1.314 3.443 1.05 1.05 2.162 1.256 3.443 1.314C8.332 23.988 8.741 24 12 24s3.668-.012 4.948-.07c1.281-.058 2.393-.264 3.443-1.314 1.05-1.05 1.256-2.162 1.314-3.443.058-1.28.07-1.689.07-7.173s-.012-5.893-.07-7.173c-.058-1.281-.264-2.393-1.314-3.443C19.341.334 18.229.128 16.948.07 15.668.012 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/ciadet/"
                target="_blank"
                rel="noopener"
                aria-label="LinkedIn"
              >
                <svg
                  className="h-5 w-5 fill-current hover:text-white"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.3c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.3h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.38v4.59h-3v-9h2.88v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Para uso global, puedes exportar uno como default (el blanco)
export default FooterWhite;
