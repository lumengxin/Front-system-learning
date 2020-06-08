/* 大神主界面路由容器组件 */
import React, { Component } from 'react'
import {connect} from 'react-redux'
import UserList from '../../components/user-list/user-list'
import {getUserList} from '../../redux/actions'

class Dashen extends Component {
  componentDidMount() {
    this.props.getUserList('laoban')
  }

  render() {
    return(
      <div>
        <UserList userList={this.props.userList} />
      </div>
    )
  }
}

export default connect(
  state => ({userList: state.userList}),
  {getUserList}
)(Dashen)