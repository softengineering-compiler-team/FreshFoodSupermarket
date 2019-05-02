const MySQL_db = require('../utils/db.js').MySQL_db

/*性能极低，待改善*/
async function batchUpdate(goodsList) {
	for(let i=0; i<goodsList.length; i++) {
		let sql = `update fav set \`${goodsList[i].goodsNo}\` = \`${goodsList[i].goodsNo}\` + ${goodsList[i].num} where username = '${goodsList[i].username}'`
		await MySQL_db(sql)
	}
	return
}

/*测试数据*/
/*
let goodsList = [
					{
						username:  "叶田地",
					 	goodsNo:  1,
					 	num: 99,
					 	subtotal: 990.22
					}, {
						username: "叶田地",
						goodsNo: 2,
						num: 98,
						subtotal: 50
					}]

batchUpdate(goodsList)
*/

module.exports = batchUpdate