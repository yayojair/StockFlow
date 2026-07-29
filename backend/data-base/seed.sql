INSERT INTO usuarios (nombre, password_hash, correo, activo, fecha_registro, fecha_modificacion)
VALUES 
('Alejandro Pérez', '$2b$12$QlM16nOMtTcxfyhnzpDyLursCJiUosp1.G8rVvAo.aqRjhbXJj5jq', 'alejandro.perez@email.com', 'true',NOW(), NOW()),
('Sofía Rodríguez', '$2b$12$QlM16nOMtTcxfyhnzpDyLursCJiUosp1.G8rVvAo.aqRjhbXJj5jq', 'sofia.rod@email.com', 'true',NOW(), NOW()),
('Carlos Mendoza', '$2b$12$QlM16nOMtTcxfyhnzpDyLursCJiUosp1.G8rVvAo.aqRjhbXJj5jq', 'carlos.mendoza@email.com', 'true',NOW(), NOW()),
('Laura Gómez', '$2b$12$QlM16nOMtTcxfyhnzpDyLursCJiUosp1.G8rVvAo.aqRjhbXJj5jq', 'laura.gomez@email.com', 'true', NOW(), NOW()),
('Martín Silva', '$2b$12$QlM16nOMtTcxfyhnzpDyLursCJiUosp1.G8rVvAo.aqRjhbXJj5jq', 'martin.silva@email.com', 'true', NOW(), NOW());

INSERT INTO productos
(
    nombre,
    categoria,
    cantidad,
    fecha_compra,
    fecha_vencimiento,
    fecha_registro,
    fecha_modificacion,
    id_usuario
)
VALUES
(
    'Leche Lala',
    'Alimentos',
    2,
    '2026-07-20',
    '2026-07-30',
    NOW(),
    NOW(),
    1
),
(
    'Ibuprofeno',
    'Medicamentos',
    1,
    '2026-07-10',
    '2028-01-15',
    NOW(),
    NOW(),
    1
),
(
    'Shampoo',
    'Higiene',
    1,
    '2026-06-01',
    '2027-06-01',
    NOW(),
    NOW(),
    1
);