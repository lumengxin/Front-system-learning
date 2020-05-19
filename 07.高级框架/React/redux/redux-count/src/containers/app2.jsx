import React from 'react'
import {increment, decrement} from '../redux2/actions'
import {connect} from 'react-redux'
import Counter from '../components/counter'

export default connect(
  state => ({count: state}),
  {increment, decrement}
)(Counter)