/* 将数据库中的图片上传到七牛云服务器 */
const nanoid = require('nanoid')
const upload = require('./upload')
// const Theaters = require('../../model/Theaters')

module.exports = async (key, Model) => {
  // 通过posterKey判断是否存在，避免重复上传。找到所有没有上传图片的文档对象
  const movies = await Model.find({$or: [
    {[key]: ''},
    {[key]: null},
    {[key]: {$exists: true}}
  ]})
  console.log("movies", movies.length)

  for (let i = 0; i < movies.length; i++) {
    let movie = movies[i]

    /* 
    let url = movie.image
    // es模块使用nanoid3.x会报错，改为2.x
    let key = `${nanoid(10)}.jpg` 

    await upload(url, key)
    // key保存到数据库
    movie.posterKey = key
    */

    let url = movie.image
    let filename = '.jpg'
    if (key === 'coverKey') {
      url = movie.cover
    } else if (key === 'videoKey') {
      url = movie.attr
      filename = '.mp4'
    }

    filename = `${nanoid(10)}${filename}`
    await upload(url, filename)
    movie[key] = filename
    
    await movie.save()
  }

}