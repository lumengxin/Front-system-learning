import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'

import Register from './containers/register/register'
import Login from './containers/login/login'
import Main from './containers/main/main'
import store from './redux/store'

// 测试sockio
// import './socket/sockeio-client.js'

// import {Button} from 'antd-mobile'
// import 'antd-mobile/dist/antd-mobile.css'
import './assets/css/index.less'

ReactDOM.render(
  // <Button>BUTTON</Button>,
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path='/register' component={Register}></Route>
        <Route path='/login' component={Login}></Route>
        {/* 默认组件，配置不到上面时使用 */}
        <Route component={Main}></Route>
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
)