CREATE TABLE usuarios (
    id INTEGER GENERATED ALWAYS AS IDENTITY  PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    correo VARCHAR(255) UNIQUE NOT NULL,
    activo BOOLEAN,
    fecha_registro TIMESTAMP,
    fecha_modificacion TIMESTAMP
);

CREATE TABLE producto(
    id INTEGER  GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    tiempoVida INTEGER,
    fecha_registro TIMESTAMP,
    fecha_modificacion TIMESTAMP,
    id_usuario INTEGER,

    CONSTRAINT fk_user
        FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id)
);