// 一. 导入Koa包
const Koa = require('koa')
// 二. 实例化app对象
const app = new Koa()

// 三. 导入router路由
const userRoute = require('./router/user.route')
// 四. 注册中间件
app.use(userRoute.routes()).use(userRoute.allowedMethods())
// 五. 启动服务, 监听3000端口
app.listen(3000, () => {
  console.log('server is running on http://localhost:3000')
})
