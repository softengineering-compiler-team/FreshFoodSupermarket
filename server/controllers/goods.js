const GoodsModel = require('../Models/GoodsModel')

class Goods {
	static async all(ctx, next) {
		ctx.session.refresh()

		let goodsName = ctx.request.query.goodsName 
		let data = await GoodsModel.all(goodsName)

		ctx.body = {
			code: 0,
			data: data
		}
	}

	static async function fruits(ctx, next) {
		ctx.session.refresh()

		let data = await GoodsModel.fruits()

		ctx.body = {
			code: 0,
			data: data
		}
	}

	static async function vegetables(ctx, next) {
		ctx.session.refresh()

		let data = await GoodsModel.fruits()
		
		ctx.body = {
			code: 0,
			data: data
		}
	}

	static async function seafoods(ctx, next) {
		ctx.session.refresh()

		let data = await GoodsModel.seafoods()
		
		ctx.body = {
			code: 0,
			data: data
		}
	}

	static async function meat(ctx, next) {
		ctx.session.refresh()

		let data = await GoodsModel.meat()
		
		ctx.body = {
			code: 0,
			data: data
		}
	}

	static async function dairy(ctx, next) {
		ctx.session.refresh()
		
		let data = await GoodsModel.dairy()
		
		ctx.body = {
			code: 0,
			data: data
		}
	}

}




module.exports = Goods

