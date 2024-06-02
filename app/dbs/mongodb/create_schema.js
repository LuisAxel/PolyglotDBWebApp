// Crea el schema para los diagramas
db = db.getSiblingDB("diagramas");

// Si el esquema existe, no hagas nada
var collectionExists = db.getCollectionInfos({ name: "diagramas" }).length > 0;
if (collectionExists) {
  quit(); // Exit the script
}


db.createCollection(
  "diagramas",
  {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["_id", "usuario_id", "nombre_diagrama", "tipo_diagrama", "contenido", "fecha_creacion", "fecha_modificacion"],
        properties: {
          _id: {
            bsonType: "int"
          },
          usuario_id: {
            bsonType: "int"
          },
          nombre_diagrama: {
            bsonType: "string"
          },
          tipo_diagrama: {
            enum: ["ER", "R", "F"]
          },
          contenido: {
            bsonType: "object",
            required: ["entidades", "relaciones"],
            properties: {
              entidades: {
                bsonType: "array",
                items: {
                  bsonType: "object",
                  required: ["nombre", "atributos"],
                  properties: {
                    nombre: {
                      bsonType: "string"
                    },
                    atributos: {
                      bsonType: "array",
                      items: {
                        bsonType: "string"
                      }
                    }
                  }
                }
              },
              relaciones: {
                bsonType: "array",
                items: {
                  bsonType: "object",
                  required: ["nombre", "entidades", "cardinalidad"],
                  properties: {
                    nombre: {
                      bsonType: "string"
                    },
                    entidades: {
                      bsonType: "array",
                      items: {
                        bsonType: "string"
                      }
                    },
                    cardinalidad: {
                      bsonType: "string",
                      pattern: "^\\d+:\\d+|\\*:\\d+|\\d+:\\*|\\*|\\*$"
                    }
                  }
                }
              }
            }
          },
          fecha_creacion: {
            bsonType: "date"
          },
          fecha_modificacion: {
            bsonType: "date"
          }
        }
      }
    }
  }
);
