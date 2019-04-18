const db = require('../utils/db.js')
const md5 = require('md5')

async function buy(ctx, next) {
	
	let goodsList = ctx.request.body.goods

	let orderTime = (new Date()).toLocaleString()

	let sql = `insert into receive (username, goodsNo, orderNo, num, orderTime, subtotal, address) values `

	for(let i=0; i<goodsList.length; i++) {
		if(i < goodsList.length - 1) {
			sql += `('${goodsList[i].username}', '${goodsList[i].goodsNo}', '${md5(goodsList[i].username + orderTime + goodsList[i].subtotal)}', '${goodsList[i].num}', '${orderTime}', ${goodsList[i].subtotal}, '${goodsList[i].address}'), `

		} else {
			sql += `('${goodsList[i].username}', '${goodsList[i].goodsNo}', '${md5(goodsList[i].username + orderTime + goodsList[i].subtotal)}', '${goodsList[i].num}', '${orderTime}', ${goodsList[i].subtotal}, '${goodsList[i].address}')`
		}
	}

	await db(sql)

	ctx.body = {
		code: 0,
		data: {
			msg: "下单成功！"
		}
	}
}

module.exports = buy