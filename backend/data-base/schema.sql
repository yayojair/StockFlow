CREATE TABLE usuarios (
    id INTEGER GENERATED ALWAYS AS IDENTITY  PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    correo VARCHAR(255) UNIQUE NOT NULL,
    activo BOOLEAN,
    fecha_registro TIMESTAMP,
    fecha_modificacion TIMESTAMP
);

CREATE TABLE productos (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    nombre VARCHAR(255) NOT NULL,

    categoria VARCHAR(100) NOT NULL,

    cantidad INTEGER NOT NULL,

    fecha_compra DATE NOT NULL,

    fecha_vencimiento DATE NOT NULL,

    fecha_registro TIMESTAMP DEFAULT NOW(),

    fecha_modificacion TIMESTAMP DEFAULT NOW(),

    id_usuario INTEGER NOT NULL,

    CONSTRAINT fk_producto_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id)
);