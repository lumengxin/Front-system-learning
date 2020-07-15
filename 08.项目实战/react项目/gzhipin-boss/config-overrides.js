const { override, fixBabelImports, addLessLoader, addWebpackAlias } = require('customize-cra')
// const theme = require('./package.json').theme
const path = require('path')
function resolve(dir) {
  return path.resolve(__dirname, '.', dir)
}

const theme = require('./theme.json')

module.exports = override(
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: theme
    // modifyVars: {
    //   '@brand-primary': 'red'
    // }
  }),
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    libraryDirectory: 'es',
    style: true
  }),
  // 配置别名
  addWebpackAlias({
    component: path.resolve(__dirname, 'src/components')
  })
)