-- 6. Insertar cursos de ejemplo
INSERT INTO courses (
    title, 
    description, 
    cover_image_key, 
    cover_video_course_key,
    categoryid, 
    instructor, 
    creator_id, 
    rating, 
    modalidadesid, 
    nivelid, 
    course_type_id, 
    individual_price, 
    requires_program, 
    is_active, 
    is_featured, 
    is_top
) VALUES
('Introducción a la Programación con Python', 'Aprende los fundamentos de la programación utilizando Python. Ideal para principiantes que quieren iniciar en el mundo del desarrollo de software.', NULL, NULL, 1, 'user_educador_demo', 'user_educador_demo', 4.8, 1, 1, 1, NULL, false, true, true, true),
('Diseño Gráfico Digital con Adobe Creative Suite', 'Domina las herramientas profesionales de diseño gráfico. Aprende Photoshop, Illustrator e InDesign desde cero hasta nivel avanzado.', NULL, NULL, 3, 'user_educador_demo', 'user_educador_demo', 4.6, 2, 2, 4, 75000, false, true, true, true),
('Fundamentos de Administración de Empresas', 'Conoce los principios básicos de la administración empresarial. Planificación, organización, dirección y control de organizaciones.', NULL, NULL, 2, 'user_educador_demo', 'user_educador_demo', 4.4, 3, 1, 2, NULL, false, true, false, true),
('Marketing Digital y Redes Sociales', 'Estrategias avanzadas de marketing digital. SEO, SEM, redes sociales, email marketing y analítica web para impulsar tu negocio.', NULL, NULL, 4, 'user_educador_demo', 'user_educador_demo', 4.7, 1, 3, 3, NULL, false, true, true, true),
('Desarrollo Web Full Stack con React y Node.js', 'Conviértete en desarrollador full stack. Aprende React, Node.js, Express, MongoDB y todas las tecnologías modernas del desarrollo web.', NULL, NULL, 1, 'user_educador_demo', 'user_educador_demo', 4.9, 1, 3, 4, 120000, false, true, true, true),
('Primeros Auxilios y Atención Básica de Emergencias', 'Aprende técnicas de primeros auxilios y atención básica en situaciones de emergencia. Certificación válida a nivel nacional.', NULL, NULL, 5, 'user_educador_demo', 'user_educador_demo', 4.5, 2, 1, 1, NULL, false, true, false, false);

-- 8. Insertar programas de ejemplo (debe ir antes que materias)
INSERT INTO programas (
    title, 
    description, 
    cover_image_key, 
    creator_id, 
    rating, 
    categoryid, 
    price
) VALUES
('Técnico en Desarrollo de Software', 'Programa técnico completo para formar desarrolladores de software competentes en el mercado laboral actual.', NULL, 'user_educador_demo', 4.7, 1, 500000),
('Técnico en Diseño Gráfico Digital', 'Formación técnica integral en diseño gráfico digital con herramientas profesionales de la industria.', NULL, 'user_educador_demo', 4.5, 3, 450000);

-- 9. Insertar materias para los programas (después de programas y cursos)
INSERT INTO materias (title, description, programa_id, courseid) VALUES
('Programación Básica', 'Fundamentos de programación con Python', 1, 1),
('Desarrollo Web', 'Desarrollo web full stack', 1, 5),
('Diseño Digital', 'Diseño gráfico con herramientas digitales', 2, 2);
