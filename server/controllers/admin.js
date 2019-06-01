const AdminModel = require('../Models/AdminModel')

class Admin {
	static async dayheat(ctx,next){
		ctx.session.refresh()
		let data = await AdminModel.dayheat()
		ctx.body = {
			code:0,
			data:data
		}
	}

	static async weekheat(ctx,next){
		ctx.session.refresh()
		let data = await AdminModel.weekheat()
		ctx.body = {
			code:0,
			data:data
		}
	}

	static async monthheat(ctx,next){
		ctx.session.refresh()
		let data = await AdminModel.monthheat()
		ctx.body = {
			code:0,
			data:data
		}
	}

	static async daysale(ctx,next){
		ctx.session.refresh()
		let data = await AdminModel.daysale()
		ctx.body = {
			code:0,
			data:data
		}
	}

	static async weeksale(ctx,next){
		ctx.session.refresh()
		let data = await AdminModel.weeksale()
		ctx.body = {
			code:0,
			data:data
		}
	}

	static async monthsale(ctx,next){
		ctx.session.refresh()
		let data = await AdminModel.monthsale()
		ctx.body = {
			code:0,
			data:data
		}
	}

	static async dayprofit(ctx,next){
		ctx.session.refresh()
		let data = await AdminModel.dayprofit()
		ctx.body = {
			code:0,
			data:data
		}
	}

	static async weekprofit(ctx,next){
		ctx.session.refresh()
		let data = await AdminModel.weekprofit()
		ctx.body = {
			code:0,
			data:data
		}
	}

	static async monthprofit(ctx,next){
		ctx.session.refresh()
		let data = await AdminModel.monthprofit()
		ctx.body = {
			code:0,
			data:data
		}
	}

	static async inventory(ctx, next) {
		ctx.session.refresh()
		let data = await AdminModel.inventory()
		ctx.body = {
			code: 0,
			data: data
		}
	}

	static async takeorder(ctx, next) {
		ctx.session.refresh()

		let orderNo = ctx.request.body.orderNo
		let [code, msg] = await AdminModel.takeorder(orderNo)

		ctx.body = {
			code: code,
			data:{
				msg : msg
			}
		} 
	}

	static async finishorder(ctx, next) {
		ctx.session.refresh()

		let orderNo = ctx.request.body.orderNo
		let finishTime = (new Date()).toLocaleString()

		let [code, msg] = await AdminModel.finishorder(orderNo, finishTime)

		ctx.body = {
			code: code,
			data:{
				msg : msg
			}
		}
	}

	static async saleall(ctx, next) {
		ctx.session.refresh()
		let goodsName = ctx.request.body.goods
		await AdminModel.saleall(goodsName)
		
		ctx.body = {
			code: 0,
			data:{
				msg : "卖出成功!"
			}
		}
	}

	static async purchase(ctx, next) {
		ctx.session.refresh()
		let goodsList = ctx.request.body.goods
		let import_time = (new Date()).toLocaleString()
		await AdminModel.purchase(goodsList, import_time)
		
		ctx.body = {
			code: 0,
			data:{
				msg : "买入成功!"
			}
		}
	}
	
	static async delivery(ctx, next) {
		ctx.session.refresh()
		let totalData = await AdminModel.delivery()
		ctx.body = {
			code: 0,
			data: totalData
		}
	}

}


module.exports = Admin