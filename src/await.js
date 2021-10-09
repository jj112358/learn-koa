// await 不能单独使用, 必须跟async连用

// await 后面跟一个promise的对象, 表达式返回promise的结果
async function foo() {
  // const res = await 123
  const p = new Promise((resolve, reject) => {
    // 调用resovle, p的结果是123, 状态是fulfilled
    resolve(123)
  })
  const res = await p
  console.log(res)
}

foo()
