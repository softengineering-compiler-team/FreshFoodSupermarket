const router = require('koa-router')()
const controllers = require('require-dir-all')('../controllers')

router.post('/signup', controllers.User.signup)
router.post('/signin', controllers.User.signin)
router.post('/retrieve', controllers.User.retrieve)
router.post('/reset', controllers.User.reset)
router.post('/signout', controllers.User.signout)
router.post('/address', controllers.User.insertAddress)
router.post('/deleteaddress', controllers.User.deleteaddress)
router.get('/query/address', controllers.User.address)
router.post('/query/fav', controllers.User.fav) //个人推荐（猜你喜欢）

module.exports = router