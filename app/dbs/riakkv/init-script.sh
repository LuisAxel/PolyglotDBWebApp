#!/bin/bash

# Step 1: Obten la dirección ip del nodo coordinador
COORDINATOR_IP=$(docker inspect -f '{{.NetworkSettings.IPAddress}}' riakkv-coordinator-1)
echo "IP: ${COORDINATOR_IP}"

# Step 2: Guarda el valor del puerto de riak en variable
PORT=8098
echo "PORT: ${PORT}"

# Step 3: Crea JSON para el bucket-type del proyecto
BUCKET_TYPE="sesiones"
BUCKET_TYPE_JSON='{"props":{"n_val":4}}'

# Step 4: Crea y activa el bucket-type si no existe
echo "Creando y activando bucket-type ${BUCKET_TYPE}"
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "http://${COORDINATOR_IP}:${PORT}/types/${BUCKET_TYPE}/buckets?buckets=true")
if [ "${RESPONSE}" -ne 200 ]; then
  echo "Creando bucket-type ${BUCKET_TYPE}..."
  docker exec riakkv-coordinator-1 riak-admin bucket-type create ${BUCKET_TYPE} ${BUCKET_TYPE_JSON}
  echo "Activando bucket-type ${BUCKET_TYPE}..."
  docker exec riakkv-coordinator-1 riak-admin bucket-type activate ${BUCKET_TYPE}
else
  echo "El bucket-type ${BUCKET_TYPE} ya existe y se encuentra activado"
fi

# Step 5: Verifica bucket-type
echo "Verificando bucket-type ${BUCKET_TYPE}..."
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "http://${COORDINATOR_IP}:${PORT}/types/${BUCKET_TYPE}/buckets?buckets=true")
echo "Código de respuesta: ${RESPONSE}"

# Step 6: Crea 3 JSONs para inserción de objetos
OBJECT1=$(cat <<EOF
{
    "usuario_id" : 1,
    "inicio" : "01-06-2024 20:03:00",
    "ultimo_acceso" : "01-06-2024 20:03:00",
    "preferencias" : {
        "tema" : "oscuro",
        "idioma" : "spa",
        "vista" : "compacta"
    },
    "configuraciones_temporales" : {
        "diagrama_abierto" : {
            "diagrama_id" : 1,
            "estado" : "editando",
            "ultima_actualización" : "01-06-2024 20:03:00"
      },
      "busqueda_reciente" : {
        "query" : "usuario_id = 1",
        "filtros" : {
            "tipo" : "ER",
            "fecha" : "01-06-2024 20:03:00"
        }
      }
    }
}
EOF
)

OBJECT2=$(cat <<EOF
{
    "usuario_id" : 2,
    "inicio" : "01-06-2024 20:03:00",
    "ultimo_acceso" : "01-06-2024 20:03:00",
    "preferencias" : {
        "tema" : "claro",
        "idioma" : "eng",
        "vista" : "compacta"
    },
    "configuraciones_temporales" : {
        "diagrama_abierto" : {
            "diagrama_id" : 2,
            "estado" : "editando",
            "ultima_actualización" : "01-06-2024 20:03:00"
      },
      "busqueda_reciente" : {
        "query" : "usuario_id = 2",
        "filtros" : {
            "tipo" : "R",
            "fecha" : "01-06-2024 20:03:00"
        }
      }
    }
}
EOF
)

OBJECT3=$(cat <<EOF
{
    "usuario_id" : 3,
    "inicio" : "01-06-2024 20:03:00",
    "ultimo_acceso" : "01-06-2024 20:03:00",
    "preferencias" : {
        "tema" : "oscuro",
        "idioma" : "spa",
        "vista" : "compacta"
    },
    "configuraciones_temporales" : {
        "diagrama_abierto" : {
            "diagrama_id" : 3,
            "estado" : "editando",
            "ultima_actualización" : "01-06-2024 20:03:00"
      },
      "busqueda_reciente" : {
        "query" : "usuario_id = 3",
        "filtros" : {
            "tipo" : "F",
            "fecha" : "01-06-2024 20:03:00"
        }
      }
    }
}
EOF
)

# Step 7: Insertando objetos
BUCKET="sesion"

# Funcion para verificar e insertar objeto
insert_and_verify() {
  local key=$1
  local value=$2
  RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "http://${COORDINATOR_IP}:${PORT}/types/${BUCKET_TYPE}/buckets/${BUCKET}/keys/${key}")
  if [ "${RESPONSE}" -ne 200 ]; then
    echo "Insertando objeto con key: ${key}..."
    curl -XPUT "http://${COORDINATOR_IP}:${PORT}/types/${BUCKET_TYPE}/buckets/${BUCKET}/keys/${key}" -H "Content-Type: application/json" -d "${value}"
  else
    echo "Objeto con key: ${key}, ya existe."
  fi
  echo "Vericando objecto con key: ${key}..."
  curl -XGET "http://${COORDINATOR_IP}:${PORT}/types/${BUCKET_TYPE}/buckets/${BUCKET}/keys/${key}"
  echo
}

insert_and_verify "sesion_1" "${OBJECT1}"
insert_and_verify "sesion_2" "${OBJECT2}"
insert_and_verify "sesion_3" "${OBJECT3}"

# echo para asegurar que el prompt the bash se encuentre en una nueva linea
echo
