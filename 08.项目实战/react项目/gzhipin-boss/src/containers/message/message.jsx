/* 消息界面路由容器组件 */
import React, { Component } from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief

function _getLastMsgs(chatMsgs, userid) {
  // 1.找出每个聊天的lastMsg，用一个对象保存{chat_id: lastMsg}
  const lastMsgObj = {}
  chatMsgs.forEach(msg => {

    /* 获取未读消息数量 */
    // a.对msg进行个体统计(别人发给你，且read标识为未读)
    if (msg.to === userid && !msg.read) {
      msg.unReadCount = 1
    } else {
      msg.unReadCount = 0
    }

    const chatId = msg.chat_id
    // 尝试获取已保存当前组的lastMsg
    const lastMsg = lastMsgObj[chatId]
    if (!lastMsg) {
      lastMsgObj[chatId] = msg
    } else {
      
      // b.累加unReadCount = 已统计的 + 当前msg的
      const unReadCount = lastMsg.unReadCount + msg.unReadCount

      // 如果msg比lastMsg晚，就将msg保存为lastMsg
      if (msg.create_time > lastMsg.create_time) {
        lastMsgObj[chatId] = msg
      }

      // c.将unReadCount保存在最新的lastMsg上
      lastMsgObj[chatId].unReadCount = unReadCount
    }
  })
  // 2.转化成lastMsg数组
  const lastMsgs = Object.values(lastMsgObj)
  // 3.排序，按时间
  lastMsgs.sort(function(m1, m2) {
    // 结果<0, m1放前面
    return m2.create_time - m1.create_time
  })

  console.log("function_getLastMsgs -> lastMsgs", lastMsgs)
  return lastMsgs
}

class Message extends Component {
 
  render() {
    const {user} = this.props
    const {users, chatMsgs} = this.props.chat
    // 对chatMsg按chat_id进行分组，取出每组最后一条
    const lastMsgs = _getLastMsgs(chatMsgs, user._id)

    return(
      <List style={{marginTop: 50, marginBottom: 50}}>
        {
          lastMsgs.map(msg => {
            // 目标用户id
            const targetUserId = msg.to === user._id ? msg.from : msg.to
            // 目标用户信息
            const targetUser = users[targetUserId]
            return (
              <Item extra={<Badge text={msg.unReadCount} />}
                thumb={targetUser.header ? require(`../../assets/images/${targetUser.header}.png`) : null}
                arrow='horizontal'
                key={msg.chat_id}
                onClick={() => this.props.history.push(`/chat/${targetUserId}`)}
              >
                {msg.content}
                <Brief>{targetUser.username}</Brief>
              </Item>
            )
          })
        }
      </List>
    )
  }
}

export default connect(
  state => ({user: state.user, chat: state.chat}),
  {}
)(Message)