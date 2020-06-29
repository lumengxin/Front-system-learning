import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import PubSub from 'pubsub-js'

export default class Users extends Component {
  /* static propTypes = {
    searchName: PropTypes.string.isRequired
  } */
  state = {
    initView: true,
    loading: false,
    users: null,
    errorMsg: null
  }

  componentDidMount() {
    // 订阅消息, msg必须是第一个参数（事件名search)
    // 普通函数，this.setState指向不对
    PubSub.subscribe('search', (msg, searchName) => {
      console.log(msg, searchName)
      this.setState({
        initView: false,
        loading: true 
      })
      axios.get(`https://api.github.com/search/users?q=${searchName}`)
        .then(response => {
          const result = response.data
          const users = result.items.map(item => {
            return {
              name: item.login,
              url: item.html_url,
              avatar: item.avatar_url
            }
          })
          console.log("Users -> componentDidMount -> users", users)
          this.setState({loading: false, users})
        })
        .catch(err => {
          console.log(err)
        })
    })
  }

  // 组件接收到新的属性时回调
  /* componentWillReceiveProps(nextProps) {
    const {searchName} = nextProps
    
    this.setState({
      initView: false,
      loading: true 
    })
    axios.get(`https://api.github.com/search/users?q=${searchName}`)
      .then(response => {
        const result = response.data
        console.log(result)
        // result.items.map(item => ({ .. }))
        const users = result.items.map(item => {
          return {
            name: item.login,
            url: item.html_url,
            avatar: item.avatar_url
          }
        })
        this.setState({loading: false, users})
      })
      .catch(err => {
        console.log(err)
      })
  } */

  render() {
    const {initView, loading, users, errorMsg} = this.state
    const {searchName} = this.props
    if(initView) {
      return <h2>请输入关键字进行搜索{searchName}</h2>
    } else if(loading) {
      return <h2>正在搜索中..</h2>
    } else if(errorMsg) {
      return <h2>{errorMsg}</h2>
    } else {
      return (
        <div className="row">
          {
            // => { retrun () }
            users.map((user, index) => (
              <div className="card" key={index}>
                <a href={user.url} target="_blank">
                  <img
                    src={user.avatar}
                    style={{width: 100}}
                  />
                </a>
                <p className="card-text">{user.name}</p>
              </div>
            ))
          }
        </div>
      )
    }
    
  }
}
