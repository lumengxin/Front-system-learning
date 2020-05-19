import React, { Component } from 'react'
import CommentList from '../components/comment-list/comment-list'
import CommentAdd from '../components/comment-add/comment-add'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addComment, deleteComment, getComments} from '../redux2/actions'

class App extends Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
    addComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    getComments: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.getComments()
  }

  render() {
    const {comments, addComment, deleteComment} = this.props
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
            <CommentAdd addComment={addComment} />
            <CommentList comments={comments} deleteComment={deleteComment} />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  // state => ({comments: state.comments})
  // state就是一个comments数组
  // state => ({comments: state}),
  state => ({comments: state.comments}),
  {addComment, deleteComment, getComments}
)(App)
