/* react-redux模块：
1. react-redux模块整体是一个对象模块
2. 包含两个重要的属性 Provider connect
  - Provider:
  值：组件类
  作用：向所有容器子组件提供全局store对象
  使用：<Provider store={store}>...</Provider>
  - connect:
  值：高阶函数
  作用：包装组件生成容器组件，让被包装组件能与redux进行通信
  使用：connect(mapStateToProps, mapDispatchToProps)(...)

  context的理解和使用：
1. 理解
  当传递多层props麻烦时，可以选择使用context
  context时组件对象的一个属性，它的值是一个对象
  一个组件指定的context内数据，所有层次子组件都可以读取到
  如何可以尽量不要用context,可以选择用redux,redux内部利用了context
2. 使用
  父组件：
    static childContextTypes = {
      color: PropTypes.string
    }
    getChildContext() {
      return {color: this.state.color}
    }
  子组件：
    static contextTypes = {
      color: PropTypes.string
    }

    <h2 style={{color: this.context.color}}>c组件</h2> 
*/
import React from 'react'
import ReactDOM from 'react-dom'

import {Provider} from 'react-redux'
import App from './containers/App'

import store from './redux/store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
