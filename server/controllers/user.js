const db = require('../utils/db.js')
const nodemailer = require('nodemailer')
const md5 = require('md5')
const Redis_db = (require('../utils/db')).Redis_db
const domain = require('../config/Domain-config')
const Neo4j_db = (require('../utils/db')).Neo4j_db
const randomNos = require('../utils/randomNos')

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
		
		let cypher = `create(user:User{username:'${username}'})`
		
		let neo4j_data = await Neo4j_db(cypher)

		console.log(neo4j_data)

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

	var params = {
	    host: 'smtp.163.com',
	    port: 465,
	    sercure: true,
	    auth: {
	        user: '18365225454@163.com',
	        pass: 'yetiandi123'
	    }
	} 

	let username = ctx.request.body.username
	let sql = `select username, email from user where username = '${username}'`
	let token = md5(username + (new Date()).toLocaleString() + Math.random())
	let email = (await db.MySQL_db(sql))[0].email
	const mailOptions = {
        from: '18365225454@163.com', 
        to: email, 
        subject: '叶鲜生生鲜超市找回密码', 
        html: `<a href='http://${domain}:8000/#/reset?token=${token}'><b>请在五分钟内点击链接完成验证，并进行密码重置</b></a>` 
    }

    const transporter = nodemailer.createTransport(params)

    await transporter.sendMail(mailOptions, async function(err, info) {

        if (err) { return console.log(err) }
        await Redis_db.set(token, username);
        await Redis_db.expire(token, 300);
        console.log(`Emial sent to ${username}: ${email} sent successfully!`); 
    })

   	ctx.body = {
       	code: 0,
       	data: {
       		msg: '用户身份验证成功！'
   		}
    }
}

/*密码重置*/
async function reset(ctx, next) {

	let token = ctx.request.body.token

	let password = ctx.request.body.password

	let response = await Redis_db.exists(token)
	var msg = ''

	if(response === 1) {

		let username = await Redis_db.get(token)

		let sql = `update user set password = '${password}' where username = '${username}'`
		await db.MySQL_db(sql)
		await Redis_db.del(token)
		msg = '密码重置成功！'
		
	} else if(response === 0){

		msg = '邮箱验证链接已经过期！'
	} 

	ctx.body = {
		code: 0,
		data: {
			msg: msg
		}
	}
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

		ctx.cookies.set('username', encodeURIComponent(username) , {
			signed: false,
           	domain: domain,
         	path:'*',   
         	maxAge:1000*60*30,
         	httpOnly:false,
         	overwrite:false
		})

		ctx.session.user = {userName: data[0].username}

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
	ctx.session = {}

	ctx.cookies.set('username', '' , {
		signed: false,
       	domain: domain,
     	path: '*',   
     	maxAge: 0,
     	httpOnly: false,
     	overwrite: false
 	})

	ctx.body = {
		code: 0,
		data: {
			msg: "退出成功！"
		}
	}

}

/*查询个人地址*/
async function address(ctx, next) {
	ctx.session.refresh()

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
	ctx.session.refresh()

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

/*用户购买商品*/
async function buy(ctx, next) {
	ctx.session.refresh()
	
	let goodsList = ctx.request.body.goods

	let orderTime = (new Date()).toLocaleString()

	let username = goodsList[0].username

	let sql = `insert into receive (username, goodsNo, orderNo, num, orderTime, subtotal, address) values `

	for(let i=0; i<goodsList.length; i++) {
		if(i < goodsList.length - 1) {
			sql += `('${username}', '${goodsList[i].goodsNo}', '${md5(username + orderTime + goodsList[i].subtotal)}', '${goodsList[i].num}', '${orderTime}', ${goodsList[i].subtotal}, '${goodsList[i].address}'), `

		} else {
			sql += `('${username}', '${goodsList[i].goodsNo}', '${md5(username + orderTime + goodsList[i].subtotal)}', '${goodsList[i].num}', '${orderTime}', ${goodsList[i].subtotal}, '${goodsList[i].address}')`
		}
	}

	await db.MySQL_db(sql)

	let cypher = `match(user:User{username: '${username}'}) create`
	for(let i=0; i<goodsList.lenght; i++) {
		if(i < goodsList.length - 1) {
			cypher += `(user)-[:Buy{num:${goodsList[i].num}}]->(:Goods{goodsNo: ${goodsList[i].goodsNo}}), `
		} else {
			cypher += `(user)-[:Buy{num:${goodsList[i].num}}]->(:Goods{goodsNo: ${goodsList[i].goodsNo}})`
		}
		
	}

	ctx.body = {
		code: 0,
		data: {
			msg: "下单成功！"
		}
	}

	await Neo4j_db(cypher)

}

/*个人推荐（猜你喜欢）*/
async function fav(ctx, next) {
	ctx.session.refresh()
	let username = ctx.request.body.username
	let cypher = `match p=(host:User)-[:SimilarTo|Buy*1..6]-(pg:Goods)
                    where host.username = '${username}'
                    and not (host)-[:Buy]->(pg)
                    return pg.goodsNo as goodsNo
                    limit 5`



    let goodsList = (await Neo4j_db(cypher)).data

    if(goodsList.length === 0) {
    	cypher = `match (goods:Goods)
    				return goods.goodsNo`
    	goodsList = randomNos()

    }

    let sql = `select goodsNo, goodsName, type, subtype, price, inventory, validity, description from goods where goodsNo in (${goodsList[0]}, ${goodsList[1]}, ${goodsList[2]}, ${goodsList[3]}, ${goodsList[4]})`

    let data = await db.MySQL_db(sql)

    ctx.body = {
    	code: 0,
    	data: data
    }
}

module.exports = {
	signup: signup,
	retrieve: retrieve,
	reset: reset,
	signin: signin,
	fav: fav,
	address: address,
	insertAddress: insertAddress,
	buy: buy,
	signout: signout,	
}

