const router = require('koa-router')()
const controllers = require('require-dir-all')('../controllers')

router.post('/buy', controllers.Order.add)

module.exports = router