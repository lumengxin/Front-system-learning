/* 注册路由组件 */
import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {getRedirectTo} from '../../utils'
import {getUser} from '../../redux/actions'
import {NavBar} from 'antd-mobile'

import LaobanInfo from '../laoban-info/laoban-info'
import DashenInfo from '../dashen-info/dashen-info'
import Laoban from '../laoban/laoban'
import Dashen from '../dashen/dashen'
import Message from '../message/message'
import Personal from '../personal/personal'
import NotFound from '../../components/not-found/not-found'
import NavFooter from '../../components/nav-footer/nav-footer'
import Chat from '../chat/chat'

class Main extends Component {
  // 导航组件的相关信息数据
  navList = [ 
    {
      path: '/laoban', 
      component: Laoban,
      title: '大神列表',
      icon: 'dashen',
      text: '大神',
    },
    {
      path: '/dashen',
      component: Dashen,
      title: '老板列表',
      icon: 'laoban',
      text: '老板',
    },
    {
      path: '/message',
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: '消息',
    },
    {
      path: '/personal',
      component: Personal,
      title: '用户中心',
      icon: 'personal',
      text: '个人',
    }
  ]

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
    const {user, unReadCount} = this.props
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

    const {navList} = this
    const path = this.props.location.pathname
    const currentNav = navList.find(nav => nav.path === path)

    // 隐藏老板/大神footer导航标识
    if (currentNav) {
      if (user.type === 'laoban') {
        navList[1].hide = true
      } else {
        navList[0].hide = true
      }
    }

    return (
      <div>
        {currentNav ? <NavBar className="sticky-header ">{currentNav.title}</NavBar> : null}
        <Switch>
          {
            navList.map((nav, index) => <Route key={index} path={nav.path} component={nav.component} />)
          }
          <Route path='/laobaninfo' component={LaobanInfo} />
          <Route path='/dasheninfo' component={DashenInfo} />
          <Route path='/chat/:userid' component={Chat} />
          <Route component={NotFound} />
        </Switch>
        {currentNav ? <NavFooter navList={navList} unReadCount={unReadCount}></NavFooter> : null}
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user, unReadCount: state.chat.unReadCount}),
  {getUser}
)(Main)

/* 
1.自动登录
  - cookie中有userid(且redux中user没有_id)，发请求获取对应的user信息
  - 没有userid，自动进入登录界面
2.已经登录，当请求根路径时
  - 根据user中type和header计算出重定向的路径并跳转
*/