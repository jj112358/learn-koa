// 一. 导入Koa包
const Koa = require('koa')
// 二. 实例化app对象
const app = new Koa()
// 三. 编写中间件
// 在app.use中只能接受一个函数做为参数
app
  .use((ctx, next) => {
    console.log('我来组成头部')
    next()
  })
  .use((ctx, next) => {
    console.log('我来组成身体')
    next()
  })
  .use((ctx) => {
    console.log('组装完成')
    ctx.body = '组装完成'
  })
// 四. 启动服务
app.listen(3000, () => {
  console.log('server is running on http://localhost:3000')
})
