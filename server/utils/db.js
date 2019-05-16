const MySQL_config = require('../config/MySQL-config') 
const Redis_config = require('../config/Redis-config') 
const db = require('../config/Neo4j-config')
const mysql = require('mysql'),
     	pool  = mysql.createPool(MySQL_config)
const redis = require('ioredis'),
		client = redis.createClient(Redis_config.rds_port, Redis_config.rds_host, Redis_config.rds_opts);

async function MySQL_db(sql) {
	return new Promise((resolve, reject)=> {
		pool.getConnection((err, connection)=> {
			if(err) {
				console.error(err)
				reject(err)
			}
			connection.query(sql, (err, result)=> {
				if(err) {
					reject(err)
				}
				connection.release()
				resolve(result)
			})
		})
	}) 	
}


async function Neo4j_db(cypher) {
	return new Promise((resolve, reject) => {
		db.cypherQuery(cypher, function(err, result) {
		    if(err) { 
		    	return console.error(err) 
		    	reject(err)
		    }
		    resolve(result)
		})
	})
}

module.exports = {
	MySQL_db: MySQL_db,
	Redis_db: new redis(Redis_config),
	Neo4j_db: Neo4j_db
}



    