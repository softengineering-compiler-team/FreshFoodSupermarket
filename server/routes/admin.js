const router = require('koa-router')()
const controllers = require('require-dir-all')('../controllers')

router.get('/order', controllers.Admin.order)//前端用户的订单
router.get('/inventory', controllers.Admin.inventory)//库存管理员查看库存
router.get('/allorder', controllers.Admin.allorder)//配送员查看所有状态为0的订单
router.get('/delivery', controllers.Admin.delivery)//配送员接的单
router.get('/dayheat', controllers.Admin.dayheat)//得到日销售热度(取5个)
router.get('/weekheat', controllers.Admin.weekheat)//得到周销售热度(取5个)
router.get('/monthheat', controllers.Admin.monthheat)//得到周销售热度(取5个)
router.get('/daysale', controllers.Admin.daysale)//日销售额
router.get('/weeksale', controllers.Admin.weeksale)//周销售额
router.get('/monthsale', controllers.Admin.monthsale)//月销售额
router.get('/dayprofit', controllers.Admin.dayprofit)//日盈利额
router.get('/weekprofit', controllers.Admin.weekprofit)//周盈利额
router.get('/monthprofit', controllers.Admin.monthprofit)//月盈利额

module.exports = router