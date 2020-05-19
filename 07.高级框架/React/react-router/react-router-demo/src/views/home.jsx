import React, { Component } from 'react'
import MyNavLink from '../components/myNavLink'
import {Switch,Route,Redirect} from 'react-router-dom'
import News from './news'
import Message from './message'

export default class Home extends Component {
  render() {
    return(
      <div>
        <h2>Home组件内容</h2>
        <div>
          <ul className="nav nav-tabs">
            <li>
              <MyNavLink to='/home/news'>News</MyNavLink>
            </li>
            <li>
              <MyNavLink to='/home/message'>Message</MyNavLink>
            </li>
          </ul>
          <div>
            <Switch>
              <Route path="/home/news" component={News} />
              <Route path="/home/message" component={Message} />
              <Redirect to="home/news" />
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}