/* 注册路由组件 */
import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import LaobanInfo from '../laoban-info/laoban-info'
import DashenInfo from '../dashen-info/dashen-info'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {getRedirectTo} from '../../utils'
import {getUser} from '../../redux/actions'

class Main extends Component {

  //  cookie中有userid(且redux中user没有_id)，发请求获取对应的user信息
  componentDidMount() {
    const userid = Cookies.get('userid')
    const {_id} = this.props.user
    if (userid && !_id) {
      // 发送异步请求，获取user
      console.log('----');
      this.props.getUser()
    }
  }

  render() {
    // 检查用户是否已登录
    /* const {user} = this.props
    if (!user._id) {
      return <Redirect to='/login' />
    } */

    // 读取cookie中userid。如果没有，自动重定向到登录界面
    const userid = Cookies.get('userid')
    // debugger
    if (!userid) {
      return <Redirect to='/login' />
    }
    // 如果有，读取redux中的user状态
    const {user} = this.props
    // 如果user为空(没有_id),返回null。根据userid异步请求
    if (!user) {
      return null
    } else {
      // 如果user有_id，则显示对应界面
      // 根据user中type和header计算出重定向的路径并跳转
      let path = this.props.location.pathname
      if (path === '/') {
        path = getRedirectTo(user.type, user.header)
        return <Redirect to={path} />
      }
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
  state => ({user: state.user}),
  {getUser}
)(Main)

/* 
1.自动登录
  - cookie中有userid(且redux中user没有_id)，发请求获取对应的user信息
  - 没有userid，自动进入登录界面
2.已经登录，当请求根路径时
  - 根据user中type和header计算出重定向的路径并跳转
*/