// 一. 导入Koa包
const Koa = require('koa')
// 二. 实例化app对象
const app = new Koa()
// 三. 编写中间件
app.use(async (ctx, next) => {
  ctx.message = 'aa'
  await next()
  ctx.body = ctx.message
})
app.use(async (ctx, next) => {
  ctx.message += 'bb'
  await next()
})
app.use(async (ctx) => {
  // 返回一个promise对象, 状态fulfilled, 结果cc
  const res = await Promise.resolve('cc')
  ctx.message += res
})
// 四. 启动服务, 监听3000端口
app.listen(3000, () => {
  console.log('server is running on http://localhost:3000')
})
