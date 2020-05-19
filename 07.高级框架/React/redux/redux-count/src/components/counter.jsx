import React, { Component } from 'react'
import '../App.css'
import PropTypes from 'prop-types'

export default class Counter extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired
  }

  increment = () => {
    const number = this.select.value * 1
    this.props.increment(number)
  }
  decrement = () => {
    const number = this.select.value * 1
    this.props.decrement(number)
  }
  incrementIfOdd = () => {
    const number = this.select.value * 1
    // const count = this.props.store.getState()
    const count = this.props.count
    if (count % 2 === 0) {
      this.props.increment(number)
    }
  }
  incrementAsync = () => {
    const number = this.select.value * 1
    setTimeout(() => {
      this.props.increment(number)
    }, 1000)
  }

  render() {
    // const {count} = this.state
    return (
      <div className="app">
        <main className="App-main">
          <p>click {this.props.count} times</p>
          <div>
            <select ref={select => this.select = select}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            <button onClick={this.increment}>+</button>
            <button onClick={this.decrement}>-</button>
            <button onClick={this.incrementIfOdd}>increment if odd</button>
            <button onClick={this.incrementAsync}>increment async</button>
          </div>
        </main>
      </div>
    )
  }
}

/* react-redux组件:
UI组件：负责ui呈现，不带业务逻辑，props接收数据。
容器组件：负责数据和业务逻辑
*/
// export default connect(
//   state => ({count: state}),
//   // 前面和prototype中一致，后面和actions中一致
//   // {increment: increment, decrement:decrement}
//   {increment, decrement}
// )(App2)