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

2. Start the databases using the provided script:
    ```bash
    cd app/dbs
    ./start_dbs.sh
    ```

3. Initialize the databases with default values:
    ```bash
    cd app/dbs
    ./init-values.sh
    ```

4. Start the APIs using the provided script:
    ```bash
    cd app/restapi
    ./init-api.sh
    ```

5. Test the API functionality using the provided Python script:
    ```bash
    cd app/demo
    python3 demo.py
    ```

6. Stop the APIs:
    ```bash
    cd app/dbs
    ./stop-api.sh
    ```

7. Stop the databases:
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
- **Version:** 22.04
- **ID:** pop
- **ID_LIKE:** ubuntu debian
- **Pretty Name:** Pop!_OS 22.04 LTS
- **Version ID:** 22.04
- **Home URL:** [https://pop.system76.com](https://pop.system76.com)
- **Support URL:** [https://support.system76.com](https://support.system76.com)
- **Bug Report URL:** [https://github.com/pop-os/pop/issues](https://github.com/pop-os/pop/issues)
- **Privacy Policy URL:** [https://system76.com/privacy](https://system76.com/privacy)
- **Version Codename:** jammy
- **Ubuntu Codename:** jammy
- **Logo:** distributor-logo-pop-os
