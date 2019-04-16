const db = require('../utils/db.js')

async function signin(ctx, next) {

	let username = ctx.request.body.username
	let password = ctx.request.body.password

	let sql = `select * from user where username = '${username}' and password = '${password}'`

	let data = await db(sql)

	if(data.length === 0) {
		ctx.body = {
			code: -1,
			data: {
				msg : "用户名或密码错误！"
			}
		}
		return 
	} else {
		ctx.body = {
			code: 0,
			data: {
				msg : "登录成功！"
			}
		}
	}
}

module.exports = signin