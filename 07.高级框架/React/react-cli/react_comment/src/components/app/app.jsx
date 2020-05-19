import React, { Component } from 'react'
import CommentList from '../comment-list/comment-list'
import CommentAdd from '../comment-add/comment-add'

class App extends Component {
  // 给组件对象指定state属性
  state = {
    comments: [
      {username: 'Tom', content: 'i am tom'},
      {username: 'Jack', content: 'hello,tom'}
    ]
  }

  // 添加评论（数据在哪里，执行的行为就定义在哪里）
  addComment = (comment) => {
    const {comments} = this.state
    comments.push(comment)
    this.setState({comments})
  }
  // 删除指定评论
  deleteComment = (index) => {
    const {comments} = this.state
    comments.splice(index, 1)
    // comments.splice(index, 0 , {}) // 增加
    // comments.splice(index, 1 , {}) // 替换
    this.setState({comments})
  }

  render() {
    const {comments} = this.state
    return (
      <div>
        <header className="site-header jumbotron">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <h1>请发表对React的评论</h1>
              </div>
            </div>
          </div>
        </header>
        <div className="container">
          <div className="row">
            <CommentAdd addComment={this.addComment} />
            <CommentList comments={comments} deleteComment={this.deleteComment} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
