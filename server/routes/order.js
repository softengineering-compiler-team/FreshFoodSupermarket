const router = require('koa-router')()
const controllers = require('require-dir-all')('../controllers')

router.post('/buy', controllers.Order.add)
router.get('/query/order', controllers.Order.search)

module.exports = router