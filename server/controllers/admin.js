const db = require('../utils/db.js')

async function order(ctx, next) {
	let sql = `select  receive.*, goods.goodsName from receive inner join goods on receive.goodsNo = goods.goodsNo where status = 0 order by orderTime desc, orderNo desc`
	//console.log(sql);
	let data = await db(sql)
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
		let data1 = await db(sql1)
		var goodsList = new Array()
		var goodsObj = {}
		var orderData = {}
		let total = 0
		orderData['orderNo'] = data1[i].orderNo
		for(let j=0;j<data1.length;j++){
			goodsObj['goodsName'] = data1[j].goodsName
			goodsObj['num'] = data1[j].num
			goodsList.push(goodsObj)
			total += data1[j].subtotal
		}
		
		orderData['goodsList'] = goodsList
		orderData['total'] = total
		orderData['orderTime'] = data1[i].orderTime
		orderData['username'] = data1[i].username
		orderData['status'] = data1[i].status
		totalData.push(orderData)
	}
	ctx.body = {
		code: 0,
		data: totalData
	}
}
module.exports = {
	order: order
	
}

