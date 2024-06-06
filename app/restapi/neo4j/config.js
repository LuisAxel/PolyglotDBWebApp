const neo4j = require('neo4j-driver');

const driver = neo4j.driver('neo4j://localhost:7687,localhost:8687,localhost:9687', neo4j.auth.basic('neo4j', 'neo4j123'));
const session = driver.session();

module.exports = session;
