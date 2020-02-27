(function(w) {
    /* 自调用函数，w=window, window绑定$对象 */
    w.$ = {}
    // callBack将内部组件的move状态暴露了外部业务逻辑
    w.$.drag = function(testNode, callBack) {
        // debugger
        // 抽象元素开始位置
        var startPoint = {x: 0, y: 0}
        // 抽象鼠标开始位置
        var elementPoint = {x: 0, y: 0}        

        testNode.onmousedown = function(ev) {
            ev = ev || event 

            if (testNode.setCapture) {
                testNode.setCapture()
            }

            startPoint.x = testNode.offsetLeft
            startPoint.y = testNode.offsetTop

            elementPoint.x = ev.clientX
            elementPoint.y = ev.clientY

            document.onmousemove = function(ev) {
                ev = ev || event 
                var nowPoint = {x: 0, y: 0}
                nowPoint.x = ev.clientX
                nowPoint.y = ev.clientY

                var L = startPoint.x + (nowPoint.x - elementPoint.x)

                if (L < 0) {
                    L = 0
                } else if (L > (testNode.parentNode.clientWidth - testNode.offsetWidth)) {
                    L = testNode.parentNode.clientWidth - testNode.offsetWidth
                }

                testNode.style.left = L + "px"

                if (callBack && callBack["move"] && typeof callBack["move"] === "function") {
                    // callBack["move"]()
                    // this指向block,通过call改变this指向
                    callBack["move"].call(testNode)
                }
            }

            document.onmouseup = function() {
                document.onmousemove = document.onmouseup = null 
                if (document.releaseCapture) {
                    document.releaseCapture()
                }
            }

            return false
        }
    }
})(window)