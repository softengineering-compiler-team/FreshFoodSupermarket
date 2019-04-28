const router = require('koa-router')()
const controllers = require('require-all')({
	dirname: 'C:/MyProjects/FreshFoodSuperMarket/server/controllers' 
})

router.post('/signup', controllers.user.signup)
router.post('/signin', controllers.user.signin)
router.post('/retrieve', controllers.user.retrieve)
router.post('/reset', controllers.user.reset)
router.post('/signout', controllers.user.signout)

module.exports = router