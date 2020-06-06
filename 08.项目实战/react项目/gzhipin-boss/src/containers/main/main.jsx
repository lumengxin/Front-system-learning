/* 注册路由组件 */
import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import LaobanInfo from '../laoban-info/laoban-info'
import DashenInfo from '../dashen-info/dashen-info'
import {connect} from 'react-redux'

class Main extends Component {
  render() {
    // 检查用户是否已登录
    const {user} = this.props
    if (!user._id) {
      return <Redirect to='/login' />
    }

    return (
      <div>
        <Switch>
          <Route path='/laobaninfo' component={LaobanInfo} />
          <Route path='/dasheninfo' component={DashenInfo} />
        </Switch>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user})
)(Main)