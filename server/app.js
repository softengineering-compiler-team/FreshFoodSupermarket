const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require("koa-session2")
const cors = require('koa-cors')
const domain = require('./config/Domain-config')
const md5 = require('md5')
const Redis_db = (require('./utils/db')).Redis_db
const Store = require('./utils/Store')
const user = require('./routes/user')
const goods = require('./routes/goods')
const admin = require('./routes/admin')
const order = require('./routes/order')
// error handler
onerror(app)

//session
app.use(session({
  key: 'FFSM',
  domain: domain,
  path: '*',   
  httpOnly: false,
  overwrite: false,
  signed: false,
  store: new Store(),
  maxAge: 1000*60*20
}))


// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))

app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// 解决跨域
app.use(cors({
  credentials: true,
  origin: 'http://' + domain + ':8000'
}))

// 生成登录验证码token
app.use(async (ctx, next) => {

  if(!(ctx.cookies.get('FFSM') && ctx.cookies.get('username')) && ctx.path === '/gen_code'){
    let token = md5((new Date()).toLocaleString()+ Math.random()) 
    let check_code = md5(Math.random()).substring(0, 4)
    await Redis_db.set(token, check_code)
    await Redis_db.expire(token, 120)//验证码120s后失效
    ctx.body = {
      code: 0,
      data: {
        token: token,
        check_code: check_code
      }
    }
    return 
  }
  await next()
})

// 登录拦截
app.use(async (ctx, next) => {
  if(!(ctx.cookies.get('FFSM') && ctx.cookies.get('username')) && ctx.path !== '/signin' && ctx.path !== '/signup' && ctx.path !== '/retrieve' && ctx.path !== '/reset'){
    ctx.body = {
      code: -1,
      data: {
        msg: '请登录'
      }
    }
    return
  }
  await next()
})

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(user.routes(), user.allowedMethods())
app.use(goods.routes(), goods.allowedMethods())
app.use(admin.routes(), admin.allowedMethods())
app.use(order.routes(), order.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
