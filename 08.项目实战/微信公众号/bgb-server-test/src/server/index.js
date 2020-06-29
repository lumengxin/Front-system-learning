const theatersCraw = require('./crawler/theatersCraw')
const trailersCraw = require('./crawler/trailersCraw')
const db = require('../db')
const saveTheaters = require('./save/saveTheaters')
const saveTrailers = require('./save/saveTrailers')
const uploadToQiniu = require('./qiniu')

const Theaters = require('../model/Theaters')
const Trailers = require('../model/Trailers')

;(async () => {
  // 连接数据库
  await db
  // 爬取数据
  // const data = await theatersCraw()
  // const trailers = await trailersCraw()
  // 保存到数据库
  // await saveTheaters(data)
  // await saveTrailers(trailers)
  // 上传图片到七牛
  // await uploadToQiniu()
  // await uploadToQiniu('posterKey', Theaters)

  await uploadToQiniu('posterKey', Trailers)
  await uploadToQiniu('coverKey', Trailers)
  await uploadToQiniu('videoKey', Trailers)
})()
