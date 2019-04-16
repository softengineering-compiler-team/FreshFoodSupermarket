const db = require('../utils/db.js')

async function signup(ctx, next) {

	let username = ctx.request.body.username
	let password = ctx.request.body.password
	let email = ctx.request.body.email

	let sql1 = `select * from user where username = '${username}'`
	let data1 = await db(sql1)

	if(data1.length != 0) {
		ctx.body = {
			code: -1,
			data: {
				msg: "用户名已存在！"
			}
		}
		return
	} else {
		let sql2 = `insert into user (username, password, email) values ('${username}', '${password}', '${email}')`
		let data2 = await db(sql2)
		console.log(data2);
		ctx.body = {
			code: 0,
			data: {
				msg : "注册成功！"
			}
		}
	}
}

module.exports = signup