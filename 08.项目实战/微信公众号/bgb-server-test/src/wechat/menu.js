/* 自定义菜单 */
const {url} = require('../config')

module.exports = {
  "button": [
    {
      "type": "view",
      "name": "8部半🎞️",
      "url": `${url}/movie`
    },
    {
      "type": "view",
      "name": "语音识别",
      "url": `${url}/search`
    },
    {
      "name": "更多",
      "sub_button": [{
          "type": "view",
          "name": "官网🦕",
          "url": "http://www.baidu.com"
        },
        {
          "type": "click",
          "name": "帮助💡",
          "key": "help"
        }
      ]
    }
  ]
}