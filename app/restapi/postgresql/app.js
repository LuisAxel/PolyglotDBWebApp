const express = require('express');
const { dbconnect } = require('./config');
const ModelUser = require('./userModel');
const app = express();

const router = express.Router();

router.get("/", (req, res) => {
    const routes = [
        { method: "POST", path: "/usuario", description: "Create a new user with password" },
        { method: "DELETE", path: "/usuario/:id", description: "Delete a user with password by user_id" },
        { method: "GET", path: "/usuario", description: "Get all users" },
        { method: "GET", path: "/usuario/:id", description: "Get user by user_id" },
        { method: "PUT", path: "/usuario/:id", description: "Update a user by user_id" },
        { method: "PUT", path: "/contrasena/:usuario_id", description: "Update a password by user_id" },
        { method: "GET", path: "/roles", description: "Get all roles" },
        { method: "GET", path: "/permisos", description: "Get all permisos" },
        { method: "GET", path: "/rol_permiso/:id", description: "Get all role permissions by role_id" }
    ];
    res.json(routes);
});

router.post("/usuario", async (req, res) => {
    const body = req.body;
    try {
        const response = await ModelUser.createUsuarioWithContrasena(body);
        res.send(response);
    } catch (error) {
        console.error("Error creating usuario with contrasena: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete("/usuario/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const response = await ModelUser.deleteUsuarioWithContrasena(id);
        
        if (!response) {
            console.error(`Error deleting usuario with contrasena: Usuario with ID ${id} not found`);
            return res.status(404).json({ error: `Usuario with ID ${id} not found` });
        }

        res.send(response);
    } catch (error) {
        console.error("Error deleting usuario with contrasena: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/usuario", async (req, res) => {
    try {
        const response = await ModelUser.getAllUsuarios();
        res.send(response);
    } catch (error) {
        console.error("Error fetching usuarios: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/usuario/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const response = await ModelUser.getUsuarioById(id);
        
        if (!response) {
            console.error(`Error fetching usuario: Usuario with ID ${id} not found`);
            return res.status(404).json({ error: `Usuario with ID ${id} not found` });
        }

        res.send(response);
    } catch (error) {
        console.error("Error fetching usuario: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put("/usuario/:id", async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    try {
        const response = await ModelUser.updateUsuario(id, update);
        
        if (!response) {
            console.error(`Error updating usuario: Usuario with ID ${id} not found`);
            return res.status(404).json({ error: `Usuario with ID ${id} not found` });
        }

        res.send(response);
    } catch (error) {
        console.error("Error updating usuario: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put("/contrasena/:usuario_id", async (req, res) => {
    const usuario_id = req.params.usuario_id;
    const update = req.body;
    try {
        const response = await ModelUser.updateContrasenaByUsuarioId(usuario_id, update);
        
        if (!response) {
            console.error(`Error updating contrasena: Contrasena for usuario with ID ${usuario_id} not found`);
            return res.status(404).json({ error: `Contrasena for usuario with ID ${usuario_id} not found` });
        }

        res.send(response);
    } catch (error) {
        console.error("Error updating contrasena: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/roles", async (req, res) => {
    try {
        const response = await ModelUser.getAllRoles();
        res.send(response);
    } catch (error) {
        console.error("Error fetching roles: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/permisos", async (req, res) => {
    try {
        const response = await ModelUser.getAllPermisos();
        res.send(response);
    } catch (error) {
        console.error("Error fetching permisos: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/rol_permiso/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const response = await ModelUser.getAllRolPermisos(id);

        if (!response) {
            console.error(`Error fetching permissions: Permissions for role with ID ${id} not found`);
            return res.status(404).json({ error: `Permissions for role with ID ${id} not found` });
        }

        res.send(response);
    } catch (error) {
        console.error("Error fetching rol_permisos: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.use(express.json());
app.use(router);

app.listen(3002, () => {
    console.log("Listening on port 3002");
});

dbconnect();