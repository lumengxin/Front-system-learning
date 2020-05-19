import {createStore, applyMiddleware} from 'redux'
// import {comments} from './reducers'
import reducers from './reducers'
// 异步请求中间件
import thunk from 'redux-thunk'
// redux插件调试工具
import {composeWithDevTools} from 'redux-devtools-extension'

export default createStore(
  // comments,
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
)