/* 登录路由组件 */
import React, { Component } from 'react'
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Button,
} from 'antd-mobile'
import Logo from '../../components/logo/logo'

export default class Login extends Component {
  state = {
    username: '',
    password: '',
  }

  login = () => {
    console.log(this.state);
  }

  toRegister = () => {
    this.props.history.push('./register')
  }

  handlerChange = (name, val) => {
    this.setState({
      [name]: val,
    })
  }

  render() {
    return (
      <div>
        <NavBar>硅谷直聘</NavBar>
        <Logo />
        <WingBlank>
          <List>
            <WhiteSpace />
            <InputItem
              placeholder="请输入用户名"
              onChange={(val) => {
                this.handlerChange('username', val)
              }}
            >
              用户名：
            </InputItem>
            <WhiteSpace />
            <InputItem
              placeholder="请输入密码"
              type="password"
              onChange={(val) => {
                this.handlerChange('password', val)
              }}
            >
              密&nbsp;&nbsp;&nbsp;码：
            </InputItem>
            <WhiteSpace />
            <Button type="primary" onClick={this.login}>
              登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录
            </Button>
            <Button onClick={this.toRegister}>没有账户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}
