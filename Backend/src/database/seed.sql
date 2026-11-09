INSERT INTO students (
    id,
    name,
    email,
    phone,
    address,
    birthdate,
    semester,
    status
) VALUES
(1001, 'Juan Perez', 'juan.perez@gmail.com', '3001234567', 'Calle 10 # 15-20', '2002-05-15', 3, TRUE),

(1002, 'Maria Gomez', 'maria.gomez@gmail.com', '3012345678', 'Carrera 20 # 10-30', '2001-08-22', 5, TRUE),

(1003, 'Carlos Rodriguez', 'carlos.rodriguez@gmail.com', '3023456789', 'Calle 25 # 12-40', '2003-01-10', 2, TRUE),

(1004, 'Laura Martinez', 'laura.martinez@gmail.com', '3034567890', 'Carrera 15 # 8-25', '2000-11-30', 7, TRUE),

(1005, 'Andres Lopez', 'andres.lopez@gmail.com', '3045678901', 'Calle 30 # 20-15', '2002-03-18', 4, TRUE),

(1006, 'Daniela Ramirez', 'daniela.ramirez@gmail.com', '3056789012', 'Carrera 12 # 5-18', '2001-06-25', 6, TRUE),

(1007, 'Santiago Torres', 'santiago.torres@gmail.com', '3107890123', 'Calle 18 # 22-10', '2003-09-12', 1, TRUE),

(1008, 'Valentina Hernandez', 'valentina.hernandez@gmail.com', '3118901234', 'Carrera 8 # 14-32', '2002-12-05', 8, TRUE),

(1009, 'Sebastian Castro', 'sebastian.castro@gmail.com', '3129012345', 'Calle 40 # 18-22', '2001-04-14', 9, TRUE),

(1010, 'Camila Moreno', 'camila.moreno@gmail.com', '3130123456', 'Carrera 25 # 30-12', '2000-07-20', 10, TRUE);

INSERT INTO courses (
    name,
    description,
    credits,
    semester,
    status
) VALUES
('Programación I', 'Fundamentos de programación, algoritmos y lógica computacional.', 3, 1, TRUE),

('Matemáticas I', 'Fundamentos de álgebra, ecuaciones, funciones y operaciones matemáticas.', 4, 1, TRUE),

('Bases de Datos', 'Modelado de datos, lenguaje SQL y sistemas gestores de bases de datos.', 3, 3, TRUE),

('Programación Web I', 'Desarrollo de aplicaciones web utilizando HTML, CSS, JavaScript y TypeScript.', 3, 4, TRUE),

('Arquitectura de Software', 'Principios, patrones y estilos arquitectónicos para el desarrollo de software.', 3, 6, TRUE),

('Ingeniería de Software', 'Procesos, metodologías ágiles y buenas prácticas para el desarrollo de software.', 3, 5, TRUE),

('Redes de Computadores', 'Fundamentos de redes, protocolos de comunicación y modelos de referencia.', 3, 4, TRUE),

('Sistemas Operativos', 'Administración de procesos, gestión de memoria y sistemas de archivos.', 3, 3, TRUE),

('Desarrollo de Aplicaciones Móviles', 'Fundamentos y desarrollo de aplicaciones para dispositivos móviles.', 3, 7, TRUE),

('Inteligencia Artificial', 'Fundamentos de inteligencia artificial, aprendizaje automático y algoritmos inteligentes.', 4, 8, TRUE);


INSERT INTO teachers (
    name,
    phone,
    email,
    status
) VALUES
  ('Carlos Alberto Rodríguez', '3101234567', 'carlos.rodriguez@uceva.edu.co', true),
  ('Ana María Gómez', '3119876543', 'ana.gomez@uceva.edu.co', true),
  ('Javier Eduardo López', '3124567890', 'javier.lopez@uceva.edu.co', true),
  ('Laura Sofia Martínez', '3157654321', 'laura.martinez@uceva.edu.co', true),
  ('Fernando Jose Ramírez', '3182345678', 'fernando.ramirez@uceva.edu.co', true),
  ('Diana Marcela Torres', '3168765432', 'diana.torres@uceva.edu.co', true),
  ('Ricardo Andres Morales', '3173456789', 'ricardo.morales@uceva.edu.co', true),
  ('Patricia Elena Castro', '3199876543', 'patricia.castro@uceva.edu.co', true),
  ('Gustavo Adolfo Perez', '3001234567', 'gustavo.perez@uceva.edu.co', true),
  ('Claudia Jimena Vargas', '3019876543', 'claudia.vargas@uceva.edu.co', true);


INSERT INTO classroom (
    code,
    capacity,
    status
    ) VALUES
  ('A-101', 35, true),
  ('A-102', 40, true),
  ('B-201', 30, true),
  ('B-202', 25, true),
  ('C-301', 45, true),
  ('LAB-1', 20, true),
  ('LAB-2', 20, true),
  ('AUD-1', 100, true),
  ('D-104', 35, true),
  ('D-105', 30, true);