import React, { Component } from 'react'

export default class App extends Component{
  state = {
    count: 0,
    msgs: []
  }

  increment = () => {
    const number = this.select.value * 1
    const count = this.state.count
    this.setState({
      count: count + number
    })
  }
  decrement = () => {
    const number = +this.select.value
    const count = this.state.count
    this.setState({
      count: count - number
    })
  }
  incrementOdd = () => {
    const number = this.select.value * 1
    const count = this.state.count
    if (count % 2 === 1) {
      this.setState({
        count: count + number
      })
    }
  }
  incrementAsync = () => {
    const number = this.select.value * 1
    const count = this.state.count
    setTimeout(() => {
      this.setState({
        count: count + number
      })
    }, 1000)
  }

  addMsg = () => {
    const msgs = this.state.msgs
    const msg = this.input.value
    msgs.unshift(msg)
    this.setState({
      msgs
    })
  }

  render(){
    const {count} = this.state
    return (
      <div style={{marginLeft: '10rem'}}>
        <div>
          <p>click {count} times</p>
          <select ref={select => this.select = select}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>&nbsp;&nbsp;
          <button onClick={this.increment}>+</button>&nbsp;&nbsp;
          <button onClick={this.decrement}>-</button>&nbsp;&nbsp;
          <button onClick={this.incrementOdd}>increment if odd</button>&nbsp;&nbsp;
          <button onClick={this.incrementAsync}>increment async</button>
        </div>
        <br/><hr/>
        <div>
          <input type="text" ref={input => this.input = input} />
          <button onClick={this.addMsg}>添加消息</button>
          <ul>
            {
              this.state.msgs.map((msg, index) => <li key={index}>{msg}</li>)
            }
          </ul>
        </div>
      </div>
    )
  }
}