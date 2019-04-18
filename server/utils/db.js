const config = require('../config/config') 
const mysql = require('mysql'),
      pool  = mysql.createPool(config);

async function db(sql) {
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

module.exports = db



    