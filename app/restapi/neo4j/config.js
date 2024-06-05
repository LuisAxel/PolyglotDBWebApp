const neo4j = require('neo4j-driver');

const driver = neo4j.driver('bolt://localhost:8687', neo4j.auth.basic('neo4j', 'neo4j123'));
const session = driver.session();

module.exports = session;