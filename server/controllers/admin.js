const db = require('../utils/db.js')
async function dayheat(ctx,next){
	ctx.session.refresh()

	var data = new Array()
	let sql1 = 'SELECT COUNT(*) as num,goods.`subType`,any_value(receive.`orderTime`) AS orderTime FROM receive,goods WHERE DATE_SUB(CURDATE(), INTERVAL 24 HOUR) <= DATE(receive.`orderTime`) AND receive.`goodsNo`=goods.`goodsNo` GROUP BY goods.`subType` ORDER BY COUNT(*) DESC limit 5'
	let dayData = await db.MySQL_db(sql1)
	for(let i=0;i<dayData.length;i++){
		var dayheat = {}
		dayheat['num'] = dayData[i].num
		dayheat['subType'] = dayData[i].subType
		data.push(dayheat)
	}
	ctx.body = {
		code:0,
		data:data
	}
}


async function weekheat(ctx,next){
	ctx.session.refresh()

	var data = new Array()
	let sql1 = 'SELECT COUNT(*) AS num,goods.`subType`,any_value(receive.`orderTime`) AS orderTime FROM receive,goods WHERE DATE_SUB(CURDATE(), INTERVAL 7 DAY) <= DATE(receive.`orderTime`) AND receive.`goodsNo`=goods.`goodsNo` GROUP BY goods.`subType` ORDER BY COUNT(*) DESC limit 5'
	let dayData = await db.MySQL_db(sql1)
	for(let i=0;i<dayData.length;i++){
		var dayheat = {}
		dayheat['num'] = dayData[i].num
		dayheat['subType'] = dayData[i].subType
		data.push(dayheat)
	}
	ctx.body = {
		code:0,
		data:data
	}
}


async function monthheat(ctx,next){
	ctx.session.refresh()

	var data = new Array()
	let sql1 = 'SELECT COUNT(*) AS num,goods.`subType`,any_value(receive.`orderTime`) AS orderTime FROM receive,goods WHERE DATE_SUB(CURDATE(), INTERVAL 30 DAY) <= DATE(receive.`orderTime`) AND receive.`goodsNo`=goods.`goodsNo` GROUP BY goods.`subType` ORDER BY COUNT(*) DESC limit 5'
	let dayData = await db.MySQL_db(sql1)
	for(let i=0;i<dayData.length;i++){
		var dayheat = {}
		dayheat['num'] = dayData[i].num
		dayheat['subType'] = dayData[i].subType
		data.push(dayheat)
	}
	ctx.body = {
		code:0,
		data:data
	}
}


async function daysale(ctx,next){
	ctx.session.refresh()

	var data = new Array()
	let sql1 = 'SELECT COUNT(*) AS num,goods.`subType`,any_value(receive.`orderTime`) AS orderTime,SUM(receive.`subtotal`) AS total FROM receive,goods  WHERE DATE_SUB(CURDATE(), INTERVAL 1 DAY) <= DATE(receive.`orderTime`) AND receive.`goodsNo`=goods.`goodsNo`  GROUP BY goods.`subType` ORDER BY total DESC'
	let dayData = await db.MySQL_db(sql1)
	for(let i=0;i<dayData.length;i++){
		var dayheat = {}
		dayheat['total'] = dayData[i].total
		dayheat['subType'] = dayData[i].subType
		data.push(dayheat)
	}
	ctx.body = {
		code:0,
		data:data
	}
}


async function weeksale(ctx,next){
	ctx.session.refresh()

	var data = new Array()
	let sql1 = 'SELECT COUNT(*) AS num,goods.`subType`,any_value(receive.`orderTime`) AS orderTime,SUM(receive.`subtotal`) AS total FROM receive,goods  WHERE DATE_SUB(CURDATE(), INTERVAL 7 DAY) <= DATE(receive.`orderTime`) AND receive.`goodsNo`=goods.`goodsNo`  GROUP BY goods.`subType` ORDER BY total DESC'
	let dayData = await db.MySQL_db(sql1)
	for(let i=0;i<dayData.length;i++){
		var dayheat = {}
		dayheat['total'] = dayData[i].total
		dayheat['subType'] = dayData[i].subType
		data.push(dayheat)
	}
	ctx.body = {
		code:0,
		data:data
	}
}


async function monthsale(ctx,next){
	ctx.session.refresh()

	var data = new Array()
	let sql1 = 'SELECT COUNT(*) AS num,goods.`subType`,any_value(receive.`orderTime`) AS orderTime,SUM(receive.`subtotal`) AS total FROM receive,goods  WHERE DATE_SUB(CURDATE(), INTERVAL 30 DAY) <= DATE(receive.`orderTime`) AND receive.`goodsNo`=goods.`goodsNo`  GROUP BY goods.`subType` ORDER BY total DESC'
	let dayData = await db.MySQL_db(sql1)
	for(let i=0;i<dayData.length;i++){
		var dayheat = {}
		dayheat['total'] = dayData[i].total
		dayheat['subType'] = dayData[i].subType
		data.push(dayheat)
	}
	ctx.body = {
		code:0,
		data:data
	}
}


async function dayprofit(ctx,next){
	ctx.session.refresh()

	var data = new Array()
	let sql1 = 'SELECT COUNT(*) AS num,goods.`subType`,any_value(receive.`orderTime`) AS orderTime,SUM(receive.`subtotal`)-SUM(goods.`cost`) AS total FROM receive,goods WHERE DATE_SUB(CURDATE(), INTERVAL 1 DAY) <= DATE(receive.`orderTime`) AND receive.`goodsNo`=goods.`goodsNo` GROUP BY goods.`subType` ORDER BY total DESC'
	let dayData = await db.MySQL_db(sql1)
	for(let i=0;i<dayData.length;i++){
		var dayheat = {}
		dayheat['total'] = dayData[i].total
		dayheat['subType'] = dayData[i].subType
		data.push(dayheat)
	}
	ctx.body = {
		code:0,
		data:data
	}
}


async function weekprofit(ctx,next){
	ctx.session.refresh()

	var data = new Array()
	let sql1 = 'SELECT COUNT(*) AS num,goods.`subType`,any_value(receive.`orderTime`) AS orderTime,SUM(receive.`subtotal`)-SUM(goods.`cost`) AS total FROM receive,goods WHERE DATE_SUB(CURDATE(), INTERVAL 7 DAY) <= DATE(receive.`orderTime`) AND receive.`goodsNo`=goods.`goodsNo` GROUP BY goods.`subType` ORDER BY total DESC'
	let dayData = await db.MySQL_db(sql1)
	for(let i=0;i<dayData.length;i++){
		var dayheat = {}
		dayheat['total'] = dayData[i].total
		dayheat['subType'] = dayData[i].subType
		data.push(dayheat)
	}
	ctx.body = {
		code:0,
		data:data
	}
}


async function monthprofit(ctx,next){
	ctx.session.refresh()

	var data = new Array()
	let sql1 = 'SELECT COUNT(*) AS num,goods.`subType`,any_value(receive.`orderTime`) AS orderTime,SUM(receive.`subtotal`)-SUM(goods.`cost`) AS total FROM receive,goods WHERE DATE_SUB(CURDATE(), INTERVAL 30 DAY) <= DATE(receive.`orderTime`) AND receive.`goodsNo`=goods.`goodsNo` GROUP BY goods.`subType` ORDER BY total DESC'
	let dayData = await db.MySQL_db(sql1)
	for(let i=0;i<dayData.length;i++){
		var dayheat = {}
		dayheat['total'] = dayData[i].total
		dayheat['subType'] = dayData[i].subType
		data.push(dayheat)
	}
	ctx.body = {
		code:0,
		data:data
	}
}


async function order(ctx, next) {
	ctx.session.refresh()

	//let username = ctx.request.query.username
	let username = ctx.session.user.userName
	let sql = `select  receive.*, goods.goodsName from receive inner join goods on receive.goodsNo = goods.goodsNo where status = 0 and username ='${username}' order by orderTime desc, orderNo desc`
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
		let sql1 = `SELECT  receive.*, goods.goodsName FROM receive ,goods WHERE receive.goodsNo = goods.goodsNo AND STATUS = 0 AND orderNo = '${temporder}' and username ='${username}' order by orderTime desc`
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
		totalData.push(orderData)
	}
	ctx.body = {
		code: 0,
		data: totalData
	}
}

async function inventory(ctx, next) {
	ctx.session.refresh()
	let sql = `SELECT subtype,goodsName,cost,DATE_SUB(import_time,INTERVAL validity HOUR) AS guarantee_period,inventory FROM goods ORDER BY guarantee_period  `
	let invent = await db.MySQL_db(sql)
	var data = []
	data.push(invent)
	ctx.body = {
		code: 0,
		data: data
	}
}
async function takeorder(ctx, next) {
	ctx.session.refresh()

	let orderNo = ctx.request.body.orderNo
	let sql = `UPDATE receive SET STATUS = 1 WHERE orderNo = '${orderNo}'`
	let data = await db.MySQL_db(sql)
	if (data.length === 0) {
		ctx.body = {
			code: -1,
			data:{
				msg : "接单失败!"
			}
		} 
		return

	} else {
		ctx.body = {
			code: 0,
			data:{
				msg : "接单成功!"
			}
		}
	}
}
async function finishorder(ctx, next) {
	ctx.session.refresh()

	let orderNo = ctx.request.body.orderNo
	let finishTime = (new Date()).toLocaleString()
	let sql = `UPDATE receive SET STATUS = 2 and '${finishTime}' WHERE orderNo = '${orderNo}'`
	let data = await db.MySQL_db(sql)
	if (data.length === 0) {
		ctx.body = {
			code: -1,
			data:{
				msg : "完成订单失败!"
			}
		} 
		return

	} else {
		ctx.body = {
			code: 0,
			data:{
				msg : "完成订单!"
			}
		}
	}
}
async function saleall(ctx, next) {
	ctx.session.refresh()
	let goodsName = ctx.request.body.goods
	let sql = `UPDATE goods SET inventory = 0 WHERE `

	for(let i=0; i<goodsName.length; i++) {
		if(i < goodsName.length - 1) {
			sql += `goodsName = '${goodsName[i].goodsName}' OR `

		} else {
			sql += `goodsName = '${goodsName[i].goodsName}'`
		}
	}
	await db.MySQL_db(sql)
	ctx.body = {
		code: 0,
		data:{
			msg : "卖出成功!"
		}
	}
}
//Jenkins测试
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
		totalData.push(orderData)
	}
	ctx.body = {
		code: 0,
		data: totalData
	}
}

module.exports = {
	order: order,
	allorder: allorder,
	takeorder: takeorder,
	finishorder: finishorder,
	saleall: saleall,
	purchase: purchase,
	inventory: inventory,
	delivery: delivery,
	dayheat: dayheat,
	weekheat: weekheat,
	monthheat: monthheat,
	daysale: daysale,
	weeksale: weeksale,
	monthsale: monthsale,
	dayprofit: dayprofit,
	weekprofit: weekprofit,
	monthprofit: monthprofit
}

