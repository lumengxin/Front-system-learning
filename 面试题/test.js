const nums = [2, 4, 7, 12]
console.log(filterArr(nums))

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
