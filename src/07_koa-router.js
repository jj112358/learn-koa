// 一. 导入Koa包
const Koa = require('koa')
// 二. 实例化app对象
const app = new Koa()
// 注册KoaBody中间件, 解析请求体中的参数, 挂载到ctx.request.body
const KoaBody = require('koa-body')
app.use(KoaBody())
// 三. 导入router路由
const userRoute = require('./router/user.route')
// 四. 注册中间件
app.use(userRoute.routes()).use(userRoute.allowedMethods())

app.on('error', (err, ctx) => {
  console.error(err)
  ctx.body = err
})
// 五. 启动服务, 监听3000端口
app.listen(3000, () => {
  console.log('server is running on http://localhost:3000')
})
