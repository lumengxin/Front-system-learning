const mongoose = require('mongoose')

const trailersSchema = mongoose.Schema({
  title: String,
  rating: String,
  href: String,
  image: String,
  doubanId: {type: Number, unique: true},
  genre: [String],
  summary: String,
  releaseDate: String,
  trailerHref: String,
  cover: String,
  ratingNum: Number,
  infos: Array,
  directors: String,
  casts: String,
  runtime: String,
  attr: String,
  posterKey: String,     // 海报图片上传到七牛中，返回的key值
  coverKey: String,      // 视频的封面图
  videoKey: String,      // 视频
  createTime: {
    type: Date,
    default: Date.now()
  }
})

const Trailers = mongoose.model('trailer', trailersSchema)

module.exports = Trailers