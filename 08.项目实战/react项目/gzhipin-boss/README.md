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
├─config-overrides.js
├─package.json
├─README.md
├─yarn-error.log
├─yarn.lock
├─src
|  ├─index.js
|  ├─utils
|  ├─redux
|  ├─containers
|  ├─components
|  ├─assets
|  ├─api
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
          "brand-primary": "red",
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

