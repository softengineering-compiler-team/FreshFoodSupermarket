const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require("koa-session2")
const cors = require('koa-cors')
const Store = require('./utils/Store')
const user = require('./routes/user')
const query = require('./routes/query')
const insert = require('./routes/insert')

// error handler
onerror(app)

//session
app.use(session({
  store:new Store()
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

// //登陆拦截
app.use(async (ctx, next) => {

  if(!ctx.cookies.get('koa:sess') && ctx.path !== '/signin'){
    await ctx.render('index',{
      title:'请登录'
    })
    return
  }
  await next()
})

// logger
app.use(async (ctx, next) => {
  if(ctx.method === 'OPTIONS') {
    ctx.body = {
      code: 0,
      data: {
        msg: '跨域成功！'
      }
    }
  }
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

//解决跨域
app.use(cors())

// routes
app.use(user.routes(), user.allowedMethods())
app.use(query.routes(), query.allowedMethods())
app.use(insert.routes(), insert.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
