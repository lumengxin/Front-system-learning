/* redux模块：对象
1. createSotre(reducer):接收一个reducer函数，返回一个store对象
2. combineReducers(reducers)：接收一个包含多个reducer函数的对象，返回一个新的reducer函数
3. store对象
  getState(): 得到内部管理的state对象
  dispatch(action): 分发action,会触发reducer调用，返回一个新的state，调用所有绑定的listener
  subscribe(listener): 订阅一个state的监视器
*/

export function createStore(reducer) {
  // 内部state
  let state
  // 内部保存N个listener的数组
  const listeners = []

  // 第一次调用reducer得到初始状态并保存
  state = reducer(state, {type: '@mini-redux'})

  // 得到内部管理的state对象
  function getState() {
    return state
  }

  // 分发action
  function dispatch(action) {
    // 调用reducer，得到一个新的state，保存
    state = reducer(state, action)
    // 调用listeners中所有的监视回调函数
    listeners.forEach(listener => listener())
  }

  // 订阅一个state的监听器
  function subscribe(listener) {
    listeners.push(listener)
  }


  return {getState, dispatch, subscribe}
}

export function combineReducers(reducers) {

  return function(state={}, action) { // 这个函数会传给createStore()
    // 依次所有调用reducer函数，得到n个新的子状态，封装成对象并返回
    // 准备一个用来保存所有新状态的容器对象
    const newState = {}
    // 包含所有reducer函数名的数组['count', 'msgs']
    const keys = Object.keys(reducers)
    keys.forEach(key => {
      const childReducer = reducers[key]
      const childState = state[key]
      
      const newChildState = childReducer(childState, action)
      newState[key] = newChildState
    })
    return newState
  }
}

export function combineReducers2(reducers) {

  return function(state={}, action) { 
    
    return Object.keys(reducers).reduce((newState, reducerName) => {
      
      newState[reducerName] = reducers[reducerName](state[reducerName], action)

      return newState

    }, {})
  }
}

/* createStore(combineReducers({
  count,
  msgs
})) */