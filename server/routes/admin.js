const router = require('koa-router')()
const controllers = require('require-dir-all')('../controllers')

router.get('/query/inventory', controllers.Admin.inventory)//库存管理员查看库存
router.get('/query/allorder', controllers.Admin.allorder)//配送员查看所有状态为0的订单
router.get('/query/delivery', controllers.Admin.delivery)//配送员接的单
router.get('/query/dayheat', controllers.Admin.dayheat)//得到日销售热度(取5个)
router.get('/query/weekheat', controllers.Admin.weekheat)//得到周销售热度(取5个)
router.get('/query/monthheat', controllers.Admin.monthheat)//得到周销售热度(取5个)
router.get('/query/daysale', controllers.Admin.daysale)//日销售额
router.get('/query/weeksale', controllers.Admin.weeksale)//周销售额
router.get('/query/monthsale', controllers.Admin.monthsale)//月销售额
router.get('/query/dayprofit', controllers.Admin.dayprofit)//日盈利额
router.get('/query/weekprofit', controllers.Admin.weekprofit)//周盈利额
router.get('/query/monthprofit', controllers.Admin.monthprofit)//月盈利额
router.post('/takeorder', controllers.Admin.takeorder)//点击接单
router.post('/finishorder', controllers.Admin.finishorder)//点击完成
router.post('/saleall', controllers.Admin.saleall)//点击一键卖出,把inventory清空
router.post('/purchase', controllers.Admin.purchase)//采购物品

module.exports = router