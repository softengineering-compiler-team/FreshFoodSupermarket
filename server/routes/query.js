const router = require('koa-router')()
const controllers = require('require-all')({
	dirname: 'D:/MyProjects/FreshFoodSuperMarket/controllers' 
})

router.prefix('/query')

router.get('/', controllers.goods)

module.exports = router
