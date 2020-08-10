```
function func1(num) {
  return 3 * (num + 1)
}

function func2(num) {
  return 2 * (num + 3)
}

function fun3(num) {
  return 2 * (num + 1)
}

function fun4(num) {
  return 6
}
```



```
class Storage {
  constructor(name) {
    this.name = 'storege'
  }

  // 设置缓存
  setItem(params) {
    let obj = {
      name: '',
      value: '',
      expires: '',
      // 记录何时将值存入缓存
      startTime: new Date().getTime()
    }
    let options = {}
    // 将obj和传进来的params合并
    Object.assign(options, obj, params)
    if (options.expires) {
      localStorage.setItem(options.name, JSON.stringify(options))
    } else {
      // 如果options.expires没有设置，判断一下value的类型
      let type = Object.prototype.toString.call(options.value)
      // value为数组或对象时，json序列化再存
      if (Object.prototype.toString.call(options.value) == '[object Object]') {
        options.value = JSON.stringify(options.value)
      }
      if (Object.prototype.toString.call(options.value) == '[object Array]') {
        options.value = JSON.stringify(options.value)
      }
      localStorage.setItem(options.name, options.value)
    }
  }

  // 获取缓存
  getItem(name) {
    let item = localStorage.getItem(name)
    // 尝试将json转化为对象
    try {
      item = JSON.parse(item)
    } catch(error) {
      item = item
    }
    // debugger
    if (item !== null && item.startTime) {
      let date = new Date().getTime()
      if (date - item.startTime > item.expires) {
        // 缓存过期
        localStorage.removeItem(name)
        return false
      } else {
        return item.value
      }
    } else {
      // 没有设置缓存时间，直接返回值
      return item
    }
  }

  // 移出缓存
  removeItem(name) {
    localStorage.removeItem(name)
  }

  // 移出全部缓存
  clear() {
    localStorage.clear()
  }
}
```

** 修复后 **
```
const nums = [1, 4, 7, 12]
console.log(filterArr(nums))

function filterArr(nums) {
  let newArr = []

  if (nums.length <= 1) {
    return
  }

  nums.forEach((n, i) => {
    let temp = nums.slice(0)
    temp.splice(i, 1)

    newArr[i] = temp.reduce((acc, curr) => acc * curr)
  })

  return newArr
}
```

** 网上比较好的实现 **
```
function filterArr(nums) {
  const ret = []

  for (let i = 0, temp = 1; i < nums.length; i++) {
    ret[i] = temp
    temp *= nums[i]
  }
  
  for (let i = nums.length - 1, temp = 1; i >= 0; i--) {
    ret[i] *= temp
    temp *= nums[i]
  }
  return ret
}
```
