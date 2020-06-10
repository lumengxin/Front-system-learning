/* 包含多个reducer函数：根据原来state和指定action返回一个新的state */
import {combineReducers} from 'redux'
import {AUTH_SUCCESS, 
  ERROR_MSG, 
  RECEIVE_USER, 
  RESET_UESR, 
  RECEIVE_USER_LIST,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG
} from "./action-types";
import {getRedirectTo} from '../utils'

const initUser = {
  // 用户名
  username: '',
  // 用户类型
  type: '',
  // 错误信息
  msg: '',
  // 需要自动重定向的路径
  redirectTo: ''
}

function user(state=initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      // return action.data
      // data对象解构，覆盖前面对象
      // return {...state, ...action.data}    // data是user
      const {type, header} = action.data
      return {...action.data, redirectTo: getRedirectTo(type, header)}
    case ERROR_MSG:
      return {...state, msg: action.data}  // data是msg
    case RECEIVE_USER:
      return action.data
    case RESET_UESR:
      return {...initUser, msg: action.data} 
  default:
      return state
  }
}

const initUserList = []
function userList(state=initUserList, action) {
  switch (action.type) {
    case RECEIVE_USER_LIST:
      return action.data
    default:
      return  state
  }
}

const initChat = {
  // 所有用户简要信息（姓名，头像）
  users: {},
  // 当前用户所有消息
  charMsgs: [],
  // 未读消息总数
  unReadCound: 0
}
function chat(state=initChat, action) {
  switch (action.type) {
    case RECEIVE_MSG_LIST:
      const {users, chatMsgs} = action.data
      console.log("chat -> action.data", action.data)
      return {
        users,
        chatMsgs,
        unReadCound: 0
      }
    case RECEIVE_MSG:
      const chatMsg = action.data
      return {
        users: state.users,
        chatMsgs: [...state.chatMsgs, chatMsg],
        unReadCound: 0
      }
    default:
      return state
  }
}

/* 向外暴露的状态的结构：{user: {}} */
export default combineReducers({
  user,
  userList,
  chat
})
