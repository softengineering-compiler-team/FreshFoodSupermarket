const router = require('koa-router')()
const controllers = require('require-dir-all')('../controllers')

//点击接单
router.post('/takeorder', controllers.admin.takeorder)
//点击完成
router.post('/finishorder', controllers.admin.finishorder)
module.exports = router