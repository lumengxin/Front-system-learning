/** drag拖拽封装
* dragEle: 可拖拽元素(需要开启绝对定位)
* boundary: 边界检测, 布尔值, 默认开启true
* adsorpt: 吸附距离
* collisionEle: 碰撞元素
*/
// 避免和自定义drag()方法冲突
(function(w) {

    w.$ = {}

    $.drag = function(dragEle, boundary, adsorptDis, collisionEle) {
        // 默认开启边界检测
        var limit = true;
        // 默认不吸附
        var adsortion = 0;
    
        var startPoint = {x: 0, y: 0}
        var mouseDownPoint = {x: 0, y: 0}
        
        dragEle.onmousedown = function(ev) {
            ev = ev || event
            startPoint.x = this.offsetLeft
            startPoint.y = this.offsetTop
            mouseDownPoint.x = ev.clientX
            mouseDownPoint.y = ev.clientY
    
            if (this.setCapture) {
                this.setCapture()
            }
    
            document.onmousemove = function(ev) {
                ev = ev || event
                var mouseMovePoint = {x: 0, y: 0}
                mouseMovePoint.x = ev.clientX
                mouseMovePoint.y = ev.clientY
    
                var dis = {x: 0, y: 0}
                dis.x = mouseMovePoint.x - mouseDownPoint.x
                dis.y = mouseMovePoint.y - mouseDownPoint.y 
    
                var L = startPoint.x + dis.x
                var T = startPoint.y + dis.y

                // if (adsorptDis) {
                //     boundary = true
                // }
    
                limit = boundary === false ? false : true
                if (limit) {
                    if (adsorptDis) {
                        adsortion = adsorptDis
                    }
    
                    if (L < adsortion) {
                        L = 0
                    } else if (L > (document.documentElement.clientWidth - dragEle.offsetWidth - 10)) {
                        L = document.documentElement.clientWidth - dragEle.offsetWidth
                    }
                    if (T < adsortion) {
                        T = 0
                    } else if (T > (document.documentElement.clientHeight - dragEle.offsetHeight - 10)) {
                        T = document.documentElement.clientHeight - dragEle.offsetHeight
                    }
                }
                
    
                dragEle.style.left = L + "px"
                dragEle.style.top = T + "px"
    
                if (collisionEle) {
                    var T1 = dragEle.offsetTop
                    var B1 = dragEle.offsetTop + dragEle.offsetHeight
                    var R1 = dragEle.offsetLeft + dragEle.offsetWidth
                    var L1 = dragEle.offsetLeft
    
                    var T2 = collisionEle.offsetTop
                    var B2 = collisionEle.offsetTop + collisionEle.offsetHeight
                    var R2 = collisionEle.offsetLeft + collisionEle.offsetWidth
                    var L2 = collisionEle.offsetLeft
    
                    if (R1 < L2 || B1 < T2 || L1 > R2 || T1 > B2) {
                        collisionEle.src = "../../../01基础总结/08.canvas/img/g01.png"
                    } else {
                        collisionEle.src = "../../../01基础总结/08.canvas/img/g02.png"
                    }
                }
                
            }
    
            document.onmouseup = function(ev) {
                document.onmousemove = document.onmouseup = null
    
                if (document.releaseCapture) {
                    document.releaseCapture()
                }
            }
            
            return false
        }
    }
})(window)

