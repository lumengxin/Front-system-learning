import {ADD_COMMENT, DELETE_COMMENT, RECEIVE_COMMENTS} from './action-types'
import {combineReducers} from 'redux'

// const initComments = [
//   {username: 'tom', content: 'hello, i am tom'},
//   {username: 'jack', content: 'hihi'}
// ]
const initComments = []

function comments(state=initComments, action) {
  console.log("counter -> counter", state, action)
  // 都需要产生一个新的状态，且不改变原来的状态
  switch (action.type) {
    case ADD_COMMENT:
      // action.data: 新加的comment对象
      return [action.data, ...state]
    case DELETE_COMMENT:
      // return state.splice(action.data)
      // 涉及删除多用filter，不改变原数组
      return state.filter((comment, index) => index !== action.data)
    case RECEIVE_COMMENTS:
      return action.data
    default:
      return state
  }
}

function counter(state = 0, action) {
  switch(action.type) {
    // case INCRMENT:
    //   return state + action.data
    // case DECRMENT:
    //   return state - action.data
    default:
      return state
  }
}

// redux向外暴露的state是一个对象： { counter: 0, comments: [] }
export default combineReducers({
  counter,
  comments
})
