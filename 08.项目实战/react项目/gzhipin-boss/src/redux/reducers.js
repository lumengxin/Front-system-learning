/* 包含多个reducer函数：根据原来state和指定action返回一个新的state */
import {combineReducers} from 'redux'

function add(state=0, action) {
  return state
}

function del(state= 0, action) {
  return state
}

/* 向外暴露的状态的结构：
  {add: 0, del: 0}
*/
export default combineReducers({
  add,
  del
})