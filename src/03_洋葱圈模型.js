// 一. 导入Koa包
const Koa = require('Koa')
// 二. 实例化app对象
const app = new Koa()
// 三. 编写中间件
app.use((ctx, next) => {
  console.log(1)
  next()
  console.log(2)
})
app.use((ctx, next) => {
  console.log(3)
  next()
  console.log(4)
})
app.use((ctx) => {
  console.log(5)
  ctx.body = '处理完成'
})
// 四. 启动服务, 监听3000端口
app.listen(3000, () => {
  console.log('server is running on http://localhost:3000')
})
