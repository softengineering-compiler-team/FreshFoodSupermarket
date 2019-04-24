const db = require('../utils/db.js')
const nodemailer = require('nodemailer')
const md5 = require('md5')
const Redis_db = (require('../utils/db')).Redis_db

/*注册*/
async function signup(ctx, next) {
	let username = ctx.request.body.username
	let password = ctx.request.body.password
	let email = ctx.request.body.email

	let sql1 = `select * from user where username = '${username}'`
	let data1 = await db.MySQL_db(sql1)

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
		await db.MySQL_db(sql2)
		ctx.body = {
			code: 0,
			data: {
				msg : "注册成功！"
			}
		}
	}
}

/*找回密码*/
async function retrieve(ctx, next) {
	let username = ctx.request.body.username
	let sql = `select email from user where username = '${username}'`
	let email = (await db.MySQL_db(sql))[0]
	console.log(email);
	return 
}

/*登录*/
async function signin(ctx, next) {

	let username = ctx.request.body.username
	let password = ctx.request.body.password

	let sql = `select * from user where username = '${username}' and password = '${password}'`

	let data = await db.MySQL_db(sql)

	if(data.length === 0) {
		ctx.body = {
			code: -1,
			data: {
				msg : "用户名或密码错误！"
			}
		}
		return 
	} else {
		ctx.session.user = JSON.stringify({userName: data[0].username})
		ctx.body = {
			code: 0,
			data: {
				msg : "登录成功！"
			}
		}
		
	}
}

/*登出*/
/*增加超时机制*/
/*暂时未手动删除redis数据库中sessionsid*/
async function signout(ctx, next) {
	ctx.session = {};
	ctx.render('index', {
		title: '请登录'
	})

}

/*查询个人地址*/
async function address(ctx, next) {

	let username = ctx.request.query.username

	let sql = `select * from address where username = '${username}' order by isdefault desc`

	let data = await db.MySQL_db(sql)
	ctx.body = {
		code: 0,
		data: data
	}
}

/*新增个人地址*/
async function insertAddress(ctx, next) {

	let username = ctx.request.body.username
	let province = ctx.request.body.province
	let city = ctx.request.body.city
	let county = ctx.request.body.county
	let street = ctx.request.body.street
	let addressname = ctx.request.body.addressname
	let default_ = ctx.request.body.default

	let sql = `insert into address (username, province, city, county, street, addressname, isdefault) values ('${username}', '${province}', '${city}', '${county}', '${street}', '${addressname}', ${default_})`

	let data = await db.MySQL_db(sql)
	ctx.body = {
		code: 0,
		data: {
			msg: "填写成功！"
		}
	}
}

module.exports = {
	signup: signup,
	retrieve: retrieve,
	signin: signin,
	signout: signout,
	address: address,
	insertAddress: insertAddress
}

