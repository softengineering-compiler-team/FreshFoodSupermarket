const db = require('../utils/db.js')

async function all(ctx, next) {
	let goodsName = ctx.request.query.goodsName
	let sql = `select * from goods where goodsName = '${goodsName}'`
	let data = await db.MySQL_db(sql)
	ctx.body = {
		code: 0,
		data: data
	}
}


async function fruits(ctx, next) {
	var subtypeList = ['香蕉', '苹果', '葡萄', '西瓜', '梨', '柚子', '车厘子']
	var data = new Array()
	for(let subtype of subtypeList) {
		let sql = `select * from sale where type = '水果' and subtype = '${subtype}' limit 5`
		let sub_data = await db.MySQL_db(sql)
		data.push(sub_data)
	}
	
	console.log(data);

	ctx.body = {
		code: 0,
		data: data
	}
}

async function vegetables(ctx, next) {
	var subtypeList = ['香蕉', '苹果', '葡萄', '西瓜', '梨', '柚子', '车厘子']
	var data = new Array()
	for(let subtype of subtypeList) {
		let sql = `select * from sale where type = '水果' and subtype = '${subtype}' limit 5`
		let sub_data = await db.MySQL_db(sql)
		data.push(sub_data)
	}
	
	ctx.body = {
		code: 0,
		data: data
	}
}

async function seafoods(ctx, next) {
	var subtypeList = ['香蕉', '苹果', '葡萄', '西瓜', '梨', '柚子', '车厘子']
	var data = new Array()
	for(let subtype of subtypeList) {
		let sql = `select * from sale where type = '水果' and subtype = '${subtype}' limit 5`
		let sub_data = await db.MySQL_db(sql)
		data.push(sub_data)
	}
	
	ctx.body = {
		code: 0,
		data: data
	}
}

async function meat(ctx, next) {
	var subtypeList = ['香蕉', '苹果', '葡萄', '西瓜', '梨', '柚子', '车厘子']
	var data = new Array()
	for(let subtype of subtypeList) {
		let sql = `select * from sale where type = '水果' and subtype = '${subtype}' limit 5`
		let sub_data = await db.MySQL_db(sql)
		data.push(sub_data)
	}
	
	ctx.body = {
		code: 0,
		data: data
	}
}

async function dairy(ctx, next) {
	var subtypeList = ['香蕉', '苹果', '葡萄', '西瓜', '梨', '柚子', '车厘子']
	var data = new Array()
	for(let subtype of subtypeList) {
		let sql = `select * from sale where type = '水果' and subtype = '${subtype}' limit 5`
		let sub_data = await db.MySQL_db(sql)
		data.push(sub_data)
	}
	
	ctx.body = {
		code: 0,
		data: data
	}
}


module.exports = {
	all: all,
	fruits: fruits,
	vegetables:vegetables,
	seafoods: seafoods,
	meat: meat,
	dairy: dairy 
}

