// node内置模块，设置路径
const path = require('path');

module.exports = {
  // 入口文件配置
  entry: './src/js/entry.js',
  // 出口/输出配置
  output: {
    // 输出的文件名
    filename: 'bundle.js',
    // __dirname 根目录
    path: path.resolve(__dirname, 'dist/js'),
    // 加载大图从js中找（不推荐，热加载时有问题）
    publicPath: 'js/'
  },
  module: {
    rules: [
      // 处理css
      {
        test: /\.css$/,
        use: [
          // 将css应用到head头部中
          'style-loader', 
          // 只负责加载css到js中，不会报错
          'css-loader'
        ]
      },
      // 处理图片，file-loader就可以
      // url-loader是对象file-loader的上层封装，需配合使用
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            // 加密：base64 MD5 哈希值
            // 小于8k图片以base64 打包到js中
            // 大于8k图片直接放在js同级目录，加载不到（需移至dist根目录）
            // 解决：1.将index.html和资源放到同一目录；2.配置publicPath
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  }
};