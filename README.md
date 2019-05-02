# FreshFoodSuperMarket
This is a project for a fresh food supermarket.

[TOC]

#### 1、跨域请求
_问题_：浏览器连续发送两次请求，一次为**OPTIONS握手**，一次为POST请求（登录时）
_后端_：安装**koa-cors**模块，在**route前**加载该中间件
_前端_：**content-type**改为：**'application/x-www-form-urlencoded'**

#### 2、form-data格式
_前端_： 安装**qs**模块，采用

```javascript
this.qs.stringify(this.data)
```

修改数据格式

返回数据: 

```javascript
res.data = {
	code: 0,
	data: {
		msg:'登录成功！'
	}
}
```

#### 3、Redis数据库
**避免回调地狱**=>放弃redis module，采用ioredis，修改Redis数据库配置项

```javascript
const Redis_config = {
    port: 6379,          // Redis port
    host: '127.0.0.1',   // Redis host
    prefix: '', 		 // 存储前缀
    family: 4,
    db: 0
}

module.exports = Redis_config
```

#### 4、密码找回申请
携带用户名发送**post**请求到后端，后端生成一对**key-value**键值对

```javascript
{md5(username  + ....): username}
```

```javascript
token = md5(username  + ....)	//生存周期为300s
```

#### 5、密码重置
携带**token**发送**post**请求到后端，判断token**是否失效**，未失效的情况下，取到token对应的value=>username，在MySQL数据库中**重置密码**

#### 6、跨域请求后如何拿到session

route前加载的koa-cors模块，增加函数参数：

```javascript
app.use(cors({
  credentials: true,
  origin: 'http://localhost:8000'
}))
```

#### 7、controllers模块加载

*former version:*

```javascript
const controllers = require('require-all')('D:/myprojects/freshfoodsupermarket/server/controllers')
```

*revised version:*

```javascript
const controllers = require('require-dir-all')('../controllers')
```

#### 8、连接服务器数据库

1. Tencent Cloud Server安全组增加入栈规则:

   ![](https://github.com/TDYe123/FreshFoodSupermarket/blob/master/githubImages/Tencent.png)

2. 服务器防火墙打开3306端口

3. 服务器数据库打开远程访问

   ```sql
   mysql -h localhost -u root 
   GRANT ALL PRIVILEGES ON freshfood.* TO 'myuser'@'%'IDENTIFIED BY 'mypassword' WITH GRANT OPTION; 
   FLUSH PRIVILEGES 
   ```

#### 9、cookie中保存用户个人信息（username）

```javascript
ctx.session.user = JSON.stringify({userName: data[0].username})
```

**触发向redis数据库中存入session事件：**

```javascript
this.redis.set(`SESSION:${sid}`, JSON.stringify(session), 'EX', maxAge / 10000)
```

![](https://github.com/TDYe123/FreshFoodSupermarket/blob/master/githubImages/redis.PNG)

cookie中包含sessionid和username，cookie失效时间为一个月，session失效时间同为30mins，session持久化在cookie中，关闭浏览器之后cookie依然保存在浏览器中，重启浏览器，拿到sessionid之后，用户可继续上次会话。

**登录：**

```javascript
ctx.cookies.set('username', encodeURIComponent(username) , {
			signed: false,
           	domain:'localhost',
         	path:'*',   
         	maxAge:1000*60*60*24*30,
         	httpOnly:false,
         	overwrite:false
		})
```

**退出：**

```javascript
ctx.cookies.set('username', '' , {
		signed: false,
       	domain:'localhost',
     	path:'*',   
     	maxAge: 0,
     	httpOnly:false,
     	overwrite:false
 	})
```

**重点：session初始化时切记要设置session存活时间！（redis数据库中sessionid存活时间是另一回事！）否则，关闭浏览器之后cookie中session自动消失！**

```javascript
app.use(session({
  key: 'FFSM',
  store:new Store(),
  maxAge: 1000*60*60*24*30
}))
```



#### 10、个性化推荐

计算用户相似度：

![](https://github.com/TDYe123/FreshFoodSupermarket/blob/master/githubImages/cos1.png)

![](https://github.com/TDYe123/FreshFoodSupermarket/blob/master/githubImages/cos2.png)