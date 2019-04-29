const router = require('koa-router')()
const controllers = require('require-dir-all')('../controllers')

//点击接单
router.post('/takeorder', controllers.admin.takeorder)

module.exports = router