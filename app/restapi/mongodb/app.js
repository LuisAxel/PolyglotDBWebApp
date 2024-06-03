const express = require('express');
const dbconnect = require('./config');
const ModelDiagram = require('./diagramModel');
const app = express();

const router = express.Router();

router.post("/", async (req, res) => {
    const body = req.body;
    try {
        const response = await ModelDiagram.create(body);
        res.send(response);
    } catch (error) {
        if (error.name === 'ValidationError'){
            const errors = Object.keys(error.errors).map(field => {
                return {
                    field: field,
                    message: error.errors[field].message
                };
            });
            const errorMessage = `Error creating diagram: ${error.message}`;
            console.error(errorMessage);
            res.status(400).json({ error : errorMessage });
        } else{
            console.error("Error creating diagram: ", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    
})

router.get("/", async (req, res) => {
    try {
        const response = await ModelDiagram.find({})
        res.send(response);
    } catch (error) {
        console.error("Error creating diagram: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const response = await ModelDiagram.findById(id)
        
        if (!response) {
            console.error(`Error updating diagram: Diagram with ID ${id} not found`);
            return res.status(404).json({ error: `Diagram with ID ${id} not found` });
        }

        res.send(response);
    } catch (error) {
        console.error("Error creating diagram: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.put("/:id", async (req, res) => {
    const id = req.params.id;

    const filter = {_id: id};
    const update = req.body;
    try {
        const response = await ModelDiagram.findOneAndUpdate(filter, update, {new: true});
        
        if (!response) {
            console.error(`Error updating diagram: Diagram with ID ${id} not found`);
            return res.status(404).json({ error: `Diagram with ID ${id} not found` });
        }

        // Check if it was updated
        if (JSON.stringify(response) !== JSON.stringify(update)) {
            console.error(`Document with ID ${id} wasn't updated`);
            return res.status(400).json({ error: `Document with ID ${id} wasn't updated` });
        }
        
        res.send(response);
    } catch (error) {
        console.error("Error updating diagram: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const response = await ModelDiagram.deleteOne({_id:id});
        
        if (response["deletedCount"] == 0) {
            console.error(`Error deleting diagram: Diagram with ID ${id} not found`);
            return res.status(404).json({ error: `Diagram with ID ${id} not found` });
        }

        res.send(response);
    } catch (error) {
        console.error("Error deleting diagram: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.use(express.json());
app.use(router);
app.listen(3001, () =>{
    console.log("Listening on port 3001");
})

dbconnect();