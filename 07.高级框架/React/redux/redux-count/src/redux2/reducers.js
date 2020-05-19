/* 包含n个reducer函数的模块 */
import {INCRMENT, DECRMENT} from './action-types'

export function counter(state = 0, action) {
  console.log("counter -> counter", state, action)
  switch(action.type) {
    case INCRMENT:
      return state + action.data
    case DECRMENT:
      return state - action.data
    default:
      return state
  }
}