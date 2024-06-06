from utilities import *

def test_mongodb():
    test_api("mongo", "GET", "/")

    test_diagram = {
        "_id": 4,
        "usuario_id": 4,
        "nombre_diagrama": "Diagrama prueba",
        "tipo_diagrama": "ER",
        "contenido": {
            "entidades": [
                {
                    "nombre": "Entidad1",
                    "atributos": [
                        "atributo1",
                        "atributo2"
                    ]
                }
            ],
            "relaciones": [
                {
                    "nombre": "Relacion1",
                    "entidades": [
                        "Entidad1",
                        "Entidad2"
                    ],
                    "cardinalidad": "1:1"
                }
            ]
        },
        "fecha_creacion": "2024-06-05T09:31:52.670Z",
        "fecha_modificacion": "2024-06-05T09:31:52.670Z"
    }

    test_api("mongo", "POST", "/", test_diagram)
    test_api("mongo", "GET", "/4")
    
    test_diagram["nombre_diagrama"] = "Diagrama prueba actualizado"
    
    test_api("mongo", "PUT", "/4", test_diagram)
    test_api("mongo", "GET", "/4")
    test_api("mongo", "DELETE", "/4")
    test_api("mongo", "GET", "/4")

def test_riakkv():
    test_api("riak", "GET", "/sesion/sesion_1")

    test_sesion = {
        "sesion_4" : {
            "usuario_id": 4,
            "inicio": "01-06-2024 20:03:00",
            "ultimo_acceso": "01-06-2024 20:03:00",
            "preferencias": {
                "tema": "oscuro",
                "idioma": "spa",
                "vista": "compacta"
            },
            "configuraciones_temporales": {
                "diagrama_abierto": {
                    "diagrama_id": 1,
                    "estado": "editando",
                    "ultima_actualizaci\u00f3n": "01-06-2024 20:03:00"
                },
                "busqueda_reciente": {
                    "query": "usuario_id = 4",
                    "filtros": {
                        "tipo": "ER",
                        "fecha": "01-06-2024 20:03:00"
                    }
                }
            }
        }
    }

    key = list(test_sesion.keys())[0]
    content = test_sesion[key]

    test_api("riak", "POST", "/sesion/", content)

    test_api("riak", "GET", "/sesion/" + key)

    content["usuario_id"] = 5

    test_api("riak", "PUT", "/sesion/" + key, content)

    test_api("riak", "GET", "/sesion/" + key)

    test_api("riak", "DELETE", "/sesion/" + key)

    test_api("riak", "GET", "/sesion/" + key)

def test_postgresql():

    test_api("postgres", "GET", "/roles")

    test_api("postgres", "GET", "/permisos")

    test_api("postgres", "GET", "/rol_permiso/3")
    
    test_user = {
        "usuario_id": "4",
        "nombre_usuario": "test user",
        "email": "test@gmail.com",
        "fecha_creacion": "2024-06-05T23:51:28.770Z",
        "ultima_sesion": "2024-06-05T23:51:28.770Z",
        "rol_id": "2",
        "contrasena_id": "4",
        "contrasena_hash": "test_user123"
    }

    test_api("postgres", "GET", "/usuario")

    test_api("postgres", "POST", "/usuario", test_user)

    test_api("postgres", "GET", "/usuario/4")

    test_user["nombre_usuario"] = "test user actualizado"

    test_api("postgres", "PUT", "/usuario/4", test_user)

    test_user["contrasena_hash"] = "test contra actualizada"

    test_api("postgres", "PUT", "/contrasena/4", test_user)

    test_api("postgres", "GET", "/usuario/4")

    test_api("postgres", "DELETE", "/usuario/4")

    test_api("postgres", "GET", "/usuario/4")

def test_neo4j():
    test_api("neo4j", "GET", "/usuarios")

    test_api("neo4j", "GET", "/usuario/2/favoritos")

    test_api("neo4j", "GET", "/diagrama/1/comentarios")

    test_api("neo4j", "GET", "/diagrama/1/etiquetas")

    test_api("neo4j", "GET", "/diagrama/3/usuarios")

    test_user = {
        "usuario_id": 4,
        "correo": "test_user@gmail.com",
        "nombre": "test_user"
    }

    test_diagram = {
        "modificacion": "01-06-2024 20:03:00",
        "creacion": "01-06-2024 20:03:00",
        "diagrama_id": 4,
        "nombre": "test_diagram"
    }

    test_api("neo4j", "POST", "/usuario", test_user)
    test_api("neo4j", "GET", "/usuarios")

    test_api("neo4j", "POST", "/diagrama/4", test_diagram)
    test_api("neo4j", "GET", "/diagrama/4")
    test_api("neo4j", "GET", "/diagrama/usuario/4")

    test_user["nombre"] = "test_user actualizado"
    test_api("neo4j", "PUT", "/usuario/4", test_user)
    test_api("neo4j", "GET", "/usuarios")

    test_diagram["nombre"] = "test_diagram actualizado"
    test_api("neo4j", "PUT", "/diagrama/4", test_diagram)
    test_api("neo4j", "GET", "/diagrama/4")

    test_api("neo4j", "DELETE", "/usuario/4")
    test_api("neo4j", "DELETE", "/diagrama/4")
    test_api("neo4j", "GET", "/usuarios")
    test_api("neo4j", "GET", "/diagrama/4")