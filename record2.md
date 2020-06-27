#### 1.一些后面可以优化的地方

* 先用assets存放所用的图/字体，后期将icon移出来，对比打包【前端工具使用上的优化】利用缓存？
* 图标用icon-font还是小图片？

#### 2.icon-font 使用方法

![image-20200627110025017](C:\Users\GZS15720\AppData\Roaming\Typora\typora-user-images\image-20200627110025017.png)

![image-20200627110050754](D:\Uttues\application\Typora\image-20200627110050754.png)

之后可以通过下列方法使用

```html
<span class="iconfont icon-xxx"></span>
<span class="iconfont">&#x33;</span>
```

#### 3.移动端适配

```
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
```





4.懒加载??

const comments = () => import(/* webpackChunkName: "group-myFavorite" */ '@/pages/commentsIndex/index')



5.webpack 按需加载

https://www.cnblogs.com/joyco773/p/9051401.html



6.为什么在vue中不需要做事件委托【可以不用】

https://forum.vuejs.org/t/is-event-delegation-necessary/3701/2



7.解决vue多次点击路由报错问题

* 版本回退 npm i vue-router@3.0 -S

* ```js
  import Router from 'vue-router'
  
  const originalPush = Router.prototype.push
  Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
  }
  ```

  