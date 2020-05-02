define(function() {
  let msg = 'amd规范中的msg'

  function getMsg() {
    return msg.toUpperCase()
  }

  return { getMsg }
})