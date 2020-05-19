import {increment, decrement, incrementAsync} from '../redux/actions'
import {connect} from 'react-redux'
import Counter from '../components/counter'

export default connect(
  state => ({count: state}),
  {increment, decrement, incrementAsync}
)(Counter)