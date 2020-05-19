import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import About from '../views/about'
import Home from '../views/home'
import MyNavLink from './myNavLink'

export default class App extends Component {
  render() {
    return (
      <div className="container center">
        <div className="row">
          <div className="col-xs-offset-2 col-xs-8">
            <div className="page-header">
              <h2>React Router Demo</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-2 col-xs-offset-2">
            <div className="list-group">
              <MyNavLink to="/about" className="list-group-item">
                About
              </MyNavLink>
              <MyNavLink to="/home" className="list-group-item">
                Home
              </MyNavLink>
            </div>
          </div>
          <div className="col-xs-6">
            <div className="panel">
              <div className="panel-body">
                {/* 路由出口 */}
                <Switch>
                  <Route path="/about" component={About} />
                  <Route path="/home" component={Home} />
                  <Redirect to="about" />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
