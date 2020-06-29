/* 工具函数包 */
const {parseString} = require('xml2js')
const {writeFile, readFile} = require('fs')
const {resolve} = require('path')

module.exports = {
  
  getUserDataAsync(req) {
    return new Promise((resolve, reject) => {
      let xmlData = ''
      req.on('data', data => {
        // 读取到的buffer数据，转化成字符串
        xmlData += data.toString()
      })
      .on('end', () => {
        resolve(xmlData)
      })

    })
  },

  parseXMLAsync(xmlData) {
    return new Promise((resolve, reject) => {
      parseString(xmlData, {trim: true}, (err, data) => {
        if (!err) {
          resolve(data)
        } else {
          reject('parseXMLAsync()解析错误' + err)
        }
      })
    })
  },

  formatMessage(jsData) {
    let message = {}

    jsData = jsData.xml
    if (typeof jsData === 'object') {
      for (let key in jsData) {
        let value = jsData[key]
        // 过滤空的数据
        if (Array.isArray(value) && value.length > 0) {
          // 将合法的数据赋值到message对象上
          message[key] = value[0]
        }
      }
    }

    return message
  },

  writeFileAsync(data, fileName) {
    data = JSON.stringify(data)
    const filePath = resolve(__dirname, fileName)
    return new Promise((resolve, reject) => {
      writeFile(filePath, data, err => {
        if (!err) {
          console.log('文件保存成功.')
          resolve()
        } else {
          reject('保存失败' + err)
        }
      })
    })
  }, 

  readFileAsync(fileName) {
    const filePath = resolve(__dirname, fileName)

    return new Promise((resolve, reject) => {
      readFile(filePath, (err, data) => {
        if (!err) {
          console.log('文件读取成功.')
          data = JSON.parse(data)
          resolve(data)
        } else {
          reject('读取失败' + err)
        }
      })
    })
  }
}