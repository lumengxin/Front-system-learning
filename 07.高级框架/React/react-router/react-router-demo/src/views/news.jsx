import React, { Component } from 'react'

export default class News extends Component {
  state = {
    newArr: ['n1', 'n2', 'n3']
  }

  render() {
    return(
      <ul>
        {
          this.state.newArr.map((news, index) => <li key={index}>{news}</li>)
        }
      </ul>
    )
  }
}