const { Pool } = require('pg');

const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'diagram_db',
    password: 'admin123',
    port: 5432,
});

const dbconnect = async () => {
    try {
        await pool.connect();
        console.log("PostgreSQL connection successful");
    } catch (err) {
        console.error("Connection error", err);
    }
};

module.exports = { pool, dbconnect };