import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {WingBlank, WhiteSpace, Card} from 'antd-mobile'

const Header = Card.Header
const Body = Card.Body

class UserList extends Component {
  static propTypes = {
    userList: PropTypes.array.isRequired
  }
  render() {
    const {userList} = this.props
    return (
      <WingBlank style={{marginBottom: 50, marginTop: 45}}>
        {
          userList.map(user => (
            <div key={user._id}>
              <WhiteSpace />
              <Card>
                <Header thumb={require(`../../assets/images/${user.header}.png`)}
                  extra={user.username}
                  >
                </Header>
                <Body>
                  <div>职位：{user.post}</div>
                  {
                    user.company ? <div>公司：{user.company}</div> : null
                  }
                  {
                    user.salary ? <div>公司：{user.salary}</div> : null
                  }
                  <div>描述：{user.info}</div>
                </Body>
              </Card>
            </div>
          ))
        }
      </WingBlank>
    )
  }
}

export default connect (
  state => ({}),
  {}
)(UserList)