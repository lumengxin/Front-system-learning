import {ADD_COMMENT, DELETE_COMMENT, RECEIVE_COMMENTS} from './action-types'

// 同步添加
export const addComment = (comment) => ({
  type: ADD_COMMENT, data: comment
})

// 同步删除
export const deleteComment = (index) => ({
  type: DELETE_COMMENT, data: index
})

// 同步接收comments
const receiveComents = (comments) => ({
  type: RECEIVE_COMMENTS, data: comments
})

// 异步获取数据
export const getComments = () => {
  return dispatch => {
    setTimeout(() => {
      const comments = [
        {username: 'tom', content: 'hello, i am tom'},
        {username: 'jack', content: 'hihi'}
      ]
      dispatch(receiveComents(comments))
    }, 1000)
  }
}