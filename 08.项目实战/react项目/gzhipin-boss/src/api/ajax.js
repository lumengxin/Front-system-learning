/* 能发ajax请求的模块，返回promise对象 */
import axios from 'axios'

// url: 请求路径； data: 请求参数对象；type: 请求方式，默认get
export default function ajax(url, data={}, type='GET') {
    if (type === 'GET') {
        // get请求将data对象拼接成字符串
        // data: {username: tom, password: 123} -> paramStr: username=tom&passwrod=123
        let paramStr = ''
        Object.keys(data).forEach(key => {
            paramStr += key + '=' + data[key] + '&'
        })
        // 存在，则说明拼过串。去掉最后一个多余的‘&’
        if (paramStr) {
            paramStr = paramStr.substring(0, paramStr.length - 1)
        }
        return axios.get(url + '?' + paramStr)
    } else {
        return axios.post(url, data)
    }
}