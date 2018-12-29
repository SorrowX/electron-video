export default function drag(obj, downCb, moveCb, upCb) {
    obj.onmousedown = function(ev) {
        var ev = ev || event
        var disX = ev.clientX - this.offsetLeft
        var disY = ev.clientY - this.offsetTop
         
        if ( obj.setCapture ) {
            obj.setCapture()
        }

        downCb && downCb()
         
        document.onmousemove = function(ev) {
            var ev = ev || event
             
            var L = ev.clientX - disX
            var T = ev.clientY - disY
             
            if ( L < 0 ) {
                L = 0
            } else if ( L > document.documentElement.clientWidth - obj.offsetWidth ) {
                L = document.documentElement.clientWidth - obj.offsetWidth
            }
             
            if ( T < 0 ) {
                T = 0
            } else if ( T > document.documentElement.clientHeight - obj.offsetHeight ) {
                T = document.documentElement.clientHeight - obj.offsetHeight
            }
             
            obj.style.left = L + 'px'
            obj.style.top = T + 'px'

            moveCb && moveCb()
        }
         
        document.onmouseup = function() {
            document.onmousemove = document.onmouseup = null
            if ( obj.releaseCapture ) {
                obj.releaseCapture()
            }
            upCb && upCb()
        }
        return false
    }
}