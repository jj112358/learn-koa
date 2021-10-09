// async await是关键字

// async 用来修饰 函数, 将函数的的返回值封装成promise对象

async function foo() {
  return 123
}

const res = foo()
console.log(res)

res.then((data) => {
  console.log(data)
})
