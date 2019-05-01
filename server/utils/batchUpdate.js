const MySQL_db = require('../utils/db.js').MySQL_db

async function batchUpdate(goodsList) {
	for(let i=0; i<goodsList.length; i++) {
		let sql = `update fav set goodsNo = goodsNo + ${goodsList[i].num} where username = '${goodsList[i].username}' and goodsNo = '${goodsList[i].goodsNo}`
	}
	await MySQL_db(sql)
	let data = ''
	return data
}

module.exports = batchUpdate