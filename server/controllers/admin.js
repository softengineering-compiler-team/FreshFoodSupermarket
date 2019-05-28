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
	let goodsList = ctx.request.body.goods
	console.log(goodsList);
	
	let import_time = (new Date()).toLocaleString()
	for(let i=0; i<goodsList.length; i++) {
		let sql = `UPDATE goods SET inventory = inventory + '${goodsList[i].num}' , import_time = '${import_time}' WHERE goodsName = '${goodsList[i].goodsName}'`
		console.log(sql);
		
		await db.MySQL_db(sql)
	}
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
	//let username = ctx.session.user.userName
	let sql=''
	if (status) {
		sql = `select  receive.*, goods.goodsName from receive inner join goods on receive.goodsNo = goods.goodsNo where status = '${status}' order by orderTime desc, orderNo desc`
	}
	else{
		sql = `select  receive.*, goods.goodsName from receive inner join goods on receive.goodsNo = goods.goodsNo order by orderTime desc, orderNo desc`
	}
	
	let data = await db.MySQL_db(sql)
	var totalData = []
	let orderNo = data[0].orderNo
	var orderNum = new Array()
	orderNum.push(orderNo)

	for(let i=0;i<data.length;i++){
		let temporder = data[i].orderNo
		if(temporder != orderNo){
			orderNum.push(temporder)
			orderNo = temporder
		}
	}
	for(let i=0;i<orderNum.length;i++){
		let temporder = orderNum[i]
		let sql1 = ''
		if (status) {
			sql1 = `SELECT  receive.*, goods.goodsName FROM receive ,goods WHERE receive.goodsNo = goods.goodsNo AND STATUS = '${status}' AND orderNo = '${temporder}'`
		}
		else{
			 sql1 = `SELECT  receive.*, goods.goodsName FROM receive ,goods WHERE receive.goodsNo = goods.goodsNo AND orderNo = '${temporder}'`
		}
		
		let data1 = await db.MySQL_db(sql1)
		var goodsList = new Array()

		var orderData = {}
		let total = 0
		orderData['orderNo'] = data1[0].orderNo
		for(let j=0;j<data1.length;j++){
			var goodsObj = {}
			goodsObj['goodsName'] = data1[j].goodsName
			goodsObj['num'] = data1[j].num
			goodsList.push(goodsObj)
			total += data1[j].subtotal
		}
		
		orderData['goodsList'] = goodsList
		orderData['total'] = total
		orderData['orderTime'] = data1[0].orderTime
		orderData['username'] = data1[0].username
		orderData['status'] = data1[0].status
		orderData['address'] = data1[0].address
		totalData.push(orderData)
	}
	ctx.body = {
		code: 0,
		data: totalData
	}
}
async function delivery(ctx, next) {
	ctx.session.refresh()
	//let username = ctx.request.query.username
	//let username = ctx.session.user.userName
	let sql = `select  receive.*, goods.goodsName from receive inner join goods on receive.goodsNo = goods.goodsNo where status = 1 order by orderTime desc, orderNo desc`
	let data = await db.MySQL_db(sql)
	var totalData = []
	let orderNo = data[0].orderNo
	var orderNum = new Array()
	orderNum.push(orderNo)

	for(let i=0;i<data.length;i++){
		let temporder = data[i].orderNo
		if(temporder != orderNo){
			orderNum.push(temporder)
			orderNo = temporder
		}
	}
	for(let i=0;i<orderNum.length;i++){
		let temporder = orderNum[i]
		let sql1 = `SELECT  receive.*, goods.goodsName FROM receive ,goods WHERE receive.goodsNo = goods.goodsNo AND STATUS = 1 AND orderNo = '${temporder}'`
		let data1 = await db.MySQL_db(sql1)
		var goodsList = new Array()

		var orderData = {}
		let total = 0
		orderData['orderNo'] = data1[0].orderNo
		for(let j=0;j<data1.length;j++){
			var goodsObj = {}
			goodsObj['goodsName'] = data1[j].goodsName
			goodsObj['num'] = data1[j].num
			goodsList.push(goodsObj)
			total += data1[j].subtotal
		}
		
		orderData['goodsList'] = goodsList
		orderData['total'] = total
		orderData['orderTime'] = data1[0].orderTime
		orderData['username'] = data1[0].username
		orderData['status'] = data1[0].status
		orderData['address'] = data1[0].address
		totalData.push(orderData)
	}
	ctx.body = {
		code: 0,
		data: totalData
	}
}

module.exports = Admin

