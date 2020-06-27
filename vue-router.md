定义导航链接的方式

* 使用 `<router-link>` 创建 a 标签
* 借助 router 的实例方法，编写代码来实现路由跳转（编程式的导航）



#### 编程式的导航

在 Vue 实例内部，可以通过 `$router` 访问路由实例【`this.$router.push`】

**`router.push(location, onComplete?, onAbort?)`：向 history 栈添加一个新的记录**

* 当用户点击浏览器后退按钮时，回到之前的 URL
* 点击 `<router-link :to="...">` 时，会在内部调用`router.push(...)

该方法的参数可以是一个**字符串路径**，或者一个**描述地址的对象**。例如：

```js
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: '123' }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```

**注意：如果提供了 `path`，`params` 会被忽略**

```js
// 这里的 params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user

// 处理方法: 提供路由的 `name` 或手写完整的带有参数的 `path`：
const userId = '123'
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
```

同样的规则也适用于 `router-link` 组件的 `to` 属性。

---

在 **2.2.0+**，**可选的**在 `router.push` 或 `router.replace` 中提供 `onComplete` 和 `onAbort` 回调作为第二个和第三个参数。这些回调将会在**导航成功完成** (在所有的异步钩子被解析之后) 或**终止** (导航到相同的路由、或在当前导航完成之前导航到另一个不同的路由) 的时候进行相应的调用。

在 **3.1.0+**，可以省略第二个和第三个参数，`router.push` 或 `router.replace` 将返回Promise（如果支持的话）

**注意**： 如果目的地和当前路由相同，只有参数发生了改变 (比如从一个用户资料到另一个 `/users/1` -> `/users/2`)，你需要使用 [`beforeRouteUpdate`](https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#响应路由参数的变化) 来响应这个变化 (比如抓取用户信息)。



**`router.replace(location, onComplete?, onAbort?)`： 替换掉当前的 history 记录【其余同push】**

| 声明式                            | 编程式                |
| --------------------------------- | --------------------- |
| `<router-link :to="..." replace>` | `router.replace(...)` |



 `router.go`**(n)：在 history 记录中向前或者后退多少步，类似 `window.history.go(n)`**

* 参数是一个整数

```js
// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1)

// 后退一步记录，等同于 history.back()
router.go(-1)

// 前进 3 步记录
router.go(3)

// 如果 history 记录不够用，那就默默地失败呗
router.go(-100)
router.go(100)
```

