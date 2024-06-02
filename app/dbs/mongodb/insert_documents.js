// Inserta 3 registros de ejemplo
db = db.getSiblingDB("diagramas");

// Si hay documentos, no hagas nada
var count = db.diagramas.count();
if (count > 0) {
  quit(); // Exit the script
}

db.diagramas.insertMany([
  {
    "_id": 1,
    "usuario_id": 1,
    "nombre_diagrama": "Diagrama 1",
    "tipo_diagrama": "ER",
    "contenido": {
      "entidades": [
        {
          "nombre": "Entidad1",
          "atributos": ["atributo1", "atributo2"]
        }
      ],
      "relaciones": [
        {
          "nombre": "Relacion1",
          "entidades": ["Entidad1", "Entidad2"],
          "cardinalidad": "1:1"
        }
      ]
    },
    "fecha_creacion": new Date(),
    "fecha_modificacion": new Date()
  },
  {
    "_id": 2,
    "usuario_id": 2,
    "nombre_diagrama": "Diagrama 2",
    "tipo_diagrama": "R",
    "contenido": {
      "entidades": [
        {
          "nombre": "Entidad1",
          "atributos": ["atributo1", "atributo2"]
        }
      ],
      "relaciones": [
        {
          "nombre": "Relacion1",
          "entidades": ["Entidad1", "Entidad1"],
          "cardinalidad": "*:*"
        }
      ]
    },
    "fecha_creacion": new Date(),
    "fecha_modificacion": new Date()
  },
  {
    "_id": 3,
    "usuario_id": 3,
    "nombre_diagrama": "Diagrama 3",
    "tipo_diagrama": "F",
    "contenido": {
      "entidades": [
        {
          "nombre": "Entidad1",
          "atributos": ["atributo1", "atributo2"]
        }
      ],
      "relaciones": [
        {
          "nombre": "Relacion1",
          "entidades": ["Entidad1", "Entidad1"],
          "cardinalidad": "1:*"
        }
      ]
    },
    "fecha_creacion": new Date(),
    "fecha_modificacion": new Date()
  }
]);
