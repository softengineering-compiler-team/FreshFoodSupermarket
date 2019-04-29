const db = require('../utils/db.js')

async function order(ctx, next) {
	let sql = `select  receive.*, goods.goodsName from receive inner join goods on receive.goodsNo = goods.goodsNo where status = 0 order by orderTime desc, orderNo desc`
	//console.log(sql);
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
		console.log(temporder)
		let sql1 = `SELECT  receive.*, goods.goodsName FROM receive ,goods WHERE receive.goodsNo = goods.goodsNo AND STATUS = 0 AND orderNo = '${temporder}'`
		let data1 = await db.MySQL_db(sql1)
		var goodsList = new Array()
		var goodsObj = {}
		var orderData = {}
		let total = 0
		orderData['orderNo'] = data1[0].orderNo
		for(let j=0;j<data1.length;j++){
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

async function takeorder(ctx, next) {
	let orderNo = ctx.request.body.orderNo
	console.log(orderNo)
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

async function delivery(ctx, next) {
	let sql = `select  receive.*, goods.goodsName from receive inner join goods on receive.goodsNo = goods.goodsNo where status = 1 order by orderTime desc, orderNo desc`
	//console.log(sql);
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
		console.log(temporder)
		let sql1 = `SELECT  receive.*, goods.goodsName FROM receive ,goods WHERE receive.goodsNo = goods.goodsNo AND STATUS = 1 AND orderNo = '${temporder}'`
		let data1 = await db.MySQL_db(sql1)
		var goodsList = new Array()
		var goodsObj = {}
		var orderData = {}
		let total = 0
		orderData['orderNo'] = data1[0].orderNo
		for(let j=0;j<data1.length;j++){
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
	takeorder: takeorder,
	delivery: delivery
}

