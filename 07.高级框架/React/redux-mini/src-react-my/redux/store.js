// import {createStore} from 'redux'
// 改为自定义createStore
import {createStore} from '../libs/redux'
import reducers from './reducers'

export default createStore(reducers)