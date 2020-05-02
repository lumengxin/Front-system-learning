const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/js/main.js',
  output: {
    'filename': 'bundle.js',
    'path': path.resolve(__dirname, 'dist/js/')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
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
  },
  // webpack-dev-server默认服务于根目录下的index.html
  // 打包的bundle.js放在虚拟内存中, 不带任何路径
  devServer: {
    // 引导服务于那个路径下的index.html,不加服务器打开到 /
    contentBase: 'dist/'
  },
  plugins: [
    new HtmlWebpackPlugin({template: './index.html'}),
    new CleanWebpackPlugin(['dist'])
  ]
}