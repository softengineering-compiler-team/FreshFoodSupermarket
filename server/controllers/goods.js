const db = require('../utils/db.js')

async function goods(ctx, next) {
	let goodsName = ctx.request.query.goodsName
	let sql = `select * from goods where goodsName = '${goodsName}'`
	let data = await db(sql)
	ctx.body = {
		code: 0,
		data: data
	}
}

module.exports = goods
