/* 注册路由组件 */
import React, { Component } from 'react'
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Radio,
  Button,
} from 'antd-mobile'
// const ListItem = List.Item
import Logo from '../../components/logo/logo'
import {connect} from 'react-redux'
import {register} from "../../redux/actions"
import {Redirect} from 'react-router-dom'

const ListItem = List.Item

class Register extends Component {
  state = {
    // 用户名
    username: '',
    // 密码
    password: '',
    // 确认密码
    password2: '',
    // 用户类型：dashen/laoban
    type: 'dashen',
  }

  register = () => {
    // console.log(this.state);
    this.props.register(this.state)
  }

  toLogin = () => {
    this.props.history.push('./login')
  }

  handlerChange = (name, val) => {
    this.setState({
      // 属性名不是name, 而是变量name的值
      [name]: val,
    })
  }

  render() {
    const {type} = this.state

    const {msg, redirectTo} = this.props.user
    if (redirectTo) {
      return <Redirect to={redirectTo} />
    }

    return (
      <div>
        <NavBar>硅谷直聘</NavBar>
        <Logo />
        <WingBlank>
          <List>
            {msg ? <div className='error-msg'>{msg}</div> : null}

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
            <InputItem
              placeholder="请输入确认密码"
              type="password2"
              onChange={(val) => {
                this.handlerChange('password2', val)
              }}
            >
              确认密码：
            </InputItem>
            <WhiteSpace />
            <ListItem>
              <span>用户类型：</span>
              &nbsp;&nbsp;&nbsp;
              <Radio
                checked={type === 'dashen'}
                onChange={() => this.handlerChange('type', 'dashen')}
              >
                大神
              </Radio>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Radio
                checked={type === 'laoban'}
                onChange={() => this.handlerChange('type', 'laoban')}
              >
                老板
              </Radio>
            </ListItem>
            <WhiteSpace />
            <Button type="primary" onClick={this.register}>
              注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册
            </Button>
            <Button onClick={this.toLogin}>已有账户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
    state => ({user: state.user}),
    {register}
)(Register)