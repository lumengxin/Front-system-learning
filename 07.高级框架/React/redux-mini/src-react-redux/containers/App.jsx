import React from 'react'
import {connect} from 'react-redux'

import Counter from '../components/Counter'
import {increment, decrement, addMsg} from '../redux/actions'

export default connect(
  state => ({count: state.count, msgs: state.msgs}),
  {increment, decrement, addMsg}
)(Counter)