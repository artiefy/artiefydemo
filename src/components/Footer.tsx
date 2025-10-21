'use client';

import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

export function FooterWhite() {
  return (
    <footer className="mt-12 border-t border-blue-800 bg-white pt-12 pb-6">
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
            <div className="mt-2 flex gap-3">
              <a
                href="https://www.facebook.com/CiadetColombia"
                target="_blank"
                rel="noopener"
                aria-label="Facebook"
              >
                <FaFacebook className="h-5 w-5 fill-current hover:text-white" />
              </a>
              <a
                href="https://twitter.com/ciadet_edu"
                target="_blank"
                rel="noopener"
                aria-label="Twitter"
              >
                <FaTwitter className="h-5 w-5 fill-current hover:text-white" />
              </a>
              <a
                href="https://www.instagram.com/ciadet_edu/"
                target="_blank"
                rel="noopener"
                aria-label="Instagram"
              >
                <FaInstagram className="h-5 w-5 fill-current hover:text-white" />
              </a>
              <a
                href="https://www.linkedin.com/company/ciadet/"
                target="_blank"
                rel="noopener"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-5 w-5 fill-current hover:text-white" />
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
                <FaFacebook className="h-5 w-5 fill-current hover:text-white" />
              </a>
              <a
                href="https://twitter.com/ciadet_edu"
                target="_blank"
                rel="noopener"
                aria-label="Twitter"
              >
                <FaTwitter className="h-5 w-5 fill-current hover:text-white" />
              </a>
              <a
                href="https://www.instagram.com/ciadet_edu/"
                target="_blank"
                rel="noopener"
                aria-label="Instagram"
              >
                <FaInstagram className="h-5 w-5 fill-current hover:text-white" />
              </a>
              <a
                href="https://www.linkedin.com/company/ciadet/"
                target="_blank"
                rel="noopener"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-5 w-5 fill-current hover:text-white" />
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
