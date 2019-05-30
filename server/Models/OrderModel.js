const MySQL_db = require('../utils/db.js').MySQL_db
const md5 = require('md5')
const Neo4j_db = (require('../utils/db')).Neo4j_db

class OrderModel {
	static async add(goodsList, orderTime, username) {
		let sql = `insert into receive (username, goodsNo, orderNo, num, orderTime, subtotal, address) values `

		for(let i=0; i<goodsList.length; i++) {
			if(i < goodsList.length - 1) {
				sql += `('${username}', '${goodsList[i].goodsNo}', '${md5(username + orderTime + goodsList[i].subtotal)}', '${goodsList[i].num}', '${orderTime}', ${goodsList[i].subtotal}, '${goodsList[i].address}'), `

			} else {
				sql += `('${username}', '${goodsList[i].goodsNo}', '${md5(username + orderTime + goodsList[i].subtotal)}', '${goodsList[i].num}', '${orderTime}', ${goodsList[i].subtotal}, '${goodsList[i].address}');`
			}
		}


		for (let i=0; i<goodsList.length; i++) {

			if(i < goodsList.length - 1) {
				sql += `UPDATE goods SET inventory = inventory - '${goodsList[i].num}' WHERE goodsNo = '${goodsList[i].goodsNo}';`
			} else {
				sql += `UPDATE goods SET inventory = inventory - '${goodsList[i].num}' WHERE goodsNo = '${goodsList[i].goodsNo}'`
			}
		
		}

		await MySQL_db(sql)
		
		let cypher = `match(user:User{username: '${username}'}),`

		for(let j=0; j<goodsList.length; j++) {
			let node_name = '_' + j 
			if(j < goodsList.length - 1) {
				cypher += `(${node_name}:Goods{goodsNo:${goodsList[j].goodsNo}}),`
			} else {
				cypher += `(${node_name}:Goods{goodsNo:${goodsList[j].goodsNo}})`
			}
		}

		cypher += `create`

		for(let i=0; i<goodsList.length; i++) {
			let node_name = '_' + i
			if(i < goodsList.length - 1) {
				cypher += `(user)-[:Buy{num:${goodsList[i].num}}]->(${node_name}), `
			} else {
				cypher += `(user)-[:Buy{num:${goodsList[i].num}}]->(${node_name})`
			}
			
		}

		await Neo4j_db(cypher)

		return 
	}

	static async search(username) {
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

}

module.exports = OrderModel