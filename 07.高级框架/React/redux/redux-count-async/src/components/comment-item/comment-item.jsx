import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './commentItem.css'

class CommentItem extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
  }

  handleDel = () => {
    const {comment,deleteComment,index} = this.props
    if(window.confirm(`确定删除${comment.username}的评论吗?`)) {
      deleteComment(index)
    }
  }

  render() {
    const {comment} = this.props
    return (
      <li className="list-group-item">
        <div className="handle">
          <a href="javascript:;" onClick={this.handleDel}>删除</a>
        </div>
        <p className="user">
          <span>{comment.username}</span>
          <span>:</span>
        </p>
        <p className="centence">{comment.content}</p>
      </li>
    )
  }
}

export default CommentItem
