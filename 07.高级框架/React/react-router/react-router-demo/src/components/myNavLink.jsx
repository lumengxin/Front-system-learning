import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'

export default class MyNavLink extends Component {
  render() {
    // 将外部所有属性传入
    return <NavLink {...this.props} activeClassName="activeClass" />
  }
}