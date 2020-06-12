/* 包含多个reducer函数：根据原来state和指定action返回一个新的state */
import {combineReducers} from 'redux'
import {AUTH_SUCCESS, 
  ERROR_MSG, 
  RECEIVE_USER, 
  RESET_UESR, 
  RECEIVE_USER_LIST,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG,
  MSG_READED
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
      const {users, chatMsgs, userid} = action.data
      console.log("chat -> action.data", action.data)
      return {
        users,
        chatMsgs,
        // 直接在message也可统计
        unReadCount: chatMsgs.reduce((preTotal, msg) => preTotal + (!msg.read && msg.to === userid ? 1 : 0), 0)
      }
    case RECEIVE_MSG:
      // const {chatMsg, userid} = action.data
      const {chatMsg} = action.data
      // debugger
      return {
        users: state.users,
        chatMsgs: [...state.chatMsgs, chatMsg],
        unReadCount: state.unReadCount + (!chatMsg.read && chatMsg.to === action.data.userid ? 1 : 0)
      }
    case MSG_READED:
      const {from, to, count} = action.data
      // state.chatMsgs.forEach(msg => {
      //   if (msg.from === from && msg.to === to && !msg.read) {
      //     msg.read = true
      //   }
      // })
      return {
        users: state.users,
        chatMsgs: state.chatMsgs.map(msg => {
          // 需要更新
          if (msg.from === from && msg.to === to && !msg.read) {
            // 新的msg中read: true,不改变原来的msg
            /* msg.read = true
            return msg */
            return {...msg, read: true}
          } else {
            // 不需要更新
            return msg
          }
        }),
        unReadCount: state.unReadCount - count
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
