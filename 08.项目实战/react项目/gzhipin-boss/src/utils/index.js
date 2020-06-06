/* 工具函数 */

// 认证成功需要跳转的页面路径。/dashen /laoban /dasheninfo /laobaninfo。
export function getRedirectTo(type, header) {
  let path = ''
  if (type === 'laoban') {
    path = '/laoban'
  } else {
    path = 'dashen'
  }
  // 没有头像信息(说明没有填写过用户详情)，返回用户详情
  if (!header) {
    path += 'info'
  }

  return path
}