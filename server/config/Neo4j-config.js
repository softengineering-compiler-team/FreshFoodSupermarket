const neo4j = require('node-neo4j')
const domain = require('./Domain-config')
const db = new neo4j(`http://neo4j:158728@${domain}:7474`);
module.exports = db;