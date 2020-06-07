/* 选择用户头像的ui组件 */
import React, { Component } from 'react'
import {List, Grid} from 'antd-mobile'
import PropTypes from 'prop-types'

export default class HeaderSelector extends Component {
  static propTypes = {
    setHeader: PropTypes.func.isRequired
  }

  state = {
    // 默认选择图像为空
    icon: null
  }

  constructor(props) {
    super(props)

    this.headerList = []
    for (let i = 0; i < 20; i++) {
      this.headerList.push({
        text: '头像' + (i + 1),
        icon: require(`../../assets/images/头像${i+1}.png`)
      })
    }
  }

  handleClick = ({text, icon}) => {
    // 更新icon
    this.setState({
      icon
    })
    // 更新父组件状态
    this.props.setHeader(text)
  }

  render() {
    // const listHeader = '请选择头像'
    const {icon} = this.state
    const listHeader = !icon ? '请选择头像' : (
      <div>
        选择的头像是：<img src={icon} />
      </div>
    )
    return(
      <List renderHeader={() => listHeader}>
        <Grid data={this.headerList} columnNum={5} onClick={this.handleClick}>

        </Grid>
      </List>
    )
  }
}