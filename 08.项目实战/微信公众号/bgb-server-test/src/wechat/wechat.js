/* 获取access_token: 微信调用接口全局唯一凭证（时效2h） */
// https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
/* 整体思路：
读取本地文件readAccessToken（保存到全局容易被篡改）
  - 本地有
    - 判断是否过期isValidAccessToken
     过期：重新获取getAccessToken，保存覆盖之前文件saveAccessToken
     未过期：直接使用
  - 本地没有
    - 发送请求获取，保存到本地文件，使用
*/
const rp = require('request-promise-native')
const {createReadStream, createWriteStream} = require('fs')
const {resolve, join} = require('path')
const request = require('request')

const menu = require('./menu')
const api = require('../utils/api')
const {writeFileAsync, readFileAsync} = require('../utils/tool')
const {appID, appsecret} = require('../config')

class Wechat {
  constructor() {

  }

  // 1.获取access_token
  getAccessToken() {
    const url = `${api.accessToken}&appid=${appID}&secret=${appsecret}`
  
    return new Promise((resolve, reject) => {
      // 发送请求（request request-promise-native，后者依赖前者）
      rp({
        method: 'GET',
        url,
        json: true
      }).then(res => {
        console.log(res)
        // 设置过期时间
        res.expires_in = Date.now() + (res.expires_in - 5 * 60) * 1000

        resolve(res)
      }).catch(err => {
        console.log(err)

        reject('getAccessToken()请求失败' + err)
      })
    })
    
  }

  /** 
   * 保存access_token 
   * @param accessToken 要保存的凭据
   */
  saveAccessToken(accessToken) {
    return writeFileAsync(accessToken, 'access_token.txt')
  }

  /** 
   * 读取access_token 
   */
  readAccessToken() {
    return readFileAsync('access_token.txt')
  }

  /**
   * 检查access_token是否有效
   * @param accessToken
   */
  isValidAccessToken(data) {
    // 检测参入参数是否有效
    if (!data && !data.access_token && !data.expires_in) {
      return false
    }
    // 检测access_token是否在有效期内
    // if (data.expires_in < Date.now()) {
    //   // 
    // }
    return data.expires_in > Date.now()
  }

  /**
   * 获取没有过期的access_token
   * @return {Promise<any>}
   */
  fetchAccessToken() {
    // 之前保存过且有效，直接使用(小优化)
    if (this.access_token && this.expires_in && this.isValidAccessToken(this)) {
      return Promise.resolve({
        access_token: this.access_token,
        expires_in: this.expires_in
      })
    }

    // fetchAccessToken()返回值
    return this.readAccessToken()
        .then(async result => {
          if (this.isValidAccessToken(result)) {
            // 有效
            // resolve(result)
            // 方便最后的.then操作
            return Promise.resolve(result)
          } else {
            // 过期
            const result = await this.getAccessToken()
            await this.saveAccessToken(result)

            return Promise.resolve(result)
          }
        })
        .catch(async err => {
          const result = await this.getAccessToken()
          await this.saveAccessToken(result)
          return Promise.resolve(result)
        })
      .then((result) => {
        // 将access_token挂载到this上（箭头函数没有this，一层层向上找，都是实例对象）
        this.access_token = result.access_token
        this.expires_in = result.expires_in

        // 返回result包装了一层promise对象（此对象为成功的状态）
        // this.readAccessToken()最终返回值
        return Promise.resolve(result)
      })
  }

  // 2.获取jsapi_ticket临时票据
  getJsapiTicket() {
    return new Promise(async (resolve, reject) => {
      const data = await this.fetchAccessToken()
      const url = `${api.ticket}&access_token=${data.access_token}`
      // console.log("Wechat -> getJsapiTicket -> url", url)
      
      rp({
        method: 'GET',
        url,
        json: true
      }).then(res => {
        resolve({
          ticket: res.ticket,
          expires_in: Date.now() + (res.expires_in - 5 * 60) * 1000
        })
      }).catch(err => {
        reject('getJsapiTicket()请求失败' + err)
      })
    })
  }

  saveTicket(ticket) {
    // 保存到相对路径，wechat调用的相对路径
    return writeFileAsync(ticket, 'ticket.txt')
  }

  readTicket() {
    return readFileAsync('ticket.txt')
  }

  isValidTicket(data) {
    // 检测参入参数是否有效
    if (!data && !data.ticket && !data.expires_in) {
      return false
    }
    return data.expires_in > Date.now()
  }

  fetchTicket() {
    if (this.ticket && this.ticket_expires_in && this.isValidTicket(this)) {
      return Promise.resolve({
        ticket: this.ticket,
        expires_in: this.expires_in
      })
    }

    return this.readTicket()
        .then(async result => {
          if (this.isValidTicket(result)) {
            return Promise.resolve(result)
          } else {
            const result = await this.getJsapiTicket()
            console.log("Wechat -> fetchTicket -> result", result)
            await this.saveTicket(result)

            return Promise.resolve(result)
          }
        })
        .catch(async err => {
          const result = await this.getJsapiTicket()
          await this.saveTicket(result)
          return Promise.resolve(result)
        })
      .then((result) => {
        this.ticket = result.ticket
        this.ticket_expires_in = result.expires_in

        return Promise.resolve(result)
      })
  }
  

  // 3.创建菜单
  createMenu(menu) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.fetchAccessToken()
        // console.log("Wechat -> createMenu -> data", data)
        const url = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${data.access_token}`
        // await解决异常: try...catch
        const result = await rp({
          method: 'POST',
          url,
          json: true,
          body: menu
        })
        resolve(result)
        console.log("Wechat -> createMenu -> result", result)
      } catch (err) {
        reject('createMenu()创建菜单失败' + err)
      }
    })
  }
  // 删除菜单（创建之前，先删除之前的）
  deleteMenu() {
    return new Promise(async (resolve, reject) => {
      const data = await this.readAccessToken()
      const url = `https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=${data.access_token}`
      const result = await rp({
        method: 'GET',
        url,
        json: true
      })
      resolve(result)
    })
  }

  // 4.上传临时素材
  uploadTemporaryMaterial(type, filename) {
    // 获取文件的绝对路径。定义在外部，里面Promise中resolve有冲突
    const filePath = resolve(__dirname, '../media', filename)

    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.fetchAccessToken()
        // 定义请求地址
        const url = `${api.temporary.upload}access_token=${data.access_token}&type=${type}`
  
        const formData = {
          // ..直接回退不了。rp文档为file: {xxx}, 不生效
          media: createReadStream(filePath)
        }
  
        // 以form表单方式发送请求
        const result = await rp({method: 'POST', url, json: true, formData})
  
        resolve(result)
      } catch (error) {
        reject("uploadTemporaryMaterial()上传临时素材失败" + error)
      }
    })
  }

  // 获取临时素材
  getTemporaryMaterial(type, mediaId, filename) {
    const filePath = resolve(__dirname, '../media', filename)

    return new Promise(async (resolve, reject) => {
      const data = await this.fetchAccessToken()
      let url = `${api.temporary.get}access_token=${data.access_token}&media_id=${mediaId}`

      // 判断是否是视频文件
      if (type === 'video') {
        // 视频文件只支持http协议
        url = url.replace('https://', 'http://')
        const data = await rp({method: 'GET', url, json: true})
        resolve(data)
      } else {
        // 获取流数据，需要用request
        request(url)
          .pipe(createWriteStream(filePath))
          .once('close', resolve) // 文件读取完毕，可读流自动关闭触发close事件，调取resolve通知外部
      }
    })
  }

  // 5.上传永久素材
  uploadPermanentMaterial(type, material, body) {
    return new Promise(async (resolve, reject) => {
      const data = await this.fetchAccessToken()
      // 请求的配置对象
      let options = {
        method: 'POST',
        json: true
      }

      if (type === 'news') {
        // 上传图文消息
        options.url = `${api.permanent.uploadNews}access_token=${data.access_token}`
        options.body = material
      } else if (type === 'pic') {
        // 上传图文消息中的图片
        options.url = `${api.permanent.uploadImg}access_token=${data.access_token}`
        options.formData = {
          media: createReadStream(join(__dirname, '../medis', material))
        }
      } else {
        // 上传其他媒体类型素材
        options.url = `${api.permanent.uploadOthers}access_token=${data.access_token}`
        options.formData = {
          media: createReadStream(join(__dirname, '../medis', material))
        }
        // 视频素材，需要多提交一个表单
        if (type === 'video') {
          options.body = body
        }
      }

      const result = await rp(options)
      resolve(result)
    })
  }

  // 获取永久素材
  getPermanentMaterial(type, mediaId, filename) {
    return new Promise(async (resolve, reject) => {
      const data = await this.fetchAccessToken()
      const url = `${api.permanent.get}access_token=${data.access_token}`
      const options = {method: 'POST', url, json: true, body: {media_id: mediaId}}

      if (type === 'video' || 'news') {
        const data = await rp(options)
        resolve(data)
      } else {
        request(options)
          .pipe(createWriteStream(join(__dirname, '../media', filename)))
          .once('close', resolve)
      }
    })
  }

  // 上传素材（优化）
  uploadMaterial() {

  }

}

// 测试
/* const w = new Wechat()

new Promise((resolve, reject) => {
  w.readAccessToken()
  .then(result => {
    // 本地有文件，判断是否过期
    if (w.isValidAccessToken(result)) {
      // 有效
      resolve(result)
    } else {
      // 过期
      w.getAccessToken()
      .then(result => {
        w.saveAccessToken(result)
          .then(() => {
            resolve(result)
          })
      })
    }
  })
  .catch(err => {
    w.getAccessToken()
      .then(result => {
        w.saveAccessToken(result)
          .then(() => {
            // 通过promise将access_token返回出去
            resolve(result)
          })
      })
  })
})
  .then((result) => {
    console.log(result)
  })
 */


(async () => {
  const w = new Wechat()
  // 菜单测试
  let result = await w.deleteMenu()
  console.log("result", result)
  result = await w.createMenu(menu)
  console.log("result2", result)
  // js-sdk票据测试
  // const data = await w.fetchTicket()
  // console.log(data)
})()

module.exports = Wechat