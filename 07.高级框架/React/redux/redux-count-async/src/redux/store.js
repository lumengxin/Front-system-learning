import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import {counter} from './reducers'

const store = createStore(
  counter, 
  // 应用异步中间件
  composeWithDevTools(applyMiddleware(thunk))
)

export default store