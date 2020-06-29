const qiniu = require('qiniu')

// 1.定义鉴权对象mac
var accessKey = 'x8uVwYmvlVGcjjxUOJpE5UOY-r9XBWi0Xn5ahcXQ';
var secretKey = 'ChHL3C_Y0Rl5lkzm2_QpqkuQcALPtLmsE5ZssEV3';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

// 2.资源管理，首先构建 bucketManager对象
// 定义配置对象
var config = new qiniu.conf.Config();
// 存储区域 华南：z2
config.zone = qiniu.zone.Zone_z2;
var bucketManager = new qiniu.rs.BucketManager(mac, config);

const bucket = 'bbbdy-movie'

module.exports = (resUrl, key) => {
  // 3.抓取网络资源到空间
  // 参数：网络资源地址；存储空间名称；重命名网络资源名称
  return new Promise((resolve, reject) => {
    bucketManager.fetch(resUrl, bucket, key, function(err, respBody, respInfo) {
      if (err) {
        console.log(err);
        reject('七牛上传失败' + err)
      } else {
        if (respInfo.statusCode == 200) {
          console.log('文件上传成功' + respBody.key)
          resolve()
        } else {
          console.log(respBody);
        }
      }
    })
  })

  
}