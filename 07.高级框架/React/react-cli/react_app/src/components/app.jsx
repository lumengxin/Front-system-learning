import React, {Component} from 'react'
import logo from '../logo.svg'
import Search from './search'
import Users from './users'

export default class App extends Component {
  // 兄弟组价通信：1.props传递 search->app app->users
  /* state = {
    searchName: ''
  }
  setSearchName = (searchName) => {
    // this.setSearchName = searchName
    // 更新状态
    this.setState({searchName})
  }

  render() {
    return(
      <div className="container"> 
        <h1 className="title">React App</h1>
        <img className="logo" src={logo} alt="logo"/>
        <Search setSearchName={this.setSearchName} />
        <Users searchName={this.state.searchName} />
      </div>
    )
  } */
  // 2.订阅/发布：
  render() {
    return(
      <div className="container"> 
        <h1 className="title">React App</h1>
        <img className="logo" src={logo} alt="logo"/>
        <Search />
        <Users />
      </div>
    )
  }
}
