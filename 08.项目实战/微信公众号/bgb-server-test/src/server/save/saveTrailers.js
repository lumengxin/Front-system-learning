const Trailers = require('../../model/Trailers')

module.exports = async data => {

  for (let i = 0; i < data.length; i++) {
    let item = data[i]

    const result = await Trailers.create(item)
    
    console.log('Trailers数据保存成功', result)

  }

}