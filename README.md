# freshfoodsupermarket
This is a project for a fresh food supermarket.
### Redis数据库
**避免回调地狱**=>放弃redis module，采用ioredis，修改Redis数据库配置项
### 密码找回申请
携带用户名发送**post**请求到后端，后端生成一对**key-value**键值对=>`{md5(username  + ....): username}`，`token = md5(username  + ....)`生存周期为**300s**
### 密码重置
携带**token**发送**post**请求到后端，判断token**是否失效**，未失效的情况下，取到token对应的value=>username，在MySQL数据库中**重置密码**
