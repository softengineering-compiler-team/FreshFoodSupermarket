const router = require('koa-router')()
const controllers = require('require-all')({
	dirname: 'C:/MyProjects/FreshFoodSuperMarket/server/controllers' 
})

router.post('/buy', controllers.buy)
router.post('/address', controllers.user.insertAddress)

module.exports = router