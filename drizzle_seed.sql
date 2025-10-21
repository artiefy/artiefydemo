-- 1. Categorías
INSERT INTO categories (name, description, is_featured) VALUES
  ('Tecnología', 'Tecnología', true),
  ('Matemáticas', 'Matemáticas', true),
  ('Diseño', 'Diseño', true),
  ('Marketing', 'Marketing', false),
  ('Bases de Datos', 'Bases de Datos', false),
  ('Machine Learning', 'Machine Learning', true);

-- 2. Modalidades
INSERT INTO modalidades (name, description) VALUES
  ('Presencial', 'Clases presenciales'),
  ('Virtual', 'Clases virtuales'),
  ('Combinada', 'Clases mixtas');

-- 3. Niveles
INSERT INTO nivel (name, description) VALUES
  ('Básico', 'Nivel básico'),
  ('Intermedio', 'Nivel intermedio'),
  ('Avanzado', 'Nivel avanzado');

-- 4. Tipos de curso (planes)
INSERT INTO course_types (name, description, required_subscription_level, is_purchasable_individually, price, created_at, updated_at) VALUES
  ('Premium', 'Acceso total', 'premium', true, 50000, NOW(), NOW()),
  ('Pro', 'Acceso profesional', 'pro', true, 30000, NOW(), NOW()),
  ('Enterprise', 'Acceso empresarial', 'enterprise', true, 100000, NOW(), NOW());

-- 5. Usuarios reales (admins y educadores)
INSERT INTO users (id, role, name, email, created_at, updated_at, subscription_status)
VALUES
  ('admin1', 'admin', 'Ana María Torres', 'ana.torres@demo.com', NOW(), NOW(), 'active'),
  ('admin2', 'super-admin', 'Carlos Ramírez', 'carlos.ramirez@demo.com', NOW(), NOW(), 'active'),
  ('edu1', 'educador', 'Luis Gómez', 'luis.gomez@demo.com', NOW(), NOW(), 'active'),
  ('edu2', 'educador', 'María Fernanda López', 'maria.lopez@demo.com', NOW(), NOW(), 'active'),
  ('edu3', 'educador', 'Jorge Martínez', 'jorge.martinez@demo.com', NOW(), NOW(), 'active');

-- 6. Cursos con nombres reales y técnicos
INSERT INTO courses (title, description, cover_image_key, categoryid, instructor, created_at, updated_at, creator_id, rating, modalidadesid, nivelid, course_type_id, individual_price, requires_program, is_active, is_top, is_featured)
VALUES
  ('Matemáticas Financieras', 'Curso sobre matemáticas aplicadas a finanzas', NULL, 1, 'Luis Gómez', NOW(), NOW(), 'edu1', 4.7, 1, 2, 1, 25000, false, true, true, true),
  ('Biología Celular', 'Estudio de la célula y sus funciones', NULL, 2, 'María Fernanda López', NOW(), NOW(), 'edu2', 4.5, 2, 1, 2, 22000, false, true, false, false),
  ('Programación Web con JavaScript', 'Desarrollo web moderno con JS', NULL, 3, 'Jorge Martínez', NOW(), NOW(), 'edu3', 4.8, 2, 2, 2, 30000, false, true, true, true),
  ('Historia del Arte Universal', 'Recorrido por la historia del arte', NULL, 4, 'Luis Gómez', NOW(), NOW(), 'edu1', 4.3, 3, 1, 3, 18000, false, true, false, false),
  ('Inglés Técnico para Negocios', 'Inglés aplicado al entorno empresarial', NULL, 5, 'María Fernanda López', NOW(), NOW(), 'edu2', 4.6, 1, 2, 1, 35000, false, true, true, true);

-- 7. Programas técnicos reales
INSERT INTO programas (title, description, cover_image_key, created_at, updated_at, creator_id, rating, categoryid, price)
VALUES
  ('Técnico en Programación Web', 'Formación en desarrollo web y aplicaciones', NULL, NOW(), NOW(), 'edu3', 4.9, 3, 150000),
  ('Técnico en Gestión Empresarial', 'Gestión de empresas y negocios', NULL, NOW(), NOW(), 'admin1', 4.7, 6, 120000),
  ('Técnico en Biotecnología', 'Bases y aplicaciones de la biotecnología', NULL, NOW(), NOW(), 'edu2', 4.8, 2, 130000),
  ('Técnico en Finanzas', 'Formación en finanzas personales y empresariales', NULL, NOW(), NOW(), 'admin2', 4.6, 1, 110000),
  ('Técnico en Historia y Arte', 'Estudios históricos y artísticos', NULL, NOW(), NOW(), 'edu1', 4.5, 4, 90000);

-- 8. Materias (relacionando cada programa con un curso)
INSERT INTO materias (title, description, programa_id, courseid)
VALUES
  ('Programación Web con JavaScript', 'Materia principal del programa web', 1, 3),
  ('Matemáticas Financieras', 'Materia de finanzas en el programa de finanzas', 4, 1),
  ('Biología Celular', 'Materia base en biotecnología', 3, 2),
  ('Historia del Arte Universal', 'Materia de arte en el programa de historia y arte', 5, 4),
  ('Inglés Técnico para Negocios', 'Materia de inglés en gestión empresarial', 2, 5);

-- Listo para ejecutar en Drizzle Studio.
