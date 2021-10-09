// 三. 使用koa-router
// 3.1 导入koa-router包
const Router = require('koa-router')
// 3.2 实例化router对象
const router = new Router()
// 3.3 编写路由规则
router.get('/users', (ctx) => {
  ctx.body = '这是用户页'
})
router.post('/users', (ctx) => {
  ctx.body = '创建用户'
})

module.exports = router
