const router = require('koa-router')()
const controllers = require('require-dir-all')('../controllers')

router.prefix('/query')

router.get('/', controllers.goods.all)
router.get('/fruits', controllers.goods.fruits)
router.get('/vegetables', controllers.goods.vegetables)
router.get('/seafoods', controllers.goods.seafoods)
router.get('/meat', controllers.goods.meat)
router.get('/dairy', controllers.goods.dairy)
router.get('/address', controllers.user.address)

router.get('/order', controllers.admin.order)
router.get('/delivery', controllers.admin.delivery)
router.get('/dayheat', controllers.admin.dayheat)//得到日销售热度(取5个)
router.get('/weekheat', controllers.admin.weekheat)//得到周销售热度(取5个)
router.get('/monthheat', controllers.admin.monthheat)//得到周销售热度(取5个)
router.get('/daysale', controllers.admin.daysale)//日销售额
router.get('/weeksale', controllers.admin.weeksale)//周销售额
router.get('/monthsale', controllers.admin.monthsale)//月销售额
router.get('/dayprofit', controllers.admin.dayprofit)//日盈利额
router.get('/weekprofit', controllers.admin.weekprofit)//周盈利额
router.get('/monthprofit', controllers.admin.monthprofit)//月盈利额

router.post('/fav', controllers.user.fav) //个人推荐（猜你喜欢）

module.exports = router
