-- @autor: Luis Axel Núñez Quintana
-- @Fecha creación: 01-06-2024
-- @Descripción: Script de carga inicial para diagram_db

-- PERMISO
INSERT INTO PERMISO (PERMISO_ID, DESCRIPCION)
VALUES (1, 'Permiso de conversion a relacional'),
       (2, 'Permiso de conversion a entidad relacion'),
       (3, 'Permiso de conversion a modelo fisico');

-- ROL
INSERT INTO ROL (ROL_ID, NOMBRE)
VALUES (1, 'Invitado'),
       (2, 'Regular'),
       (3, 'Premium'),
       (4, 'Administrador');

-- ROL_PERMISO
INSERT INTO ROL_PERMISO (ROL_ID, PERMISO_ID)
VALUES (2, 1),
       (2, 2),
       (3, 1),
       (3, 2),
       (3, 3),
       (4, 1),
       (4, 2),
       (4, 3);

-- USUARIO
INSERT INTO USUARIO (USUARIO_ID, NOMBRE_USUARIO, EMAIL, FECHA_CREACION, ULTIMA_SESION, ROL_ID)
VALUES (1, 'usuario1', 'usuario1@gmail.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2),
       (2, 'usuario2', 'usuario2@gmail.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 3),
       (3, 'usuario3', 'usuario3@gmail.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 4);

-- CONTRASEÑA
INSERT INTO CONTRASENA (CONTRASENA_ID, CONTRASENA_HASH, USUARIO_ID)
VALUES (1, 'contrasena_123', 1),
       (2, 'contrasena_456', 2),
       (3, 'contrasena_789', 3);

COMMIT;
