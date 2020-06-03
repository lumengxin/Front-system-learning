# 项目启动



# 开发过程

## day01

### 1.创建项目

create-react-app脚手架构建

> npx create-react-app gzhipin-boss;   // npm>5自带npx，不需要全局安装脚手架

### 2.目录整理

**目录生成：**

使用treer工具(npm i treer -g)

> treer -e tree.txt -i '/node_modules|\.git|build/'

**目录分析：**

```
D:\home\前端体系学习\08.项目实战\react项目\gzhipin-boss
├─config-overrides.js  // 覆盖默认配置
├─package.json
├─README.md
├─yarn-error.log
├─yarn.lock
├─src
|  ├─index.js          // 入口
|  ├─utils			   // 工具模块
|  ├─redux			   // redux相关
|  ├─containers		   // 容器组件模块
|  ├─components		   // UI组件模块
|  ├─assets			   // 公用资源
|  ├─api			   // ajax请求模块
├─public
|   ├─favicon.ico
|   ├─index.html
|   ├─logo192.png
|   ├─logo512.png
|   ├─manifest.json
|   └robots.txt
```



### 3.移动端300ms点击延迟

**public/index.html:**

```
<script src="https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js"></script>
<script>
  if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
      FastClick.attach(document.body);
    }, false);
  }
  if(!window.Promise) {
    document.writeln('<script src="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js"'+'>'+'<'+'/'+'script>');
  }
</script>
```

**移动端适配：**

```
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
```

### 4.安装antd-mobile组件库

***老版***

<p style="color: red;">...主题定制不生效(应该也是less-loader版本问题)</p>

<hr />

***新版***    [web组件](https://mobile.ant.design/docs/react/introduce-cn)

#### 4.1安装使用

> yarn add antd-mobile

使用：

```
import { Button } from 'antd-mobile'
// or 'antd-mobile/dist/antd-mobile.less'
import 'antd-mobile/dist/antd-mobile.css'; 

ReactDOM.render(
	<Button type="primary">Start</Button>,
	document.getElementById('root')
)
```

#### 4.2按需加载（create-react-app构建)

- 引入react-app-rewired并修改package.json。新版>2.x需要安装customize-cra

> yarn add react-app-rewired customize-cra -D

```
/* package.json */
"scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test --env=jsdom",
+   "test": "react-app-rewired test --env=jsdom",
}
```

- 创建config-overrides.js修改默认配置

```
module.exports = function override(config, env) {
  // do stuff with the webpack config...
  return config;
};
```

- 使用babel-plugin-import。按需加载组件代码和样式

> yarn add babel-plugin-import -D

```
const { override, fixBabelImports } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    // `style: true` 会加载 less 文件
    style: 'css',
  }),
);
```

- 更改引用方式

```
- import Button from 'antd-mobile/lib/button';
+ import { Button } from 'antd-mobile';
```

#### 4.3定制主题

使用modifyVars的方式来覆盖变量

**1）theme属性**

- 安装依赖

> yarn add less less-loader style-loader css-loader -D

- 配置babel-plugin-import加载antd-mobild less文件

```
style: true
```

- package.json中添加theme字段，配置修改样式

```
{
      ...
      "theme": {
          // "brand-primary": "red",
          "@brand-primary": "red",
          "color-text-base":  "#333",
          ...
      },
      ...
  }
```

- webpack（>3.0）配置中，添加配置。

*执行 npm run eject 命令，暴露出配置文件（此行为不可逆）*

```
const theme = require('./package.json').theme;

module.exports = {
  ...
  module: {
      ...
      rules: [
          ...
          {
              test: /\.css$/,
              use: [
                  'style-loader',
                  'css-loader',
              ],
          },
          {
              test: /\.less$/,
              use: [
                  'style-loader',
                  'css-loader',
                  {loader: 'less-loader', options: {modifyVars: theme}},
              ],
              include: /node_modules/,
          },
          ...
      ],
  },
  ...
}
```

<p style="color: red;">默认配置暴露出来后，重启项目运行失败(废弃)</p>

config-overrides.js继续配置：

```
// config-overrides.js
const { override, fixBabelImports, addLessLoader } = require('customize-cra');
const theme = require('./package.json').theme;

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: true,
  }),
  addLessLoader({
  	modifyVars: theme
  })
);
```

<p style="color: red;">报错：ValidationError: Invalid options object. Less Loader has been initialized using an options object that does not match the API schema.</p>

卸载less-loader@6.x.x , 安装5.x:

```
yarn remove less-loader;
yarn add less-loader@5.x -D;
```

#### 4.4引入路由

> yarn add react-router-dom

```
/* src/index.js */
import {HashRouter, Route, Switch} from 'react-router-dom'
import Register from './containers/register/register'
import Login from './containers/login/login'
import Main from './containers/main/main'

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path='/register' component={Register}></Route>
      <Route path='/login' component={Login}></Route>
      <Route component={Main}></Route>
    </Switch>
  </HashRouter>,
  document.getElementById('root')
)
```

#### 4.5引入redux

> yarn add redux react-redux redux-thunk

> yarn add redux-devtools-extension -D

```
D:\home\前端体系学习\08.项目实战\react项目\gzhipin-boss\src\redux
├─action-types.js
├─actions.js
├─reducers.js
└store.js
...

import {Provider} from 'react-redux'
import store from './redux/store'

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path='/register' component={Register}></Route>
        <Route path='/login' component={Login}></Route>
        <Route component={Main}></Route>
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
)
```

