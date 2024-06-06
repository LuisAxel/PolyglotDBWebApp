# Polyglot Persistence Web Application Project

This repository hosts a web application project implementing polyglot persistence, utilizing a combination of relational and non-relational databases. The backend is developed in Node.js/Express.js, featuring session management with RiakKV, document storage with MongoDB, credential management with PostgreSQL, and relationships management with Neo4J.

## Author
**Luis Axel Núñez Quintana**

## License
This project is licensed under the [MIT License](./LICENSE).

## Documentation
Comprehensive documentation detailing the implementation (in Spanish) can be found in the PDF located in the `Documento` directory.

## Usage

1. Clone the repository:
    ```bash
    git clone https://github.com/LuisAxel/PolyglotDBWebApp
    ```
2. Configure hostnames in `/etc/hosts`:
    ```
    # Polyglot Persistence Web Application
    192.168.80.2 mongo1
    192.168.80.3 mongo2
    192.168.80.5 mongo3
    192.168.80.4 mongo4
    
    192.168.81.2 neo4j1
    192.168.81.3 neo4j2
    192.168.81.4 neo4j3
    ```
    
3. Start the databases using the provided script:
    ```bash
    cd app/dbs
    ./start_dbs.sh
    ```

4. Initialize the databases with default values:
    ```bash
    cd app/dbs
    ./init-values.sh
    ```

5. Start the APIs using the provided script:
    ```bash
    cd app/restapi
    ./init-api.sh
    ```

6. Test the API functionality using the provided Python script:
    ```bash
    cd app/demo
    python3 demo.py
    ```

7. Stop the APIs:
    ```bash
    cd app/dbs
    ./stop-api.sh
    ```

8. Stop the databases:
    ```bash
    cd app/dbs
    ./stop_dbs.sh
    ```

## Requirements
- Docker version 26.1.4, build 5650f9b
- Docker Compose version v2.27.1
- Python 3.10.12
- Node.js v22.2.0
- Node.js, Express, Nodemon, pg, Mongoose, neo4j-driver and basho-riak-client
- Python requests and json

## System Information (Host Environment)
- **Operating System:** Pop!_OS 22.04 LTS
- **Version Codename:** jammy
- description: Notebook
- product: GL553VD
- processor	: Intel(R) Core(TM) i7-7700HQ CPU @ 2.80GHz
- memory: 15Gi DDR4
- gpu: NVIDIA Corporation GP107M [GeForce GTX 1050 Mobile]
- network controller: Intel Corporation Wireless 7265
