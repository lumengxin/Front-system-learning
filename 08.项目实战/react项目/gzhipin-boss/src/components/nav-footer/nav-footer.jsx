import React, { Component } from 'react'
import {TabBar} from 'antd-mobile'
import PropTypes from 'prop-types'
// 非路由组件中使用路由组件api
import {withRouter} from 'react-router-dom'

const Item = TabBar.Item

class NavFooter extends Component {
  static propTypes = {
    navList: PropTypes.array.isRequired,
    unReadCount: PropTypes.number,
  }

  render() {
    // debugger
    let {navList, unReadCount} = this.props
    navList = navList.filter(nav => !nav.hide)

    const path = this.props.location.pathname  // 路由组件才有location
    return(
      <div>
        <TabBar>
          {
            navList.map(nav => (
              <Item key={nav.path} 
                title={nav.text}
                icon={{uri: require(`./images/${nav.icon}.png`)}}
                selectedIcon={{uri: require(`./images/${nav.icon}-selected.png`)}}
                selected={path === nav.path}
                onPress={() => this.props.history.push(nav.path)}
                badge={nav.path === '/message' ? unReadCount : 0}
              />
            ))
          }
        </TabBar>
      </div>
    )
  }
}

export default withRouter(NavFooter)