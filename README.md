# 一. Koa起步

## 1 项目初始化

执行 `npm init -y`, 生成package.json

```
npm init -y
```

## 2 安装Koa

执行命令

```
npm i koa
```

## 3 编写服务程序

编写`src/01_quickstart.js`

1. 导入koa包
2. 实例化app对象
3. 编写中间件
4. 启动服务, 监听3000端口

```js
// 一. 导入koa
const Koa = require('koa')
// 二. 实例化对象
const app = new Koa()
// 三. 编写中间件
app.use((ctx) => {
  ctx.body = 'hello Koa2'
})
// 四. 启动服务
app.listen(3000, () => {
  console.log('server is running on http://localhost:3000')
})

```

> 注意

如果没有通过`ctx.body`返回给客户端, 最终会得到`Not Found`

## 4 使用nodemon

安装nodemon, 使用nodemon启动服务

```sh
nodemon src/01_quickstart.js
```

# 二. 中间件

## 1 基本概念

### 1) 什么叫中间件

顾名思义, 中间件就是在什么的中间

> 在请求和响应中间的处理程序

有时候从请求到响应的业务比较复杂, 将这些复杂的业务拆开成一个个功能独立的**函数**, 就是**中间件**

对于处理请求来说，在响应发出之前，可以在请求和响应之间做一些操作，并且可以将这个处理结果传递给下一个函数继续处理

```
中间件函数，帮助拆解主程序的业务逻辑，
并且每一个的中间件函数处理的结果都会传递给下一个中间件函数。
就好比工厂里流水线工人清洗一个箱子:
第一个人清洗侧面，第二个人清洗底面，第三个人清洗顶面，。。。
这条流水线结束后，箱子也就清洗干净了
各做各的，不相互影响，又彼此协作
```

![image-20210202150246807](http://image.brojie.cn/image-20210202150246807.png)

### 2) 基本使用

编写`src/02_middleware.js`

```js
// 一. 导入koa
const Koa = require('koa')
// 二. 实例化对象
const app = new Koa()
// 三. 编写中间件
app.use((ctx, next) => {
  console.log('我来组成身体')
  next()
})
app.use((ctx, next) => {
  console.log('我来组成头部')
  next()
})
app.use((ctx) => {
  console.log('---------')
  ctx.body = '组装完成'
})
// 四. 启动服务
app.listen(3000, () => {
  console.log('server is running on http://localhost:3000')
})

```

输出结果

```
我来组成身体
我来组成头部
----------
```

### 3) 链式调用

`app.use`实际上会返回`this`

摘自[官方文档](https://koa.bootcss.com/#application)

![image-20210929154148634](http://image.brojie.cn/image-20210929154148634.png)

上述代码可以写成

```js
// 一. 导入koa
const Koa = require('koa')
// 二. 实例化对象
const app = new Koa()
// 三. 编写中间件
app
  .use((ctx, next) => {
    console.log('我来组成身体')
    next()
  })
  .use((ctx, next) => {
    console.log('我来组成头部')
    next()
  })
  .use((ctx) => {
    console.log('---------')
    ctx.body = '组装完成'
  })
// 四. 启动服务
app.listen(3000, () => {
  console.log('server is running on http://localhost:3000')
})

```

> 注意

在use中, 一次只能接受一个函数做为参数

## 2 洋葱圈模型

![image-20210930095311682](http://image.brojie.cn/image-20210930095311682.png)

```js
// 1. 导入koa包
const Koa = require('koa')
// 2. 实例化对象
const app = new Koa()
// 3. 编写中间件
app.use((ctx, next) => {
  console.log(1)
  next()
  console.log(2)
  console.log('---------------')
  ctx.body = 'hello world'
})

app.use((ctx, next) => {
  console.log(3)
  next()
  console.log(4)
})

app.use((ctx)=>{
  console.log(5)
})
// 4. 监听端口, 启动服务
app.listen(3000)
console.log('server is running on http://localhost:3000')
```

## 3 异步处理

如果中间件中存在一些异步的代码, Koa也提供了统一的处理方式.

首先, 我们要了解async await语法

### 1) async await语法

async: 声明异步函数

await: 后跟一个promise对象

如果要使用await, 需要在函数声明前加上`async`

### 2) 示例

> 需求

1. 在middleware1中, 构造一个message = aa
2. 在middleware2中, 同步追加bb
3. 在middleware3中, 异步追加cc

最终在middleware1中, 通过body返回数据

# 三. 路由

## 1 什么是路由

> 路由

- 建立URL和处理函数之间的对应关系
- **主要作用**: 根据不同的Method和URL返回不同的内容

> 需求

根据不同的Method+URL, 返回不同的内容

- Get 请求/, 返回'这是主页'
- Get 请求/users, 返回'这是用户页'
- Post请求/users, 返回'创建用户'

```js
// 一. 导入koa
const Koa = require('koa')
// 二. 实例化对象
const app = new Koa()
// 三. 编写中间件
app.use((ctx) => {
  if (ctx.url == '/') {
    ctx.body = '这是主页'
  } else if (ctx.url == '/users') {
    if (ctx.method == 'GET') {
      ctx.body = '这是用户列表页'
    } else if (ctx.method == 'POST') {
      ctx.body = '创建用户'
    } else {
      ctx.status = 405 // 不支持的请求方法
    }
  } else {
    ctx.status = 404
  }
})
// 四. 启动服务
app.listen(3000, () => {
  console.log('server is running on http://localhost:3000')
})

```

## 2 使用koa-router

### 1) 安装

```
npm i koa-router
```

### 2) 使用

在koa的基础上

1. 导入`koa-router`包
2. 实例化router对象
3. 使用router处理路由
4. 注册中间件

```js
// 一. 导入koa
const Koa = require('koa')
// 二. 实例化对象
const app = new Koa()

// 三. 导入koa-router, 实例化路由对象
const Router = require('koa-router')
const router = new Router()
router.get('/', (ctx) => {
  ctx.body = '这是主页'
})
router.get('/users', (ctx) => {
  ctx.body = '这是用户页'
})
router.post('/users', (ctx) => {
  ctx.body = '创建用户页'
})
// 四. 注册路由中间件
app.use(router.routes())
app.use(router.allowedMethods())
// 五. 启动服务
app.listen(3000, () => {
  console.log('server is running on http://localhost:3000')
})

```

### 3) 优化

我们最好将一个模块放到一个单独的文件中. 分离出一个router路由层

创建`src/router/user.route.js`

```js
// 导入koa-router, 实例化路由对象
const Router = require('koa-router')
const router = new Router()

router.get('/users', (ctx) => {
  ctx.body = '这是用户页'
})
router.post('/users', (ctx) => {
  ctx.body = '创建用户页'
})

module.exports = router

```

再导入

```js
// 一. 导入koa
const Koa = require('koa')
// 二. 实例化对象
const app = new Koa()

const userRouter = require('./router/user.route')

// 四. 注册路由中间件
app.use(userRouter.routes()).use(userRouter.allowedMethods())

// 五. 启动服务
app.listen(3000, () => {
  console.log('server is running on http://localhost:3000')
})

```

可以进一步优化, 使代码更加简洁

给路由设置一个统一的前缀

```js
// 导入koa-router, 实例化路由对象
const Router = require('koa-router')
const router = new Router({ prefix: '/users' })

router.get('/', (ctx) => {
  ctx.body = '这是用户页'
})
router.post('/', (ctx) => {
  ctx.body = '创建用户页'
})

module.exports = router
```

# 四. 请求参数解析

## 1 为什么

在很多场景中, 后端都需要解析请求的参数, 做为数据库操作的条件

> 场景一

前端希望通过请求, 获取id=1的用户信息

![image-20211009154415445](http://image.brojie.cn/image-20211009154415445.png)

接口设计

```
GET /users/:id
```

> 场景二

前端希望查询年龄在18到20的用户信息

![image-20211009161051380](http://image.brojie.cn/image-20211009161051380.png)

> 练习

前端希望查询1月到3月的账单信息

![image-20211009155557167](http://image.brojie.cn/image-20211009155557167.png)

接口设计

```
GET /bills?start=1&end=3
```

> 场景三

前端注册, 填写了用户名, 年龄, 传递给后端, 后端需要解析这些数据, 保存到数据库

![image-20211009161448091](http://image.brojie.cn/image-20211009161448091.png)

> 小结

对于不同的Http请求, 需要使用不同的方式携带参数

- GET请求: 在URL中以键值对传递
- POST/PUT/PATCH/DELET请求: 在请求体中传递

## 2 处理URL参数

### 1) query

在GET请求中, 如果以键值对的形式传参, 可以通过`query`得到

```js
// GET /users?start=18&end=20 ---- 获取所有的用户信息, 返回一个数组
router.get('/', (ctx) => {
  // 通过 ctx.query 是ctx.request.query的代理 解析键值对参数
  const { start = 0, end = 0 } = ctx.query
  const res = db.filter((item) => item.age >= start && item.age <= end)
  // 解析键值对
  res.length == 0 ? ctx.throw(404) : (ctx.body = res)
})
```

### 2) params

在GET请求中, 有些参数可以通过路由传参, 可以通过`params`得到

```js
// GET /users/:id ---- 根据id获取单个用户的信息, 返回一个对象
router.get('/:id', (ctx) => {
  // 解析id参数
  const id = ctx.params.id
  const res = db.filter((item) => item.id == id)

  if (!res[0]) ctx.throw(404)

  ctx.body = res[0]
})
```

## 3 处理body参数

Koa原生支持body参数解析, 通常借助社区的中间件实现. 官方推荐的有

- koa-bodyparser
- koa-body

### 1) 安装koa-body

```
npm install koa-body
```

### 2) 注册

```js
// 注册KoaBody中间件, 解析请求体中的参数, 挂载到ctx.request.body
const KoaBody = require('koa-body')
app.use(KoaBody())
```

### 3) 使用

通过`ctx.request.body`获取请求体中的数据

# 五. 错误处理

对于接口编程, 错误处理是非常重要的环节, 通过提供更友好的提示

1. 提高错误定位的效率
2. 提高代码的稳定性和可靠性

## 1 原生的错误处理

一般Koa中的错误分为三类

- 404: 当请求的资源找不到, 或者没有通过`ctx.body`返回时, 由koa自动返回
- 手动抛出: 通过`ctx.throw`手动抛出
- 500: 运行时错误

Koa类是继承Emitter类, 因此可以

- 通过emit提交一个错误
- 通过on进行统一错误处理

```js
app.on('error', (err, ctx) => {
  console.error(err)
  ctx.body = err
})
```

## 2 使用中间件

### 1) 安装

```
npm i koa-json-error
```

### 2) 使用

> 基本使用

```js
const error = require('koa-json-error')
app.use(error())
```

> 高级使用

```js
const error = require('koa-json-error')
app.use(
  error({
    format: (err) => {
      return { code: err.status, message: err.message, result: err.stack }
    },
    postFormat: (err, obj) => {
      const { result, ...rest } = obj
      return process.env.NODE_ENV == 'production' ? rest : obj
    },
  })
)
```

