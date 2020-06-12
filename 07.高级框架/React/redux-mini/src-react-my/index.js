/* redux模块：
1. redux模块整体是一个对象模块
2. 内部包含多个函数
  // reducers: function(state, action) {return newState}
  createStore(reducers)
  // reducers: {reducers1, reducers2) 返回 function(state, action) {return newState}     
  combineReducers(reducers) 
  // 中间件
  applyMiddleware()
3. store对象的功能
  getState() // 返回当前state
  dispatch(action) // 分发action: 调用reducers()得到新的总state，执行所有已注册的监听函数
  subscibe(listener) // 订阅监听: 将监听函数保存起来
*/
import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'

import store from './redux/store'

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
)

// 监视store中的state变化，一旦变化会自动调用回调函数重新渲染
store.subscribe(function() {
  ReactDOM.render(
    <App store={store} />,
    document.getElementById('root')
  )
})