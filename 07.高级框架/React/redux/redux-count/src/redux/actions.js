/* 包含所有action creator */
import {INCRMENT, DECRMENT} from '../redux/action-types'

export const increment = (number) => ({
  type: INCRMENT, data: number
})

export const decrement = (number) => ({
  type: DECRMENT, data: number
})