import {createStore} from 'redux'
// reducers: 包含多个reducer的reducer
import reducers from './reducers'

export default createStore(reducers)