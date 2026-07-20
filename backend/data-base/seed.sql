INSERT INTO usuarios (nombre, password_hash, correo, activo, fecha_registro, fecha_modificacion)
VALUES 
('Alejandro Pérez', '$2b$12$QlM16nOMtTcxfyhnzpDyLursCJiUosp1.G8rVvAo.aqRjhbXJj5jq', 'alejandro.perez@email.com', 'true',NOW(), NOW()),
('Sofía Rodríguez', '$2b$12$QlM16nOMtTcxfyhnzpDyLursCJiUosp1.G8rVvAo.aqRjhbXJj5jq', 'sofia.rod@email.com', 'true',NOW(), NOW()),
('Carlos Mendoza', '$2b$12$QlM16nOMtTcxfyhnzpDyLursCJiUosp1.G8rVvAo.aqRjhbXJj5jq', 'carlos.mendoza@email.com', 'true',NOW(), NOW()),
('Laura Gómez', '$2b$12$QlM16nOMtTcxfyhnzpDyLursCJiUosp1.G8rVvAo.aqRjhbXJj5jq', 'laura.gomez@email.com', 'true', NOW(), NOW()),
('Martín Silva', '$2b$12$QlM16nOMtTcxfyhnzpDyLursCJiUosp1.G8rVvAo.aqRjhbXJj5jq', 'martin.silva@email.com', 'true', NOW(), NOW());

INSERT INTO PRODUCTOS (producto, tiempoVida, fecha_registro, fecha_modificacion, id_usuario)
VALUES 
('Laptop Dell Inspiron', 36, NOW(), NOW(), 1),
('Monitor ASUS 27"', 48, NOW(), NOW(), 1),
('Teclado Mecánico RGB', 24, NOW(), NOW(), 2),
('Disco Duro Externo 2TB', 60, NOW(), NOW(), 3),
('Mouse Inalámbrico Ergonómico', 12, NOW(), NOW(), 4);