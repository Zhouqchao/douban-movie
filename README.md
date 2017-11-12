# 仿移动端豆瓣电影

### JavaScript + jQuery +豆瓣电影API仿移动端豆瓣电影

## 在线预览：
[Douban-Movie](http://zhouqichao.com/douban-movie/dist/index.html)

**Notice:** _请使用**手机浏览器** 或 **电脑开启device mode**浏览_

## 页面构成

### 1. 首页
+ top250榜单
+ 北美电影榜
+ 电影搜索

### 2. 电影详情页
+ 电影简介
+ 电影演员列表

### 3. 演员详情页
+ 演员简介
+ 演员代表作品列表

## 实现功能：

### 1. 首页
---
##### 1. 导航栏Tab切换
使用纯JavaScript实现[Tab组件](https://github.com/Zhouqchao/douban-movie/blob/master/src/js/tabComponent.js)，完成导航栏Tab切换功能，并且每次切换都会自动滚动到当前页面顶部。
##### 2.电影列表无限滚动加载
使用jQuery实现电影列表的无限滚动加载，并用状态锁isLoading和setTimeout,clearTimeout函数配合减少了滚动产生的重复请求。
##### 3. 阿里iconfont实现各种icon小图标
使用阿里的iconfont实现各种小图标。

### 2. 电影详情页
---
##### 1. 歌单简介的展开与收缩
使用jQuery中的`toggleClass()`方法配合css实现歌单简介的展开与收缩。
##### 2. 电影演员列表水平滚动
使用`white-space:nowrap;overflow-x:scroll;`配合`::-webkit-scrollbar`等样式实现电影演员列表的水平滚动
### 3. 演员详情页
---
##### 1. 演员代表作品列表水平滚动
使用`white-space:nowrap;overflow-x:scroll;`配合`::-webkit-scrollbar`等样式实现演员代表作品列表的水平滚动


## 页面优化
### 1. 首页
1. **首页添加了h1标题**，内容为“豆瓣电影”,设置其样式为`text-indent:-9999px`，**有利于SEO**。

2. **首页的nav导航栏**，每次切换都会让滚动条滚动到页面顶部。
```
JavaScript:
document.body.scrollTop = document.documentElement.scrollTop = 0;
jQuery:
$(window).scrollTop(0);
```
### 2. 电影详情页
1. **电影详情页简介部分的多行文字的ellipsis效果**实现：
```
	element {
		display: -webkit-box;
		-webkit-line-clamp:2;
		-webkit-box-orient: vertical; 
		overflow:hidden;
	}
```
**Notice:** element内最多只能包含一层子元素，且必须是行内元素(eg:&lt;span&gt;),否则无法实现多行文本ellipsis效果。

2. **首页的电影，演员搜索部分**，目前实现了两种方式实现搜索：

	+ input输入时，点击搜索按钮
	+ input输入后，点击enter键(手机里的 完成/确认/换行 键)

## 移动端调试
这里，我参考了github上的一个repo：[各种真机远程调试方法汇总](https://github.com/jieyou/remote_inspect_web_on_real_device)。
主要分为android和ios两种调试。

### 1. android调试
android手机uc浏览器可以使用[uc开发者版浏览器](http://plus.uc.cn/document/webapp/doc5.html)进行调试，其他手机浏览器可以配合PC端chrome浏览器的`chrome://inspect`进行调试。
### 2. ios调试
ios手机safari浏览器可以使用safari浏览器配合Mac系统safari浏览器进行调试。

当然，也可以使用weinre等工具进行调试。

## 性能优化

### HTML
1. 用link标签引入外部css样式表，放入&lt;head&gt;标签内的最底部，用script标签引入外部JavaScript脚本放入&lt;body&gt;标签内的最底部。
2. 尽量避免过多使用div,span等没有太多语义化的标签，改用section,p等标签替代。

### CSS
1. **选择器层级嵌套匹配尽量不要超过4层**。
2. **需要经常复用的样式尽量写在一个className上**，然后在html中相应的元素上添加className。


### JavaScript
1. 使用了立即执行函数（IIFE）把代码封闭。
2. 所有属性和方法都被封装在了一个全局变量（对象）中，避免了全局变量污染的问题。
3. 将固定不变的节点保存到变量中，避免重复调用。

### Gulp

1. 给CSS自动补全前缀并压缩（使用了[gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer),[gulp-cssnano]()）。

### Webpack
1. 使用了 [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin)对HTML文件压缩
2. 使用了`new webpack.optimize.UglifyJsPlugin()`对JavaScript文件压缩。
