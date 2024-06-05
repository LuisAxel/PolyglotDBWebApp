const express = require('express');
const Model = require('./model');

const app = express();

app.use(express.json());

// CREATE USUARIO
app.post('/usuario', async (req, res) => {
    const { usuario_id, nombre, correo } = req.body;
    try {
        const usuario = await Model.createUser(parseInt(usuario_id), nombre, correo);
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// CREATE DIAGRAMA
app.post('/diagrama', async (req, res) => {
    const { diagrama_id, nombre, creacion, modificacion } = req.body;
    try {
        const diagrama = await Model.createDiagram(parseInt(diagrama_id), nombre, creacion, modificacion);
        res.json(diagrama);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// CREATE ETIQUETA
app.post('/etiqueta', async (req, res) => {
    const { nombre } = req.body;
    try {
        const etiqueta = await Model.createEtiqueta(nombre);
        res.json(etiqueta);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET ALL USUARIOS
app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await Model.getAllUsuarios();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET DIAGRAMA BY ID
app.get('/diagrama/:diagrama_id', async (req, res) => {
    const { diagrama_id } = req.params;
    try {
    const diagrama = await Model.getDiagramaById(parseInt(diagrama_id));
    if (!diagrama) {
        return res.status(404).json({ message: 'Diagrama not found' });
    }
    res.json(diagrama);
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
});

// GET DIAGRAMAS BY USUARIOID
app.get('/diagrama/:usuario_id', async (req, res) => {
    const { usuario_id } = req.params;
    try {
    const diagrama = await Model.getDiagramaByUsuarioId(parseInt(usuario_id));
    if (!diagrama) {
        return res.status(404).json({ message: 'Diagrama not found' });
    }
    res.json(diagrama);
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
});

// GET DIAGRAMAS FAVORITOS BY USUARIOID
app.get('/usuario/:usuario_id/favoritos', async (req, res) => {
    const { usuario_id } = req.params;
    try {
    const diagrama = await Model.getDiagramasByUsuarioIdFavorite(parseInt(usuario_id));
    if (!diagrama) {
        return res.status(404).json({ message: 'Diagrama not found' });
    }
    res.json(diagrama);
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
});

// GET ALL ETIQUETAS FROM DIAGRAMA
app.get('/diagrama/:diagrama_id/etiquetas', async (req, res) => {
    const { diagrama_id } = req.params;
    try {
    const etiquetas = await Model.getEtiquetasByDiagramaId(parseInt(diagrama_id));
    res.json(etiquetas);
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
});

// GET ALL COMENTARIOS FROM DIAGRAMA
app.get('/diagrama/:diagrama_id/comentarios', async (req, res) => {
    const { diagrama_id } = req.params;
    try {
    const comentarios = await Model.getComentariosByDiagramaId(parseInt(diagrama_id));
    res.json(comentarios);
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
});

// GET ALL USUARIOS FROM COMPARTE DIAGRAMA
app.get('/diagrama/:diagrama_id/usuarios', async (req, res) => {
    const { diagrama_id } = req.params;
    try {
    const usuarios = await Model.getUsuariosByDiagramaId(parseInt(diagrama_id));
    res.json(usuarios);
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
});

// UPDATE USUARIO
app.put('/usuario/:usuario_id', async (req, res) => {
    const { usuario_id } = req.params;
    const updates = req.body;
    try {
    const usuario = await Model.updateUsuario(parseInt(usuario_id), updates);
    if (!usuario) {
        return res.status(404).json({ message: 'Usuario not found' });
    }
    res.json(usuario);
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
});

// UPDATE DIAGRAMA
app.put('/diagrama/:diagrama_id', async (req, res) => {
    const { diagrama_id } = req.params;
    const updates = req.body;
    try {
    const diagrama = await Model.updateDiagrama(parseInt(diagrama_id), updates);
    if (!diagrama) {
        return res.status(404).json({ message: 'Diagrama not found' });
    }
    res.json(diagrama);
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
});

// DELETE USUARIO
app.delete('/usuario/:usuario_id', async (req, res) => {
    const { usuario_id } = req.params;
    try {
    const deletedCount = await Model.deleteUsuario(parseInt(usuario_id));
    if (deletedCount === 0) {
        return res.status(404).json({ message: 'Usuario not found' });
    }
    res.json({ message: 'Usuario deleted' });
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
});

// DELETE DIAGRAMA
app.delete('/diagrama/:diagrama_id', async (req, res) => {
    const { diagrama_id } = req.params;
    try {
    const deletedCount = await Model.deleteDiagrama(parseInt(diagrama_id));
    if (deletedCount === 0) {
        return res.status(404).json({ message: 'Diagrama not found' });
    }
    res.json({ message: 'Diagrama deleted' });
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
});

app.listen(3004, () => {
    console.log(`Server is listening at http://localhost:3004`);
});