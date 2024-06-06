const session = require('./config');

const createUser = async (usuario_id, nombre, correo) => {
  try {
    const result = await session.run(
      'CREATE (u:USUARIO {usuario_id: $usuario_id, nombre: $nombre, correo: $correo}) RETURN u',
      { usuario_id, nombre, correo }
    );
    return result.records[0].get('u').properties;
  } catch (error) {
    throw error;
  }
};

const createDiagram = async (diagrama_id, nombre, creacion, modificacion, usuario_id) => {
  try {
    const result = await session.run(
      `
      MATCH (u:USUARIO {usuario_id: $usuario_id})
      CREATE (d:DIAGRAMA {diagrama_id: $diagrama_id, nombre: $nombre, creacion: $creacion, modificacion: $modificacion})
      CREATE (u)-[:CREA {creacion: $creacion}]->(d)
      RETURN d
      `,
      { diagrama_id, nombre, creacion, modificacion, usuario_id }
    );
    console.log(result)
    return result.records[0].get('d').properties;
  } catch (error) {
    throw error;
  }
};

const createEtiqueta = async (nombre) => {
  try {
    const result = await session.run(
      'CREATE (e:ETIQUETA {nombre: $nombre}) RETURN e',
      { nombre }
    );
    return result.records[0].get('e').properties;
  } catch (error) {
    throw error;
  }
};

const getAllUsuarios = async () => {
  try {
    const result = await session.run('MATCH (u:USUARIO) RETURN u');
    return result.records.map(record => record.get('u').properties);
  } catch (error) {
    throw error;
  }
};

const getDiagramaById = async (diagrama_id) => {
    try {
    const result = await session.run(
        'MATCH (d:DIAGRAMA {diagrama_id: $diagrama_id}) RETURN d',
        { diagrama_id }
    );
    return result.records[0]?.get('d')?.properties; 
    } catch (error) {
    throw error;
    }
};

const getDiagramasByUsuarioId = async (usuario_id) => {
  try {
    const result = await session.run(
      'MATCH (u:USUARIO {usuario_id: $usuario_id})-[:CREA]->(d:DIAGRAMA) RETURN d',
      { usuario_id }
    );
    return result.records.map(record => record.get('d').properties);
  } catch (error) {
    throw error;
  }
};

const getDiagramasByUsuarioIdFavorite = async (usuario_id) => {
    try {
      const result = await session.run(
        'MATCH (u:USUARIO {usuario_id: $usuario_id})<-[:FAVORITO]->(d:DIAGRAMA) RETURN d',
        { usuario_id }
      );
      return result.records.map(record => record.get('d').properties);
    } catch (error) {
      throw error;
    }
  };

const getComentariosByDiagramaId = async (diagrama_id) => {
  try {
    const result = await session.run(
      'MATCH (d:DIAGRAMA {diagrama_id: $diagrama_id})<-[c:COMENTA]-(u:USUARIO) RETURN c',
      { diagrama_id }
    );
    return result.records.map(record => record.get('c').properties);
  } catch (error) {
    throw error;
  }
};

const getEtiquetasByDiagramaId = async (diagrama_id) => {
  try {
    console.log(diagrama_id);
    const result = await session.run(
      'MATCH (d:DIAGRAMA {diagrama_id: $diagrama_id})-[:TIENE]->(e:ETIQUETA) RETURN e',
      { diagrama_id }
    );
    return result.records.map(record => record.get('e').properties);
  } catch (error) {
    throw error;
  }
};

const getUsuariosByDiagramaId = async (diagrama_id) => {
    try {
    const result = await session.run(
        `MATCH (d:DIAGRAMA {diagrama_id: $diagrama_id})<-[:COMPARTE]-(u:USUARIO) RETURN u`,
        { diagrama_id }
    );
    return result.records.map(record => record.get('u').properties);
    } catch (error) {
    throw error;
    }
};
  

const updateUsuario = async (usuario_id, updates) => {
    try {
    const updateString = Object.keys(updates).map(key => `u.${key} = $${key}`).join(', ');
    const query = `MATCH (u:USUARIO {usuario_id: $usuario_id}) SET ${updateString} RETURN u`;
    const params = { usuario_id, ...updates };
    const result = await session.run(query, params);
    return result.records[0]?.get('u')?.properties; 
    } catch (error) {
    throw error;
    }
};

const updateDiagrama = async (diagrama_id, updates) => {
    try {
    const updateString = Object.keys(updates).map(key => `d.${key} = $${key}`).join(', ');
    const query = `MATCH (d:DIAGRAMA {diagrama_id: $diagrama_id}) SET ${updateString} RETURN d`;
    const params = { diagrama_id, ...updates };
    const result = await session.run(query, params);
    return result.records[0]?.get('d')?.properties; 
    } catch (error) {
    throw error;
    }
};

const deleteUsuario = async (usuario_id) => {
    try {
    const result = await session.run(
        'MATCH (u:USUARIO {usuario_id: $usuario_id}) DETACH DELETE u RETURN count(u) as deleted',
        { usuario_id }
    );
    return result.records[0].get('deleted');
    } catch (error) {
    throw error;
    }
};

const deleteDiagrama = async (diagrama_id) => {
    try {
    const result = await session.run(
        'MATCH (d:DIAGRAMA {diagrama_id: $diagrama_id}) DETACH DELETE d RETURN count(d) as deleted',
        { diagrama_id }
    );
    return result.records[0].get('deleted');
    } catch (error) {
    throw error;
    }
};


module.exports = {
    createUser,
    createDiagram,
    createEtiqueta,
    getAllUsuarios,
    getDiagramasByUsuarioId,
    getComentariosByDiagramaId,
    getDiagramaById,
    getEtiquetasByDiagramaId,
    getUsuariosByDiagramaId,
    updateUsuario,
    updateDiagrama,
    deleteUsuario,
    deleteDiagrama,
    getDiagramasByUsuarioIdFavorite
};