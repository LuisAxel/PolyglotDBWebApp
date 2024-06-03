const mongoose = require('mongoose');

const diagramSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  usuario_id: { type: Number, required: true },
  nombre_diagrama: { type: String, required: true },
  tipo_diagrama: { type: String, enum: ['ER', 'R', 'F'], required: true },
  contenido: {
    type: {
      entidades: {
        type: [{
          nombre: { type: String, required: true },
          atributos: { type: [String], required: true }
        }],
        required: true
      },
      relaciones: {
        type: [{
          nombre: { type: String, required: true },
          entidades: { type: [String], required: true },
          cardinalidad: { 
            type: String, 
            match: /^(\d+:\d+|\*:\d+|\d+:\*|\*|\*)$/, 
            required: true 
          }
        }],
        required: true
      }
    },
    required: true
  },
  fecha_creacion: { type: Date, required: true },
  fecha_modificacion: { type: Date, required: true }
});

const ModelDiagram = mongoose.model('diagramas', diagramSchema);

module.exports = ModelDiagram;