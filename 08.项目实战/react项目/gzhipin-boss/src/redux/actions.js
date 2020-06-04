/* 包含多个action creator。同步action，异步action */
import {reqRegister, reqLogin} from "../api";
import {AUTH_SUCCESS, ERROR_MSG} from "./action-types";

// 注册异步action
export const register = (user) => {
    const {username, password, password2, type} = user

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
        const response = await reqRegister({username, password, type})
        const result = response.data
        if (result.code === 0) {
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
    const {username, password} = user

    if (!username) {
        return errorMsg('用户名不能为空')
    } else if (!password) {
        return errorMsg('密码不能为空')
    }

    return async dispatch => {
        const response = await reqLogin({username, password})
        const result = response.data
        if (result.code === 0) {
            dispatch(authSuccess(result.data))
        } else {
            dispatch(errorMsg(result.msg))
        }
    }
}

// 授权成功的同步action
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
// 错误提示信息的同步action
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})
