const domain = require('../config/Domain-config')
const UserModel = require('../Models/UserModel')

class User {
	/*注册*/
	static async signup(ctx, next) {
		let msg = ``
		let code = 0
		let {username, password, email} = ctx.request.body

		if(username.trim().length === 0||password.trim().length  === 0) {
			ctx.body = {
				code: -1,
				data: {
					msg : "用户名或密码不符合规范！"
				}
			}
			return
		}

		const isExistUser = await UserModel.username(username)

		if(isExistUser) {
			code = -1
			msg = "用户名已存在！"
		} else {
			await UserModel.signup(username, password, email)
			code = 0
			msg = "注册成功！"	
		}
		ctx.body = {
			code: code,
			data: {
				msg : msg
			}
		}
	}

	/*登录*/
	static async signin(ctx, next) {
		let code = 0
		let msg = ``
		let {username, password, token, check_code} = ctx.request.body

		let isCodeValid = await UserModel.isCodeValid(token, check_code)

		if(isCodeValid === -1) {
			code = 2
			msg = '验证码失效！'
		} else if(isCodeValid === 0) {
			code = 3
			msg = '验证码输入错误！'
		} else {
			let isValid = await UserModel.signin(username, password)

			if(!isValid) {
					code = -1
					msg = "用户名或密码错误！"
			} else {

				ctx.cookies.set('username', encodeURIComponent(username) , {
					signed: false,
		           	domain: domain,
		         	path:'*',   
		         	maxAge:1000*60*30,
		         	httpOnly:false,
		         	overwrite:false
				})

				ctx.session.user = {userName: username}

				code = 0
				msg = "登录成功！"
			
			}
		}
		
		ctx.body = {
			code: code,
			data: {
				msg : msg
			}
		}
	}

	/*找回密码*/
	static async retrieve(ctx, next) {

		let username = ctx.request.body.username
		await UserModel.retrieve(username)

	   	ctx.body = {
	       	code: 0,
	       	data: {
	       		msg: '用户身份验证成功！'
	   		}
	    }
	}

	/*密码重置*/
	static async reset(ctx, next) {
		let {token, password} = ctx.request.body

		let msg = await UserModel.reset(token, password)
		
		ctx.body = {
			code: 0,
			data: {
				msg: msg
			}
		}
	}

	/*登出*/
	/*增加超时机制*/
	/*暂时未手动删除redis数据库中sessionsid*/
	static async signout(ctx, next) {
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
	static async address(ctx, next) {
		ctx.session.refresh()

		let username = ctx.request.query.username
		let data = await UserModel.address(username)

		ctx.body = {
			code: 0,
			data: data
		}
	}

	/*新增个人地址*/
	static async insertAddress(ctx, next) {
		ctx.session.refresh()
		let {username, province, city, county, street, addressname} = ctx.request.body
		let default_ = ctx.request.body.default
		await UserModel.insertAddress(username, province, city, county, street, addressname, default_)
		ctx.body = {
			code: 0,
			data: {
				msg: "填写成功！"
			}
		}
	}

	/*删除不需要的地址*/
	static async deleteaddress(ctx, next){
		addressNo = ctx.request.body.addressNo
		let [code, msg] = await UserModel.deleteaddress(addressNo)
		ctx.body = {
			code: code,
			data:{
				msg: msg
			}
		}
	}

	/*个人推荐（猜你喜欢）*/
	static async fav(ctx, next) {
		ctx.session.refresh()
		let username = ctx.request.body.username
		let data = await UserModel.fav(username)

	    ctx.body = {
	    	code: 0,
	    	data: data
	    }
	}
}

module.exports = User