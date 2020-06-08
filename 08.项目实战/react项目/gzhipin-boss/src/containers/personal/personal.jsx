/* 个人界面路由容器组件 */
import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Result, List, WhiteSpace, Button, Modal} from 'antd-mobile'
import Cookies from 'js-cookie'
import {resetUesr} from '../../redux/actions'

const Item = List.Item
const Brief = Item.Brief

class Personal extends Component {
  logout = () => {
    // 点击事件不响应。底部nav-footer样式高度为100%，遮挡了其他元素
    // alert('test------')
    Modal.alert('退出', '确认退出登录吗？', [
      {
        text: '取消'
      },
      {
        text: '确定',
        onPress: () => {
          Cookies.remove('userid')
          this.props.resetUesr()
        }
      }
    ])
  }

  render() {
    const {username, info, header, company, post, salary} = this.props.user
    return(
      <div style={{marginTop: 40}}>
        <Result img={<img src={require(`../../assets/images/${header}.png`)} style={{width: 50}} />}
          title={username}
          message={company}
        >
        </Result>
        <List renderHeader={() => '相关信息'}>
          <Item multipleLine>
            <Brief>职位：{post}</Brief>
            <Brief>简介：{info}</Brief>
            {
              salary ? <Brief>薪资：{salary}</Brief> : null
            }
          </Item>
        </List>
        <WhiteSpace />
        <List>
          <Button type='warning' onClick={this.logout}>退出登录</Button>
        </List>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {resetUesr}
)(Personal)