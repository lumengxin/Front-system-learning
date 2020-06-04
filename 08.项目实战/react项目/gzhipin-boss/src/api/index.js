/* 请求接口函数的模块 */
import ajax from "./ajax";

// 注册
// export function rerRegister() {}
/* 端口号不同，存在跨域
*  解决：1.jsonp,只能解决get； 2. cross 服务器端配置；
*       3.代理（代理服务器，存在于客户端，帮助转发请求）
*  */
// export const reqRegister = (user) => ajax('http://localhost:4000/register', user, 'POST')
export const reqRegister = (user) => ajax('/register', user, 'POST')

// 登录
export const reqLogin = ({username, password}) => ajax('/login', {username, password}, 'POST')

// 更新用户
export const reqUpdateUser = (user) => ajax('/update', user, 'POST')

