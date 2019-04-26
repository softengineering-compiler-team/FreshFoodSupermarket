# freshfoodsupermarket
This is a project for a fresh food supermarket.
### 跨域请求
_问题_：浏览器连续发送两次请求，一次为**OPTIONS握手**，一次为POST请求（登录时）
_后端_：安装**koa-cors**模块，在**route前**加载该中间件**
_前端_：content-type改为：**'application/x-www-form-urlencoded'**
### form-data格式
_前端_： 安装**qs**模块，采用`this.qs.stringify(this.data)`修改数据格式
        返回数据中: `res.data = {
                                      code: 0,
                                      data: {
                                             msg:'登录成功！'
                                      }
                                }`
### Redis数据库
**避免回调地狱**=>放弃redis module，采用ioredis，修改Redis数据库配置项
### 密码找回申请
携带用户名发送**post**请求到后端，后端生成一对**key-value**键值对=>`{md5(username  + ....): username}`，`token = md5(username  + ....)`生存周期为**300s**
### 密码重置
携带**token**发送**post**请求到后端，判断token**是否失效**，未失效的情况下，取到token对应的value=>username，在MySQL数据库中**重置密码**
