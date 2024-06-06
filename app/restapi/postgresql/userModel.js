const { pool } = require('./config');

const createUsuarioWithContrasena = async (body) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const { usuario_id, nombre_usuario, email, fecha_creacion, ultima_sesion, rol_id, contrasena_id, contrasena_hash } = body;

        const usuarioQuery = 'INSERT INTO usuario (usuario_id, nombre_usuario, email, fecha_creacion, ultima_sesion, rol_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
        const usuarioValues = [usuario_id, nombre_usuario, email, fecha_creacion, ultima_sesion, rol_id];

        const usuarioResult = await client.query(usuarioQuery, usuarioValues);

        const contrasenaQuery = 'INSERT INTO contrasena (contrasena_id, contrasena_hash, usuario_id) VALUES ($1, $2, $3) RETURNING *';
        const contrasenaValues = [contrasena_id, contrasena_hash, usuario_id];
        const contrasenaResult = await client.query(contrasenaQuery, contrasenaValues);

        await client.query('COMMIT');
        return { usuario: usuarioResult.rows[0], contrasena: contrasenaResult.rows[0] };
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

const deleteUsuarioWithContrasena = async (id) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const deleteContrasenaQuery = 'DELETE FROM contrasena WHERE usuario_id = $1 RETURNING *';
        const contrasenaResult = await client.query(deleteContrasenaQuery, [id]);

        const deleteUsuarioQuery = 'DELETE FROM usuario WHERE usuario_id = $1 RETURNING *';
        const usuarioResult = await client.query(deleteUsuarioQuery, [id]);

        await client.query('COMMIT');
        return { usuario: usuarioResult.rowCount > 0, contrasena: contrasenaResult.rowCount > 0 };
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

const getAllUsuarios = async () => {
    const result = await pool.query('SELECT * FROM usuario');
    return result.rows;
};

const getUsuarioById = async (id) => {
    const result = await pool.query('SELECT * FROM usuario WHERE usuario_id = $1', [id]);
    return result.rows[0];
};

const updateUsuario = async (id, update) => {
    const { nombre_usuario, email, fecha_creacion, ultima_sesion, rol_id } = update;
    const query = 'UPDATE usuario SET nombre_usuario = $2, email = $3, fecha_creacion = $4, ultima_sesion = $5, rol_id = $6 WHERE usuario_id = $1 RETURNING *';
    const values = [id, nombre_usuario, email, fecha_creacion, ultima_sesion, rol_id];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const updateContrasenaByUsuarioId = async (usuario_id, update) => {
    const { contrasena_hash } = update;
    const query = 'UPDATE contrasena SET contrasena_hash = $2 WHERE usuario_id = $1 RETURNING *';
    const values = [usuario_id, contrasena_hash];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const getAllRoles = async () => {
    const result = await pool.query('SELECT * FROM rol');
    return result.rows;
};

const getAllPermisos = async () => {
    const result = await pool.query('SELECT * FROM permiso');
    return result.rows;
};

const getAllRolPermisos = async (id) => {
    const result = await pool.query('SELECT p.descripcion FROM rol_permiso r, permiso p WHERE r.rol_id = $1 AND r.permiso_id = p.permiso_id', [id]);
    return result.rows;
};

module.exports = {
    createUsuarioWithContrasena,
    deleteUsuarioWithContrasena,
    getAllUsuarios,
    getUsuarioById,
    updateUsuario,
    updateContrasenaByUsuarioId,
    getAllRoles,
    getAllPermisos,
    getAllRolPermisos
}
