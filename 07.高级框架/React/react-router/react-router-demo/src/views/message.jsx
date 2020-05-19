import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import MessageDetail from './message-detail'
import MyNavLink from '../components/myNavLink'

export default class Message extends Component {
  state = {
    messages: [],
  }

  componentDidMount() {
    // 模拟ajax请求异步数据
    setTimeout(() => {
      const messages = [
        { id: 1, title: 't1' },
        { id: 2, title: 't2' },
        { id: 3, title: 't3' },
      ]
      this.setState({ messages })
    }, 1000)
  }

  showDetail(id) {
    this.props.history.push(`/home/message/messagedetail/${id}`)
  }
  showDetail2(id) {
    this.props.history.replace(`/home/message/messagedetail/${id}`)
  }
  back = () => {
    this.props.history.goBack()
  }
  forward = () => {
    this.props.history.goForward()
  }
  getPage = () => {
    window.location = 'http://www.baidu.com'
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.messages.map((m, index) => (
            <li key={index}>
              {/* <a href={`/home/message/messagedetail/${m.id}`}>{m.title}</a> */}
              <MyNavLink to={`/home/message/messagedetail/${m.id}`}>{m.title}</MyNavLink>
              {/* 回调函数传参 */}
              <button onClick={() => this.showDetail(m.id)}>push查看</button>
              <button onClick={() => this.showDetail2(m.id)}>replace查看</button>
            </li>
          ))}
        </ul>
        <p>
          <button onClick={this.back}>回退</button>
          <button onClick={this.forward}>前进</button>
        </p>
        <p>
          <button onClick={this.getPage}>页面跳转</button>
        </p>
        <br /><hr />
        {/* :xxx 占位符 */}
        <Route path="/home/message/messagedetail/:id" component={MessageDetail} />
      </div>
    )
  }
}
