const mongoose = require('mongoose')

const danmusSchema = mongoose.Schema({
  // id标识是哪个电影
  doubanId: String,
  author: String,
  time: Number,
  text: String,
  color: String,
  type: Number
})

const Danmus = mongoose.model('danmu', danmusSchema)

module.exports = Danmus