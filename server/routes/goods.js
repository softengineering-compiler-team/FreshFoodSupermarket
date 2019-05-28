const router = require('koa-router')()
const controllers = require('require-dir-all')('../controllers')

router.prefix('/query')

router.get('/', controllers.Goods.all)
router.get('/fruits', controllers.Goods.fruits)
router.get('/vegetables', controllers.Goods.vegetables)
router.get('/seafoods', controllers.Goods.seafoods)
router.get('/meat', controllers.Goods.meat)
router.get('/dairy', controllers.Goods.dairy)

module.exports = router
