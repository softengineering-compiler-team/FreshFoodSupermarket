const domain = require('../config/Domain-config')
const OrderModel = require('../Models/OrderModel')

class Order {

	/*用户购买商品*/
	static async add(ctx, next) {
		ctx.session.refresh()
		
		let goodsList = ctx.request.body.goods

		let orderTime = (new Date()).toLocaleString()

		let username = goodsList[0].username

		await OrderModel.add(goodsList, orderTime, username) 

		ctx.body = {
			code: 0,
			data: {
				msg: "下单成功！"
			}
		}
	}

	static async search(ctx, next) {
		ctx.session.refresh()
		let username = ctx.session.user.userName
		console.log(ctx.session.user)
		let data = await OrderModel.search(username)

		ctx.body = {
			code: 0,
			data: data
		}
	}

	
}

module.exports = Order

