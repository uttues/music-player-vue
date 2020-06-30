#### 1.引入sass

```
npm install sass --save-dev
npm install sass-loader --save-dev
npm install node-sass --save-dev
// 如果出现报错，就执行下面这行（node-sass被墙掉了）
npm i node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
```

安装完上述包之后在 App.vue 中修改 < style lang="scss">，不报错则安装成功

#### 2.配置eslint自动修复代码

https://www.jianshu.com/p/c89e0af9e3d7

用`command+s（ctrl+s）`点击保存的时候，eslint就会帮你自动格式化以符合`.eslintrc.js`文件中的规则，不用再为了修复eslint报错的冲突而烦恼。

```json
"eslint.validate": [
  "javascript",
  "html",
  "vue"
],
"eslint.run": "onSave",
"editor.formatOnSave": true,
```

#### 3.在 vue.config.js 中配置别名

https://github.com/staven630/vue-cli4-config#alias

按步骤配置完后修改路径测试

#### 4.为 sass 提供全局样式

【若引入的是 css 文件，也可以用同样的方法引入（引入css需要使用相对路径~，否则报错，scss则不需要）】

https://github.com/staven630/vue-cli4-config#globalscss 







问题：什么时候需要加上~



### Normalize.css & Reset.css

 https://jerryzou.com/posts/aboutNormalizeCss/

选normalize.css，地址 ==》https://github.com/necolas/normalize.css/blob/master/normalize.css



### –save-dev和–save的区别

 **–save-dev 是开发时依赖的东西，–save 是发布之后还依赖的东西**

- 使用`--save-dev`安装依赖的时候就会放在package.json的devDependencies对象下面
- 使用`--save`安装依赖的时候就会出现在dependencies对象下面



### Webpack 处理静态资源的方式

https://blog.csdn.net/u013018357/article/details/88024651

https://blog.csdn.net/qappleh/article/details/103005111 好！

[https://jintang.github.io/2017/11/03/vue](https://jintang.github.io/2017/11/03/vue静态资源放在src-assets与static目录下的区别/)

public：如果静态资源不想经过 webpack 打包，该放置在public 文件夹下（而不是以前的static文件夹）

```
vue-path/
----- public/
-------- fav.ico
-------- index.html
-------- manifest.json
-------- images/ XX.jpg
----- src/
-------- assets/
------------ images/XX.jpg
-------- App.vue
```

**静态资源可以通过两种方式进行处理：**

- **会被 webpack 处理**：在 JavaScript 被导入或在 template/CSS 中通过**相对路径**被引用
- **不会经过 webpack 处理**：放置在 **public 目录**下或通过**绝对路径**被引用，使用时将会直接被拷贝

#### **从相对路径导入（.）**

在 JavaScript、CSS 或 *.vue 文件中使用**相对路径 (必须以 . 开头)** 引用一个静态资源时，该资源将会被包含进入 webpack 的**依赖图**中。在其编译过程中，所有诸如 img的…src 、background: url(…) 和 **CSS @import** 的资源 URL 都**会被解析为一个模块依赖**。

* 当被视为模块依赖时，需要**使用 `url-loader` 和 `file-loader`处理**它，这些资源可能在构建过程中被内联/复制/重命名，所以它们基本上是**源代码的一部分**。这就是为什么建议将Webpack 处理的静态资源放在 `/src` 目录中和其它源文件放一起的原因。
* **事实上，甚至不必把它们全部放在 `/src/assets`* **，可以在每个放置组件的目录中存放静态资源。

例如，url(./image.png) 会被翻译为 **require**(’./image.png’)

![image-20200625164846749](F:\Front-End\Typora\image-20200625164846749.png)

将会被编译到：

![image-20200625164911639](F:\Front-End\Typora\image-20200625164911639.png)

#### public 文件夹（static） | 绝对路径 

任何放置在 public 文件夹的静态资源都会被直接被复制到最终目录（默认是`dist/static`？？？有空看看）下，而不经过 webpack，**需要通过绝对路径来引用它们**。

* 目标目录是 `config.js` 文件中的 `build.assetsPublicPath` 和 `build.assetsSubDirectory` 连接来确定的。

```html
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
```

> public 目录提供的是一当你通过绝对路径引用它时，留意应用将会部署到哪里。如果你的应用没有部署在域名的根部，那么你需要在 vue.config.js 为你的 URL 配置 publicPath 前缀 BASE_URL。

#### 推荐

更加推荐将资源作为模块依赖图的一部分导入（相对路径），会通过 webpack 的处理并获得如下好处

- 脚本和样式表会被压缩且打包在一起，从而**避免额外的网络请求**
- 文件丢失会直接在**编译时报错**，而不是到了用户端才产生 404 错误
- 最终生成的文件名包含了内容哈希，因此你**不必担心浏览器会缓存它们的老版本**

#### 区别

```vue
<template>
   <img :src="filterIcon(item.pollingState)" alt="" class="pollingIcon"> 
</template>
<script>
    export default {
        methods: {
            filterIcon(val) {
                let commonUrl = '../../../../static/images/assetpolling/';
                if (val === 1) {
                  return commonUrl + 'pollingSuccess.png';
                } else {
                  return commonUrl + 'pollingLoading.gif';
                }
              }
        }
    }
</script>
```

如果`src`的值是一个变量，放在`public`下能访问到图片，放在`assets`下访问不到。如果是一个字符串常量，`static`和`assets`下都可以访问到。

**分析：**在 `*.vue`组件中，所有模板和CSS都会被 `vue-html-loader` 及 `css-loader` **解析**，并**查找资源URL**。所以对应的资源如果是个**字符串常量**，在**编译期**就已经被**解析为`Base64`**与代码融合为一体。而如果`src`对应的是个**变量**，只有在**运行期**才会被解析，这时候就访问不到`assets`目录下的资源了。

**结论：**当资源对应的是变量时，资源放在`static`下。第三方的类库的资源也放在`static`下。

#### 引入示例

1、常见的引入方式：路径是**固定的字符串**，图片会被webpack处理，文件若丢失会直接在编译时报错，生成的文件包含了哈希值

```html
<img src="./assets/images/01.jpg" alt=""> // √
// 编译后:
<img src="/img/01.f0cfc21d.jpg" alt="">
```

2、当路径的文件名需要**拼接变量 | v-bind 动态获取** 的时候，可使用 `require()` 引入，在 template 的`:src` 或者 script 的 `data computed` 中都可以进行 `require` 引入或拼接

```html
<!--  错误示例：<img :src="'./assets/images/02.jpg'" alt="">
		使用:src调用了v-bind指令处理其内容，相对路径不会被webpack的file-loader处理
-->

<img :src="require('./assets/images/03.jpg')" alt=""> // √
<img :src="require('./assets/images/'+ this.imgName +'.jpg')" alt=""> // √
<img :src="img3" alt=""> // √
<script>
export default:{
    data(){
        return {
          imgName:'03.jpg',
          img3:require('./assets/images/03.jpg'),
        }
      },
}
</script>
// 编译后:
<img src="/img/03.ea62525c.jpg" alt="">
```

3、**绝对路径**引入时，路径读取的是**public文件夹中的资源**，任何放置在 `public` 文件夹的静态资源都会**被简单的复制到编译后的目录中**，而不经过 webpack特殊处理。

```html
<img src="/images/04.jpg" alt=""> // -
// 编译后:
<img src="/images/04.jpg" alt="">
```

- 当你的应用被部署在一个域名的根路径上时，比如http://www.abc.com/，此时这种引入方式可以正常显示
- 但是如果你的应用没有部署在域名的根部，那么你需要为你的 URL 配置 **publicPath 前缀**。
	publicPath 是部署应用包时的基本 URL，在 vue.config.js 中进行配置，[详情参阅官方文档](https://cli.vuejs.org/zh/config/#publicpath)

```html
<img :src="this.publicPath + 'images/05.jpg'" alt=""> // √
// 编译后:
<img src="/foo/images/05.jpg" alt="">
<script>
export default:{
    data(){
        return {
          publicPath: process.env.BASE_URL,
        }
    },
}
</script>
```

```js
//vue.config.js
module.exports = {
    publicPath:'/foo/',
    ...
}
```





#### 5. chrome不能设置font-size小于12px的
* https://www.phpsong.com/2515.html
```css
.icon-bofang {
    display: inline-block;
    transform: scale(.8);
}
```


#### 6. 实现两行文本，超出用省略号表示
```css
p {
        width: 100px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
```

#### 7.插槽的使用（具名插槽）

