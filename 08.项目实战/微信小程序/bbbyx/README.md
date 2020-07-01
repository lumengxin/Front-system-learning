## 适配方案
  1. viewport适配 width = device-width
  2. 单位：rpx
  3. iphone6: 1rpx = .5px = 1物理像素
     dpr = 物理像素 / 设备独立像素 （= 2 人眼极限）
  
## 重要文件
  1. wxml view结构 =》html
  2. wxss view样式 =》css
  3. js   view行为 =》js
  4. json 数据 && 配置

## 注册小程序： App()

## 注册页面 Page() / Component()

## 数据绑定
  1. 在data中初始化页面需要的数据，页面中{{}}使用

## 事件
  1. 冒泡事件：bind + 事件名
  2. 非冒泡事件：catch + 事件名

## 模板
  1. 定义：template属性：name 标识模板
  2. 使用：template属性：is 模板的name
  3. 引入模板结构：<import src="/.." />
  4. 引入模板样式：@import '/..'
  5. 传参：data="{{...item}}"

## 列表渲染
  1. wx:for
  2. wx:key 为每个个体元素进行标记
  3. 遍历的个体：itme
  4. 遍历的索引：index

## 条件渲染
  1. wx:if
  2. wx:if - wx:elif - wx:else
  3. wx:hidden

## 本地存储
  1. setStorage, setStorageSync(同步); getStorage, getStorageSync
  2. '文章收藏状态'：
    - 缓存之前先获取本地缓存数据；新数据在原来基础上进行
    - 页面加载onLond中获取到本地缓存数据，动态修改当前也文章收藏状态
    - 初次使用时，需要初始化一个空对象

## 音频播放(背景)
  1. playBackgroundAudio, pauseBackgroundAudio。控制音乐播放暂停
  2. onBackgroundAudioPlay, onBackgroundAudioPause。监听播放状态
  3. 当前页面播放状态与播放器状态同步问题；进入页面时，该页面播放状态更新问题

