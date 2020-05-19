## ES6使用
> 旧版bable
### 1.安装babel-cli, babel-preset-es2015, browserify 
(cli:command line interfare)
- npm i babel-cli browserify -g
- npm i babel-preset-es2015 -D
- preset 预设（将es6转换成es5的所有插件打包）

### 2.定义.babelrc文件
(rc:run control,json格式,运行时控制文件)
```
{
  "preset": ["es2015"[,"react",...]]
}
```

### 3.编译
- 使用babel将es6编译成es5(包括CommonJS语法): babel js/src -d js/build
- 使用browserify编译js: browserify js/build/main.js -o js/lib/bundle.js

### 4.引入index.html 
```
<script src="js/build/main.js"></script>
```
<p style="color: red">require is not defined...<p>
执行：
```
browserify js/build/main.js -o js/lib/bundle.js 
// 版本较老的browserify需要手动创建lib文件夹
```
重新引入：
```
<script src="js/lib/bundle.js"></script>
```

> 新版babel

1.安装：
- npm install --save-dev @babel/core @babel/cli @babel/preset-env
- npm install --save @babel/polyfill

2.配置：babel.config.json 
```
{
  "presets": [
    [
      "@babel/env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1",
        },
        "useBuiltIns": "usage",
      }
    ]
  ]
}
```

3.编译：
./node_modules/.bin/babel src/js --out-dir build





```
>npm5: 生成package-lock.json文件
npm i jquery; // 默认安装最新的
npm i jquery@1; // 1.xx中最新的
```