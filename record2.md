#### 1.一些后面可以优化的地方

* 先用assets存放所用的图/字体，后期将icon移出来，对比打包【前端工具使用上的优化】利用缓存？
* 图标用icon-font还是小图片？
* 先用scss实现主题切换，之后尝试拆分css “前端换肤”
* 新增断网优化组件

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

  7.换肤方案实现+整理



9.创建全局过滤器（需要全局注册）

https://blog.csdn.net/qq_39905409/article/details/101053268

常用过滤器：https://www.cnblogs.com/kzxiaotan/p/11676459.html



10,.四舍五入方法比较（round和fixed）

https://www.jb51.net/article/126804.htm



11. 在git add 命令后 如何撤销已经加入到暂存区的文件呢？

	1.git reset HEAD -- . 撤销所有
	 2.git reset HEAD -- filename 撤销特定目标
	 3.git rm -cached filepath 将文件从缓存中删除





13. 移动端适配处理

淘宝https://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html

```xml
<meta name="viewport"   content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
```

```js
// rem.js
(function () {
    const docEl = document.documentElement;
    const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    const recalc = function () {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        docEl.style.fontSize = (clientWidth / 7.5) + 'px';
    };

    if (!document.addEventListener) return;
    window.addEventListener(resizeEvt, recalc, false);
    document.addEventListener('DOMContentLoaded', recalc, false);
})()
```

在main.js中import引入 rem.js，之后按照750px的设计稿编写样式即可