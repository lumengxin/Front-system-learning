## 1、将下述的函数抽离出通用函数
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

## 2、自己动手写一个localStorage
```
localStorage.setItem('token', 123)

let token = localStorage.getItem('token')
```

## 算法：
```
function filterArr(nums) {
  let newArr = []

  if (nums.length <= 1) {
    return
  }
  nums.forEach((n, i) => {
    let temp = nums.splice(i, 1)
    newArr[i] = temp.forEach(item => item *= item) 
  })

  return newArr
}
```