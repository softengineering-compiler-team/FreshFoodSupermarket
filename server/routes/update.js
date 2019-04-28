const router = require('koa-router')()
const controllers = require('require-all')({
	dirname: 'D:/MyProjects/FreshFoodSuperMarket/server/controllers' 
})

//点击接单
router.post('/takeorder', controllers.admin.takeorder)

module.exports = router