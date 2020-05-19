/* 包含所有action creator */
import {INCRMENT, DECRMENT} from '../redux/action-types'

export const increment = (number) => ({
  type: INCRMENT, data: number
})

export const decrement = (number) => ({
  type: DECRMENT, data: number
})

// 同步actions返回对象，异步返回函数
export const incrementAsync = (number) => {
  return dispatch => {
    // 异步代码, 函数中书写
    setTimeout(() => {
      // 1s后分发一个增加的action
      dispatch(increment(number))
    }, 1000)
  }
}