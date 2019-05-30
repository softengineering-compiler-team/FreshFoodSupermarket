const MySQL_db = require('../utils/db.js').MySQL_db

class AdminModel {
	static async dayheat() {
		var data = new Array()
		let sql1 = 'SELECT sum(num) as num,goods.`subType`,any_value(receive.`orderTime`) AS orderTime FROM receive,goods WHERE DATE_SUB(CURDATE(), INTERVAL 24 HOUR) <= DATE(receive.`orderTime`) AND receive.`goodsNo`=goods.`goodsNo` GROUP BY goods.`subType` ORDER BY COUNT(*) DESC limit 5'
		let dayData = await MySQL_db(sql1)
		for(let i=0;i<dayData.length;i++){
			var dayheat = {}
			dayheat['num'] = dayData[i].num
			dayheat['subType'] = dayData[i].subType
			data.push(dayheat)
		}
		return data
	}

	static async weekheat() {
		var data = new Array()
		let sql1 = 'SELECT sum(num) AS num,goods.`subType`,any_value(receive.`orderTime`) AS orderTime FROM receive,goods WHERE DATE_SUB(CURDATE(), INTERVAL 7 DAY) <= DATE(receive.`orderTime`) AND receive.`goodsNo`=goods.`goodsNo` GROUP BY goods.`subType` ORDER BY COUNT(*) DESC limit 5'
		let dayData = await MySQL_db(sql1)
		for(let i=0;i<dayData.length;i++){
			var dayheat = {}
			dayheat['num'] = dayData[i].num
			dayheat['subType'] = dayData[i].subType
			data.push(dayheat)
		}
		return data
	}

	static async monthheat() {
		var data = new Array()
		let sql1 = 'SELECT sum(num) AS num,goods.`subType`,any_value(receive.`orderTime`) AS orderTime FROM receive,goods WHERE DATE_SUB(CURDATE(), INTERVAL 30 DAY) <= DATE(receive.`orderTime`) AND receive.`goodsNo`=goods.`goodsNo` GROUP BY goods.`subType` ORDER BY COUNT(*) DESC limit 5'
		let dayData = await MySQL_db(sql1)
		for(let i=0;i<dayData.length;i++){
			var dayheat = {}
			dayheat['num'] = dayData[i].num
			dayheat['subType'] = dayData[i].subType
			data.push(dayheat)
		}
		return data
	}

	static async daysale() {
		var data = new Array()
		let sql1 = 'SELECT sum(num) AS num,goods.`subType`,any_value(receive.`orderTime`) AS orderTime,SUM(receive.`subtotal`) AS total FROM receive,goods  WHERE DATE_SUB(CURDATE(), INTERVAL 1 DAY) <= DATE(receive.`orderTime`) AND receive.`goodsNo`=goods.`goodsNo`  GROUP BY goods.`subType` ORDER BY total DESC'
		let dayData = await MySQL_db(sql1)
		for(let i=0;i<dayData.length;i++){
			var dayheat = {}
			dayheat['total'] = dayData[i].total
			dayheat['subType'] = dayData[i].subType
			data.push(dayheat)
		}
		return data
	}

	static async weeksale() {
		var data = new Array()
		let sql1 = 'SELECT sum(num) AS num,goods.`subType`,any_value(receive.`orderTime`) AS orderTime,SUM(receive.`subtotal`) AS total FROM receive,goods  WHERE DATE_SUB(CURDATE(), INTERVAL 7 DAY) <= DATE(receive.`orderTime`) AND receive.`goodsNo`=goods.`goodsNo`  GROUP BY goods.`subType` ORDER BY total DESC'
		let dayData = await MySQL_db(sql1)
		for(let i=0;i<dayData.length;i++){
			var dayheat = {}
			dayheat['total'] = dayData[i].total
			dayheat['subType'] = dayData[i].subType
			data.push(dayheat)
		}
		return data
	}

	static async monthsale() {
		var data = new Array()
		let sql1 = 'SELECT sum(num) AS num,goods.`subType`,any_value(receive.`orderTime`) AS orderTime,SUM(receive.`subtotal`) AS total FROM receive,goods  WHERE DATE_SUB(CURDATE(), INTERVAL 30 DAY) <= DATE(receive.`orderTime`) AND receive.`goodsNo`=goods.`goodsNo`  GROUP BY goods.`subType` ORDER BY total DESC'
		let dayData = await MySQL_db(sql1)
		for(let i=0;i<dayData.length;i++){
			var dayheat = {}
			dayheat['total'] = dayData[i].total
			dayheat['subType'] = dayData[i].subType
			data.push(dayheat)
		}
		return data
	}

	static async dayprofit() {
		var data = new Array()
		let sql1 = 'SELECT sum(num) AS num,goods.`subType`,any_value(receive.`orderTime`) AS orderTime,SUM(receive.`subtotal`)-SUM(goods.`cost`) AS total FROM receive,goods WHERE DATE_SUB(CURDATE(), INTERVAL 1 DAY) <= DATE(receive.`orderTime`) AND receive.`goodsNo`=goods.`goodsNo` GROUP BY goods.`subType` ORDER BY total DESC'
		let dayData = await MySQL_db(sql1)
		for(let i=0;i<dayData.length;i++){
			var dayheat = {}
			dayheat['total'] = dayData[i].total
			dayheat['subType'] = dayData[i].subType
			data.push(dayheat)
		}
		return data
	}

	static async weekprofit() {
		var data = new Array()
		let sql1 = 'SELECT sum(num) AS num,goods.`subType`,any_value(receive.`orderTime`) AS orderTime,SUM(receive.`subtotal`)-SUM(goods.`cost`) AS total FROM receive,goods WHERE DATE_SUB(CURDATE(), INTERVAL 7 DAY) <= DATE(receive.`orderTime`) AND receive.`goodsNo`=goods.`goodsNo` GROUP BY goods.`subType` ORDER BY total DESC'
		let dayData = await MySQL_db(sql1)
		for(let i=0;i<dayData.length;i++){
			var dayheat = {}
			dayheat['total'] = dayData[i].total
			dayheat['subType'] = dayData[i].subType
			data.push(dayheat)
		}
		return data
	}

	static async monthprofit() {
		var data = new Array()
		let sql1 = 'SELECT sum(num) AS num,goods.`subType`,any_value(receive.`orderTime`) AS orderTime,SUM(receive.`subtotal`)-SUM(goods.`cost`) AS total FROM receive,goods WHERE DATE_SUB(CURDATE(), INTERVAL 30 DAY) <= DATE(receive.`orderTime`) AND receive.`goodsNo`=goods.`goodsNo` GROUP BY goods.`subType` ORDER BY total DESC'
		let dayData = await MySQL_db(sql1)
		for(let i=0;i<dayData.length;i++){
			var dayheat = {}
			dayheat['total'] = dayData[i].total
			dayheat['subType'] = dayData[i].subType
			data.push(dayheat)
		}
		return data
	}

	static async order(username) {
		let sql = `select  receive.*, goods.goodsName from receive inner join goods on receive.goodsNo = goods.goodsNo where username ='${username}' order by orderTime desc, orderNo desc`
		let data = await MySQL_db(sql)
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
			let sql1 = `SELECT  receive.*, goods.goodsName FROM receive ,goods WHERE receive.goodsNo = goods.goodsNo AND orderNo = '${temporder}' and username ='${username}' order by orderTime desc`
			let data1 = await MySQL_db(sql1)
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
		return totalData
	}

	static async inventory() {
		let sql = `SELECT subtype,goodsName,cost,DATE_SUB(import_time,INTERVAL validity HOUR) AS guarantee_period,inventory FROM goods ORDER BY inventory,guarantee_period  `
		let invent = await MySQL_db(sql)
		var data = []
		data.push(invent)
		return data
	}

	static async takeorder(orderNo) {
		let code = 0
		let msg = ''
		let sql = `UPDATE receive SET STATUS = 1 WHERE orderNo = '${orderNo}'`
		let data = await MySQL_db(sql)
		if (data.length === 0) {
			code = -1
			msg = "接单失败!"
		} else {
			code = 0
			msg = "接单成功!"
		}
		return [code, msg]
	}

	static async finishorder(orderNo, finishTime) {
		let sql = `UPDATE receive SET STATUS = 2, finishTime = '${finishTime}' WHERE orderNo = '${orderNo}'`
		let data = await MySQL_db(sql)
		if (data.length === 0) {
			code = -1
			msg = "完成订单失败!"			
		} else {
			code = 0
			msg  = "完成订单!"
		}
		return [code, msg]
	}

	static async saleall(goodsName) {
		let sql = `UPDATE goods SET inventory = 0 WHERE `

		for(let i=0; i<goodsName.length; i++) {
			if(i < goodsName.length - 1) {
				sql += `goodsName = '${goodsName[i].goodsName}' OR `

			} else {
				sql += `goodsName = '${goodsName[i].goodsName}'`
			}
		}
		await MySQL_db(sql)
		return 
	}

	static async purchase(goodsList, import_time) {
		for(let i=0; i<goodsList.length; i++) {
			let sql = `UPDATE goods SET inventory = inventory + '${goodsList[i].num}' , import_time = '${import_time}' WHERE goodsName = '${goodsList[i].goodsName}'`
			await MySQL_db(sql)
		}
		return 
	}

	static async allorder(status) {
		let sql=''
		if (status) {
			sql = `select  receive.*, goods.goodsName from receive inner join goods on receive.goodsNo = goods.goodsNo where status = '${status}' order by orderTime desc, orderNo desc`
		} else {
			sql = `select  receive.*, goods.goodsName from receive inner join goods on receive.goodsNo = goods.goodsNo order by orderTime desc, orderNo desc`
		}
		
		let data = await MySQL_db(sql)
		var totalData = []
		let orderNo = data[0].orderNo
		var orderNum = new Array()
		orderNum.push(orderNo)

		for(let i=0;i<data.length;i++) {
			let temporder = data[i].orderNo
			if(temporder != orderNo){
				orderNum.push(temporder)
				orderNo = temporder
			}
		}
		for(let i=0;i<orderNum.length;i++) {
			let temporder = orderNum[i]
			let sql1 = ''
			if (status) {
				sql1 = `SELECT  receive.*, goods.goodsName FROM receive ,goods WHERE receive.goodsNo = goods.goodsNo AND STATUS = '${status}' AND orderNo = '${temporder}'`
			}
			else{
				 sql1 = `SELECT  receive.*, goods.goodsName FROM receive ,goods WHERE receive.goodsNo = goods.goodsNo AND orderNo = '${temporder}'`
			}
			
			let data1 = await MySQL_db(sql1)
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
		return totalData
	}

	static async delivery() {
		let sql = `select  receive.*, goods.goodsName from receive inner join goods on receive.goodsNo = goods.goodsNo where status = 1 order by orderTime desc, orderNo desc`
		let data = await MySQL_db(sql)
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
			let data1 = await MySQL_db(sql1)
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
		return totalData
	}
}

module.exports = AdminModel
