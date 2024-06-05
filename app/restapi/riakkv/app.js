const express = require('express');
const { createSession, getSession, getAllSessions, updateSession, deleteSession } = require('./sessionModel');
const app = express();

const router = express.Router();

router.post("/sesion", async (req, res) => {
    const body = req.body;
    try {
        const response = await createSession(body);
        res.send(response);
    } catch (error) {
        console.error("Error creating session: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/sesion/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const response = await getSession(id);
        
        if (!response) {
            console.error(`Error fetching session: Session with ID ${id} not found`);
            return res.status(404).json({ error: `Session with ID ${id} not found` });
        }

        res.send(response);
    } catch (error) {
        console.error("Error fetching session: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put("/sesion/:id", async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    try {
        const response = await updateSession(id, update);
        
        if (!response) {
            console.error(`Error updating session: Session with ID ${id} not found`);
            return res.status(404).json({ error: `Session with ID ${id} not found` });
        }

        res.send(response);
    } catch (error) {
        console.error("Error updating session: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete("/sesion/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const response = await deleteSession(id);
        
        if (!response) {
            console.error(`Error deleting session: Session with ID ${id} not found`);
            return res.status(404).json({ error: `Session with ID ${id} not found` });
        }

        res.send(response);
    } catch (error) {
        console.error("Error deleting session: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.use(express.json());
app.use(router);
app.listen(3003, () => {
    console.log("Listening on port 3003");
});