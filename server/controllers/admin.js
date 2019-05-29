const AdminModel = require('../Models/AdminModel')

async function dayheat(ctx,next){
	ctx.session.refresh()
	let data = await AdminModel.dayheat()
	ctx.body = {
		code:0,
		data:data
	}
}

async function weekheat(ctx,next){
	ctx.session.refresh()
	let data = await AdminModel.weekheat()
	ctx.body = {
		code:0,
		data:data
	}
}

async function monthheat(ctx,next){
	ctx.session.refresh()
	let data = await AdminModel.monthheat()
	ctx.body = {
		code:0,
		data:data
	}
}

async function daysale(ctx,next){
	ctx.session.refresh()
	let data = await AdminModel.daysale()
	ctx.body = {
		code:0,
		data:data
	}
}

async function weeksale(ctx,next){
	ctx.session.refresh()
	let data = await AdminModel.weeksale()
	ctx.body = {
		code:0,
		data:data
	}
}

async function monthsale(ctx,next){
	ctx.session.refresh()
	let data = await AdminModel.monthsale()
	ctx.body = {
		code:0,
		data:data
	}
}

async function dayprofit(ctx,next){
	ctx.session.refresh()
	let data = await AdminModel.dayprofit()
	ctx.body = {
		code:0,
		data:data
	}
}

async function weekprofit(ctx,next){
	ctx.session.refresh()
	let data = await AdminModel.weekprofit()
	ctx.body = {
		code:0,
		data:data
	}
}

async function monthprofit(ctx,next){
	ctx.session.refresh()
	let data = await AdminModel.monthprofit()
	ctx.body = {
		code:0,
		data:data
	}
}

async function order(ctx, next) {
	ctx.session.refresh()
	let username = ctx.session.user.userName
	let data = await AdminModel.order(username)

	ctx.body = {
		code: 0,
		data: data
	}
}

async function inventory(ctx, next) {
	ctx.session.refresh()
	let data = await AdminModel.inventory()
	ctx.body = {
		code: 0,
		data: data
	}
}

async function takeorder(ctx, next) {
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

async function finishorder(ctx, next) {
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

async function saleall(ctx, next) {
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

async function purchase(ctx, next) {
	ctx.session.refresh()
	await AdminModel.purchase(goodsList, import_time)
	
	ctx.body = {
		code: 0,
		data:{
			msg : "买入成功!"
		}
	}
}
async function allorder(ctx, next) {
	ctx.session.refresh()
	let status = ctx.request.query.status
	let totalData = await AdminModel.allorder(status)
	ctx.body = {
		code: 0,
		data: totalData
	}
}
async function delivery(ctx, next) {
	ctx.session.refresh()
	let totalData = await AdminModel.delivery()
	ctx.body = {
		code: 0,
		data: totalData
	}
}

module.exports = Admin

