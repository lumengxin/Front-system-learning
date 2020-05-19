import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CommentAdd extends Component {
  static propTypes = {
    addComment: PropTypes.func.isRequired
  }

  state = {
    username: '',
    content: '',
  }
  // 箭头函数不需要考虑this
  handleSubmit = () => {
    // 收集数据,并封装成comment对象
    const comment = this.state
    // 更新状态
    this.props.addComment(comment)
    // 清除输入数据
    this.setState({
      username: '',
      content: ''
    })
  }
  handleChange = (e) => {
    const username = e.target.value
    this.setState({username})
  }
  handleContentChange = (e) => {
    const content = e.target.value
    this.setState({content})
  }

  render() {
    const { username, content } = this.state
    return (
      <div className="col-md-4">
        <form className="form-horizontal">
          <div className="form-group">
            <label>用户名</label>
            <input
              type="text"
              className="form-control"
              placeholder="用户名"
              value={username}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>评论内容</label>
            <textarea
              className="form-control"
              rows="6"
              placeholder="评论内容"
              value={content}
              onChange={this.handleContentChange}
            ></textarea>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button
                onClick={this.handleSubmit}
                type="button"
                className="btn btn-default pull-right"
              >
                提交
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default CommentAdd
