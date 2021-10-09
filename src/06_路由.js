// 一. 导入Koa
const Koa = require('koa')
// 二. 实例化app对象
const app = new Koa()
// 三. 编写中间件
app.use((ctx) => {
  console.log(ctx) // http上下文(http请求+http响应)
  // 1. ctx.request: http请求
  // 2. ctx.response: http响应
  if (ctx.url == '/') {
    ctx.body = '这是主页'
  } else if (ctx.url == '/users') {
    if (ctx.method == 'GET') {
      ctx.body = '这是用户页'
    } else if (ctx.method == 'POST') {
      ctx.body = '创建用户'
    } else {
      ctx.status = 405 // Method Not Allowed
    }
  } else {
    ctx.status = 404
  }
})
// 四. 监听端口
app.listen(3000)
