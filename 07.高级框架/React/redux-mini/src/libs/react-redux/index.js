import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Provider组件类 为所有的容器子组件提供store(context)
export class Provider extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }

  // 声明向子组件提供哪些context数据
  static childContextTypes = {
    store: PropTypes.object.isRequired
  }

  // 为子组件提供包含store的context
  getChildContext() {
    // 返回context对象
    return {store: this.props.store}
  }

  render() {
    // 将所有子标签返回
    /* 没有子标签：undefinded; 一个：对象; 多个：数组 */
    console.log('provider render() -> ', this.props.children)
    return this.props.children
  }
}

// connect函数 export dafult connect((state) => {}, {})(xxx)
// mapStateToProps: 函数，用来确定一般属性
// mapDispatchToProps: 对象，用来确定函数(内部会使用dispatch方法)属性
export function connect(mapStateToProps, mapDispatchToProps) {

  // 返回一个函数（接收一个组件）
  return (WrapComponent) => {

    // 返回一个容器组件
    return class ConnectComponent extends Component {
      // 声明获取context数据【s】
      static contextTypes = {
        store: PropTypes.object.isRequired
      }

      constructor(props, context) {
        super(props, context)

        // 得到store
        const store = context.store

        // 一般属性对象
        const stateProps = mapStateToProps(store.getState())
        // 函数属性对象
        const dispatchProps = this.bindActionCreators(mapDispatchToProps)

        // 将所有的一般属性保存到state中
        this.state = {...stateProps}

        // 将所有的函数属性的对象保存到组件对象中
        this.dispatchProps = dispatchProps

      }

      // 根据mapDispatchToProps返回一个包含分发action的函数的对象
      bindActionCreators = (mapDispatchToProps) => {
        const keys = Object.keys(mapDispatchToProps)
        return keys.reduce((preDispatchProps, key) => {
          // 添加一个包含dispatch语句的方法
          preDispatchProps[key] = (...args) => { // 透传：将函数接收到的参数，原样传给内部函数调用
            // 分发action
            this.context.store.dispatch(mapDispatchToProps[key](...args))
          }
          
          return preDispatchProps
        }, {})
      }

      // 订阅监听
      componentDidMount() {
        const store = this.context.store

        this.context.store.subscribe(() => {
          // redux中产生了一个新state 更新当前组件的状态
          this.setState(mapStateToProps(store.getState()))
        })
      }

      render() {

        return <WrapComponent {...this.state} {...this.dispatchProps} />
      }
    }
  }
}