function move(obj, attr, target, speed, callback) {
    clearInterval(obj.timer)
    var current = parseInt(getStyle(obj, attr))
    if (current > target) {
        speed = -speed
    }
    obj.timer = setInterval(function () {
        var oldValue = parseInt(getStyle(obj, attr))
        var newValue = oldValue + speed
        if (speed < 0 && newValue < target || speed > 0 && newValue > target) {
            newValue = target
        }
        obj.style[attr] = newValue + "px"
        if (newValue == target) {
            clearInterval(obj.timer)
            callback && callback()
        }
    }, 30)
}

function getStyle(obj, name) {
    if (window.getComputedStyle) {
        return getComputedStyle(obj, null)[name];
    } else {
        return obj.currentStyle[name];
    }
}

function addClass(obj, cN) {
    if (!hasClass(obj, cN))
        obj.className += " " + cN
}
function hasClass(obj, cN) {
    // var reg = /\bb2\b/
    var reg = new RegExp("\\b"+cN+"\\b")
    return  reg.test(obj.className)
}
function removeClass(obj, cN) {
    var reg = new RegExp("\\b"+cN+"\\b") 
    obj.className = obj.className.replace(reg, "")
}
// 切换类，有就删除，没有则添加
function toggleClass(obj, cN) {
    if (hasClass(obj, cN)) {
        removeClass(obj, cN)
    } else {
        addClass(obj, cN)
    }
}