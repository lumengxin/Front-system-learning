import React from 'react'

const allMessages = [
  {id: 1, title: 't1', content: '锄禾日当午'},
  {id: 2, title: 't2', content: '汗滴禾下土'},
  {id: 3, title: 't3', content: '粒粒皆辛苦'}
]

export default function MessageDetail(props) {
  // props中id为string
  const {id} = props.match.params
  // debugger
  const message = allMessages.find(m => m.id === id*1)

  return(
    <ul>
      <li>ID: {message.id}</li>
      <li>TITLE: {message.title}</li>
      <li>CONTENT: {message.content}</li>
    </ul>
  )
}