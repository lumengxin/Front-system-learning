/* 包含多个action creator。同步action，异步action */
import {
  reqRegister,
  reqLogin,
  reqUpdateUser,
  reqUserInfo,
  reqUserList,
  reqChatMsgList,
  reqReadMsg
} from "../api";
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_UESR,
  RECEIVE_USER_LIST,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG,
  MSG_READED
} from "./action-types";
import io from 'socket.io-client'

// 注册异步action
export const register = (user) => {
  const {
    username,
    password,
    password2,
    type
  } = user

  // 前台验证不通过
  if (!username) {
    return errorMsg('用户名不能为空')
  } else if (password !== password2) {
    return errorMsg('密码不一致')
  }

  return async dispatch => {
    // 发送注册的异步请求。
    // 得到promise,通过then链式调用，获取数据
    /* const promise = reqRegister(user)
    promise.then(response => {
        const result = response.data
    }) */
    // 直接获取异步结果
    const response = await reqRegister({
      username,
      password,
      type
    })
    console.log("register -> response", response)
    const result = response.data
    if (result.code === 0) {
      _getMsgList(dispatch, result.data._id)
      // 成功，分发授权成功的同步action
      dispatch(authSuccess(result.data))
    } else {
      // 失败，分发错误提示信息的同步action
      dispatch(errorMsg(result.msg))
    }
  }
}

// 登录异步action
export const login = (user) => {
  const {
    username,
    password
  } = user

  if (!username) {
    return errorMsg('用户名不能为空')
  } else if (!password) {
    return errorMsg('密码不能为空')
  }

  return async dispatch => {
    const response = await reqLogin({
      username,
      password
    })
    const result = response.data
    if (result.code === 0) {
      _getMsgList(dispatch, result.data._id)
      dispatch(authSuccess(result.data))
    } else {
      dispatch(errorMsg(result.msg))
    }
  }
}

// 更新用户异步action
export const updateUser = (user) => {
  return async dispatch => {
    const response = await reqUpdateUser(user)
    const result = response.data
    if (result.code === 0) {
      dispatch(receiveUser(result.data))
    } else {
      dispatch(resetUesr(result.msg))
    }
  }
}

// 获取用户异步action
export const getUser = () => {
  return async dispatch => {
    const response = await reqUserInfo()
    const result = response.data
    if (result.code === 0) {
      _getMsgList(dispatch, result.data._id)
      dispatch(receiveUser(result.data))
    } else {
      dispatch(resetUesr(result.msg))
    }
  }
}

// 获取用户列表的异步actions
export const getUserList = (type) => {
  return async dispatch => {
    const response = await reqUserList(type)
    const result = response.data
    if (result.code === 0) {
      dispatch(receiveUserList(result.data))
    }
  }
}

// 发送消息的异步action
export const sendMsg = ({from, to, content}) => {
  return dispatch => {
    console.log('send msg', {from, to, content})
    // _initIO()
    io.socket.emit('sendMsg', {from, to, content})
  }
}

// 更新消息读取状态的异步action
export const readMsg = (from, to) => {
  return async dispatch => {
    const response = await reqReadMsg(from)
    const result = response.data
    if (result.code === 0) {
      const count = result.data
      dispatch(msgReaded({count, from, to}))
    }
  }
}

/* 单例对象：内存中只存一个socket对象
* 1.创建对象之前：判断对象是否已经存在，只有不存在才创建
* 2.创建之后：保存对象
*/
// 初始化wescoket
function _initIO(dispatch, userid) {
  // io既是函数也是对象
  if (!io.socket) {
    io.socket = io('ws://localhost:4000')

    // 保存对象
    io.socket.on('receiveMsg', function(chatMsg) {
      console.log('浏览器端接收到的消息：', chatMsg)
      // 只有当chatMsg是与当前用户相关的消息，才去分发同步action保存
      if (userid === chatMsg.from || userid === chatMsg.to) {
        dispatch(receiveMsg(chatMsg, userid))
      }
    })
  }
}
// 异步获取消息列表(用户‘登录’上时调用)
async function _getMsgList(dispatch, userid) {
  _initIO(dispatch, userid)

  const response = await reqChatMsgList()
  const result = response.data
  if (result.code === 0) {
    const {users, chatMsgs} = result.data
    // 分发同步action
    dispatch(receiveMsgList({users, chatMsgs, userid}))
  }
}

// 授权成功的同步action
const authSuccess = (user) => ({
  type: AUTH_SUCCESS,
  data: user
})
// 错误提示信息的同步action
const errorMsg = (msg) => ({
  type: ERROR_MSG,
  data: msg
})
// 接收用户的同步action
const receiveUser = (user) => ({
  type: RECEIVE_USER,
  data: user
})
// 重置用户的同步action
export const resetUesr = (msg) => ({
  type: RESET_UESR,
  data: msg
})
// 接收用户列表的同步action
export const receiveUserList = (userList) => ({
  type: RECEIVE_USER_LIST,
  data: userList
})
// 接收消息列表的同步action
const receiveMsgList = ({users, chatMsgs, userid}) => ({
  type: RECEIVE_MSG_LIST,
  data: {users, chatMsgs, userid}
})
// 接收一条消息的同步action
const receiveMsg = (chatMsg, userid) => ({
  type: RECEIVE_MSG,
  data: {chatMsg, userid}
})
// 读取了某条消息的同步action
const msgReaded = ({count, from, to}) => ({
  type: MSG_READED,
  data: {count, from, to}
})
