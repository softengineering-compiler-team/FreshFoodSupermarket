const db = require('../utils/db.js')

async function order(ctx, next) {
	let sql = `select  receive.*, goods.goodsName from receive inner join goods on receive.goodsNo = goods.goodsNo where status = 0 order by orderTime desc, orderNo desc`
	console.log(sql);
	let data = await db(sql)
	console.log(data)

	ctx.body = {
		code: 0,
		data: data
	}
}

module.exports = {
	order: order
	
}

