const router = require('koa-router')()
const controllers = require('require-dir-all')('../controllers')

//点击接单
router.post('/takeorder', controllers.admin.takeorder)
//点击完成
router.post('/finishorder', controllers.admin.finishorder)
//点击一键卖出,把inventory清空
router.post('/saleall', controllers.admin.saleall)
//采购物品
router.post('/purchase', controllers.admin.purchase)
//删除地址
module.exports = router