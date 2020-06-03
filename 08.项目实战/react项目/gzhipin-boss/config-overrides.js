const { override, fixBabelImports, addLessLoader } = require('customize-cra')
// const theme = require('./package.json').theme
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
  })
)