// 一. 导入Koa包
const Koa = require('koa')
// 二. 实例化app对象
const app = new Koa()
// 三. 编写中间件
app.use((ctx, next) => {
  ctx.message = 'aa'
  next()
  ctx.body = ctx.message
})
app.use((ctx, next) => {
  ctx.message += 'bb'
  next()
})
app.use((ctx) => {
  ctx.message += 'cc'
})
// 四. 启动服务, 监听3000端口
app.listen(3000, () => {
  console.log('server is running on http://localhost:3000')
})
