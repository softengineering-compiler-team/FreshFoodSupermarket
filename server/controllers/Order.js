const domain = require('../config/Domain-config')
const OrderModel = require('../Models/OrderModel')
const GoodsModel = require('../Models/GoodsModel')

class Order {

	/*用户购买商品*/
	static async add(ctx, next) {
		ctx.session.refresh()
		let code = 0
		let data = null
		let goodsList = ctx.request.body.goods

		let orderTime = (new Date()).toLocaleString()

		let username = goodsList[0].username

		let [status, invalidGoodsNo] = await OrderModel.add(goodsList, orderTime, username) 

		if(status === 0) {
			data = await GoodsModel.goodsNos2goodsNames(invalidGoodsNo)
			code = -1
		} else {
			data = "下单成功！"
		}

		ctx.body = {
			code: code,
			data: data
		}
	}

	static async search(ctx, next) {
		ctx.session.refresh()

		let username = decodeURI(ctx.cookies.get('username'))
		let data = await OrderModel.search(username)

		ctx.body = {
			code: 0,
			data: data
		}
	}

	
}

module.exports = Order

