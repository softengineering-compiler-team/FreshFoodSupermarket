const router = require('koa-router')()
const controllers = require('require-dir-all')('../controllers')

router.post('/buy', controllers.user.buy)
router.post('/address', controllers.user.insertAddress)

module.exports = router