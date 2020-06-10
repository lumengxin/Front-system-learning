/* 请求接口函数的模块 */
import ajax from "./ajax";

// export function rerRegister() {}
/* 端口号不同，存在跨域
*  解决：1.jsonp,只能解决get； 2. cross 服务器端配置；
*       3.代理（代理服务器，存在于客户端，帮助转发请求）
*  */
// export const reqRegister = (user) => ajax('http://localhost:4000/register', user, 'POST')

// 注册
export const reqRegister = (user) => ajax('/register', user, 'POST')

// 登录
export const reqLogin = ({username, password}) => ajax('/login', {username, password}, 'POST')

// 更新用户
export const reqUpdateUser = (user) => ajax('/update', user, 'POST')

// 获取用户信息
export const reqUserInfo = () => ajax('/user')

// 获取用户列表
export const reqUserList = (type) => ajax(('/userlist'), {type})

// 获取用户的聊天消息列表
export const reqChatMsgList = () => ajax('/msglist')

// 修改消息为已读
export const reqReadMsg = (from) => ajax('/readmsg', {from}, 'POST')