# webpack教程

中文文档：[webpack v4.42.1](https://www.webpackjs.com/)

### 1.了解webpack相关

- 什么是webpack?

  - webpack是一个模块打包器(bundler)
  - 在webpack看来，前端的所有资源文件(js/json/css/img/less/...  除了html)都会作为模块处理
  - 根据模块的依赖关系进行静态分析，生成对应的静态资源

- 理解loader

  - webpack本身只能加载js/json模块，要加载其他类型的文件（模块），需要对应的loader进行转换/加载

    `webpack1.x只能加载js`

  - Loader本身也是运行在node.js环境中的javascript模块

  - 本身是一个函数，接受源文件作为参数，返回转换结果

  - loader一般以xxx-loader的方式命名，xxx代表了这个loader要做的转换功能

- 配置文件（默认）

  - webpack.config.js: 是一个ndoe模块，返回一个json格式的配置信息对象

- 插件

  - 插件可以完成一些loader不能完成的功能
  - 插件使用一般在webpack的配置信息plugins选项中指定
  - CleanWebpackPlugin: 自动清除指定文件夹资源
  - HtmlWebpackPlugin: 自动生成html文件
  - UgligyJSPlugin: 压缩js文件



### 2.开启项目

#### 初始化项目

​	生成package.json文件：

```
{
	"name": "webpack_test",
	"version": "1.0.0"
}
```

​	安装webpack:

		- npm i -g webpack;    // 全局安装
			(webpack4.42.1会提示安装webpack-cli webapck-cli@3.3.11)
		- npm i --save-dev webpack;   // 局部安装

`先全局安装，再在项目中局部安装`

`package.json同级目录执行 npm i webpack -D; -> webpack v4.42.1`

`指定相应版本：package.json中修改；或者npm i webpack@3.8.1 -D`

### 3.编译打包应用

- 创建入口 src/js/: entry.js

`document.write('entry is work')`

- 创建主界面：dist/index.html

`<script type="text/javascript" src="bundle.js"></script>`

- 编译js

`webpack scr/js/entry.js dist/js/bundle.js`

- 查看页面效果



### 4.添加js/json文件

```
import {foo, bar} from './math';
import data from '../data/test.json';
```

编译：

> `webpack scr/js/entry.js dist/js/bundle.js`

没有全局安装wepack时：

> ./node_modules/.bin/webpack src/js/entry.js dist/js/bundle.js

### 5.Loader使用

#### 加载css

> npm i css-loader style-loader -D;

```
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  }
}
```

**webpack --display-modules : +  hidden modules, 展开隐藏模块**

**webpack --help  // 查看更多配置命令**

#### 加载图片

> npm i file-loader url-loader --save-dev;

```
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  }
}
```

编译：(自动执行webpack.config.js)

> .\node_modules\.bin\webpack



### 6.热加载

### 自动编译打包

利用webpack开发服务器工具，注意和webpack版本对应

> npm i webpack-dev-server@2.9.4 -D; 

```
devServer: {
    // 引导服务于那个路径下的index.html,不加服务器打开到 /
    contentBase: 'dist/'
}
```

*直接使用webpack-dev-server,找不到命令；package.json中配置*

```
"scripts": {
    "start": "webpack-dev-server --open"
 },
```

**启动：npm run start**

### 7.插件使用

> npm i html-webpack-plugin@2.30.1 clean-webpack-plugin@0.1.17 -D;

**注意版本，版本不对执行webpack会报错**



### 注意事项

```text
1、webpack必须要全局安装，否则不能使用webpack指令； 
2、webpack-cli必须要全局安装，否则不能使用webpack指令。 
3、webpack4.x中webpack.config.js配置文件不是必须的。 
4、默认入口文件是./src/index.js，默认输出文件./dist/main.js，其他报错无效。
5、不支持webpack 文件a 文件b的方式，如：webpack index.js bundle.js
6、node版本>8.9以上
```

### 使用步骤

```text
1、创建目录文件（项目）； 
2、初始化工程目录：npm init。 
3、全局安装webpack。 
4、全局安装webpack-cli。 
5、webpack --mode development/production进行打包，可在package.json中配置dev和build的脚本，便只需运行npm run dev/build，减少麻烦。 
6、 执行webpack其他指令参数  在 webpack --mode development/production 后加上其他参数即可。
```

