import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

/* // redux：与react组件的代码耦合度太高
import App from './components/App'
// import {createStore} from 'redux'
// import {counter} from './redux/reducers'
import store from './redux/store'

// 生成一个store对象
// 内部调用一次reduer函数得到初始state
// const store = createStore(counter)
// console.log(store, store.getState())

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <App store={store} />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// 初始化渲染
render()

// 订阅监听(store中状态变化后，自动调用进行重绘)
store.subscribe(render)
 */
// react-redux：简化react应用中使用redux
import App2 from './components/App2'
// import App2 from './containers/app2'
import {Provider} from 'react-redux'
import store from './redux2/store'

ReactDOM.render(
  (
    <Provider store={store}>
      <App2 />
    </Provider>
  ),
  document.getElementById('root')
)


serviceWorker.unregister();
