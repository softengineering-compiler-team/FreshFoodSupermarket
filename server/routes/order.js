const router = require('koa-router')()
const controllers = require('require-dir-all')('../controllers')

router.post('/buy', controllers.Order.add)
router.get('/query/order', controllers.Order.search)
router.get('/query/allorder', controllers.Order.allorder)//配送员查看所有状态为0的订单

module.exports = router