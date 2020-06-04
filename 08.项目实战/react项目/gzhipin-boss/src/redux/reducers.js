/* 包含多个reducer函数：根据原来state和指定action返回一个新的state */
import {combineReducers} from 'redux'
import {AUTH_SUCCESS, ERROR_MSG} from "./action-types";

const initUser = {
  // 用户名
  username: '',
  // 用户类型
  type: '',
  // 错误信息
  msg: ''
}

function user(state=initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      // return action.data
      // data对象解构，覆盖前面对象
      return {...state, ...action.data}    // data是user
    case ERROR_MSG:
      return {...state, msg: action.data}  // data是msg
    default:
      return state
  }
}

/* 向外暴露的状态的结构：{user: {}} */
export default combineReducers({
  user
})