歌单item

* 图片边框线#f6f6f6 1px
* 右上播放量 #fff 
* 描述 #333

module 

- 标题  #333333 
- 右上按钮字体 #333333 
- 右上按钮边框 #e6e6e6 2px

播放按钮

* 网易云颜色 #ff3a3a 
* 边框 #e6e6e6

歌曲

* 图片 外边框 #eeeeee
* 歌曲名 #333
* 作者 #999
* SQ文字描述 #808080 
* SQ图标 #fe672e

新歌新碟

* 未选中：新碟 字体 #999999
* 选中：#333333
* 分割线 #e6e6e6
* 独家小图标 #ff3a3a



M图标module

* 内容背景色 #f8f8f8
* 字体#636363



按钮横栏

* 渐变按钮右 #ff1b10
* 渐变按钮左 #ff4f40



SQ #fe7d4c







https://zhidao.baidu.com/question/1372223252875581259.html?fr=iks&word=%D3%C3scoped%C7%EB%B2%BB%D2%AA%D6%B1%BD%D3%D3%C3%B1%EA%C7%A9%2C%BD%A8%D2%E9%D3%C3class%BB%F2%D5%DFid.%B2%BB%C8%BB%BB%E1%D3%B0%CF%EC%E4%D6%C8%BE%CB%D9%B6%C8&ie=gbk







图片底部空隙问题（对齐）

![image-20200709140543370](D:\Uttues\front-end\demos\music-player-vue\record3.assets\image-20200709140543370.png)

* 图片display：block

* 图片，与其父元素，设置vertical-align: bottom;



解决chrome最小字号限制的问题

![image-20200709150939777](D:\Uttues\front-end\demos\music-player-vue\record3.assets\image-20200709150939777.png)

```scss
.play-count {
  position: absolute;
  top: .12rem;
  right: .14rem;
  font-size: .4rem; // 设置字体大小为20px
  transform-origin: top right;
  transform: scale(.5); // 缩小到原来的一半 10px
  .iconfont.icon-bofang {
    margin-right: .02rem;
    font-size: .4rem;
    transform: scale(.8);	// 在0.8的基础上再缩小
    display: inline-block;  // 加上这一行scale才有效
  }
}
```
