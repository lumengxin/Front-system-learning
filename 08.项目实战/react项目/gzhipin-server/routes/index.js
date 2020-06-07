var express = require('express');
var router = express.Router();

const md5 = require('blueimp-md5')

// const UserModel = require('../db/models').UserModel
const {UserModel} = require('../db/models')

// 查询时过滤出指定的属性
const filter = {password: 0, __v: 0}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// test
/* router.post('/register', function(req, res) {
  const {username, password} = req.body
  if (username === 'admin') {
    res.send({code: 1, msg: '用户已存在~~~'})
  } else {
    res.send({code: 0, data: {id: 'dfi23', username, password}})
  }
}) */

// 1.注册的路由
router.post('/register', function(req, res, next) {
  // 1.读取请求参数
  const {username, password, type} =  req.body
  // 2.处理
  // 判断用户是否存在。存在，返回提示错误信息；不存在，保存
  // 查询（根据username）,使用UserModel
  UserModel.findOne({username}, function(err, user) {
    // user有值(存在),返回提示
    if (user) {
      res.send({
        code: 1,
        msg: '用户已存在'
      })
    } else {
      // 不存在，保存。返回包含user的json数据（排除password）
      // 对密码进行md5加密，不要明文直接存入
      new UserModel({username, password: md5(password), type}).save(function(error, user) {
        // 生成cookie,交给浏览器保存
        res.cookie('userid', user._id, {maxAge: 1000*60*30})

        const data = {username, type, _id: user._id}
        res.send({
          code: 0,
          data
        })
      })
    }
  })
  // 3.返回响应数据
})

// 2.登录的路由
router.post('/login', function(req, res) {
  const {username, password} = req.body
  // 根据username和password查询用户
  UserModel.findOne({username, password: md5(password)}, filter, function (err, user) {
    if (user) {
      res.cookie('userid', user._id, {maxAge: 1000*60*30})
      res.send({
        code: 0,
        data: user
      })
    } else {
      res.send({
        code: 1,
        msg: '用户名或密码不正确'
      })
    }
  })
})

// 3.更新用户信息的路由
router.post('/update', function (req, res) {
  // 从请求携带的cookies中获取用户_id
  const userid = req.cookies.userid
  // 不存在（过期或者被用户删掉），返回提示信息
  if (!userid) {
    return res.send({
      code: 1, 
      msg: '请先登录'
    })
    // return | else {...}
  }
  // 得到提交的用户信息,更新对应user
  const user = req.body
  UserModel.findByIdAndUpdate({_id: userid}, user, function(err, oldUser) {
    // 如果没有查到
    if (!oldUser) {
      // 通知浏览器删除cookie
      res.clearCookie('userid')
      res.send({
        code: 1, 
        msg: '请先登录'
      })
    } else {
      // 合并用户信息
      const {_id, username, type} = oldUser
      const data = Object.assign(user, {_id, username, type})
      
      res.send({
        code: 0, 
        data
      })
    }
  })
})

// 4.获取用户信息的路由
router.get('/user', function(req, res) {
  const userid = req.cookies.userid
  if (!userid) {
    res.send({
      code: 1,
      msg: '请先登录'
    })
    return
  }
  UserModel.findOne({_id: userid}, filter, function(err, user) {
    res.send({
      code: 0,
      data: user
    })
  })
})

// 5.获取用户列表(根据类型)
router.get('/userlist', function (req, res) {
  const {type} = req.query
  UserModel.find({type}, filter, function (err, users) {
    res.send({
      code: 0,
      data: users
    })
  })
})

module.exports = router;
