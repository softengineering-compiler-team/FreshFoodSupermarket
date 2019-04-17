const db = require('../utils/db.js')

async function address(ctx, next) {

	let username = ctx.request.query.username

	let sql = `select * from address where username = '${username}' order by isdefault desc`

	let data = await db(sql)
	ctx.body = {
		code: 0,
		data: data
	}
}

async function insertAddress(ctx, next) {

	let username = ctx.request.body.username
	let province = ctx.request.body.province
	let city = ctx.request.body.city
	let county = ctx.request.body.county
	let street = ctx.request.body.street
	let addressname = ctx.request.body.addressname
	let default_ = ctx.request.body.default

	let sql = `insert into address (username, province, city, county, street, addressname, isdefault) values ('${username}', '${province}', '${city}', '${county}', '${street}', '${addressname}', ${default_})`

	let data = await db(sql)
	ctx.body = {
		code: 0,
		data: {
			msg: "填写成功！"
		}
	}
}

module.exports = {
	address: address,
	insertAddress: insertAddress
}

