const db = require('../utils/db.js')

async function order(ctx, next) {
	let sql = `select  receive.*, goods.goodsName from receive inner join goods on receive.goodsNo = goods.goodsNo where status = 0 order by orderTime desc, orderNo desc`
	//console.log(sql);
	let data = await db(sql)
	//console.log(data)

	let orderNo = data[0].orderNo

	var orderNum = new Array()
	orderNum.push(orderNo)

	var numData = new Array()
	var goodsData = new Array() 
	var orderData = new Array()
	var totalOrder = new Array()
	
	for(let i=0;i<data.length;i++){
		temporder = data[i].orderNo
		if(temporder != orderNo){
			orderNum.push(temporder)
			orderNo = temporder
		}
	}

	for(let i=0;i<orderNum.length;i++){
		let temporder = orderNum[i]
		let sql1 = `SELECT  receive.*, goods.goodsName FROM receive ,goods WHERE receive.goodsNo = goods.goodsNo AND STATUS = 0 AND orderNo = '${temporder}'`
		let data1 = await db(sql1)
		var goodsData = new Array() 
		var numData = new Array()
		var orderData = new Array()
		let total = 0
		orderData.push(data1[i].orderNo)
		for(let j=0;j<data1.length;j++){
			goodsData.push(data1[j].goodsName)
			numData.push(data1[j].num)
			total += data1[i].subtotal
		}
		orderData.push(goodsData)
		orderData.push(numData)
		orderData.push(total)
		orderData.push(data1[i].orderTime)
		orderData.push(data1[i].username)
		orderData.push(data1[i].status)

		totalOrder.push(orderData)
	}
	
	
	console.log(totalOrder);

	ctx.body = {
		code: 0,
		data: totalOrder
	}
}

module.exports = {
	order: order
	
}

