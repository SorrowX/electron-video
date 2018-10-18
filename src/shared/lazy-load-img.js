/**
 * modify by Sorrow.X on 2017/4/27.
 * 源地址： https://github.com/lzxb/vue-lazy-load-img
 */
class LazyLoadImg {
    constructor() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
        this.options = {    // 实例的option属性(默认)
            el: document.querySelector('body'), // 选择的元素
            mode: 'default', // 默认模式，将显示原图，diy模式，将自定义剪切，默认剪切居中部分
            time: 300, // 设置一个检测时间间隔
            done: true, // 页面内所有数据图片加载完成后，是否自己销毁程序，true默认销毁，false不销毁：FALSE应用场景：页面异步不断获取数据的情况下 需要实时监听则不销毁
            diy: { // 此属性，只有在设置diy 模式时才生效
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center'
            },
            position: { // 只要其中一个位置符合条件，都会触发加载机制
                top: 0, // 元素距离顶部
                right: 0, // 元素距离右边
                bottom: 0, // 元素距离下面
                left: 0 // 元素距离左边
            },
            before: function before(el) {// 图片加载之前，执行钩子函数

            },
            success: function success(el) {// 图片加载成功，执行钩子函数

            },
            error: function error(el) {// 图片加载失败，执行的钩子函数

            }
        }
        Object.assign({}, this.options, options)
        Object.assign({}, this.options.diy, options.diy)
        Object.assign(this.options, options)

        // 裁切图片用的
        this.canvas = document.createElement('canvas')
        this.canvas.getContext('2d').globalAlpha = 0.0
        this.images = {}

        this._timer = true    // 给实例添加一个_timer属性(定时器)
        this.start()    // 开启懒加载程序
    }

    _testMeet(el) {    // 每个dom元素,一般img元素
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}    // position对象

        // 取得元素在可视区的位置（相对浏览器视窗）左右上下
        var bcr = el.getBoundingClientRect()
        // padding+border+width
        var mw = el.offsetWidth // 元素自身宽度
        var mh = el.offsetHeight // 元素自身的高度
        // 包含了导航栏
        var w = window.innerWidth // 视窗的宽度
        var h = window.innerHeight // 视窗的高度

        var boolX = !(bcr.right - options.left <= 0 && bcr.left + mw - options.left <= 0) && !(bcr.left + options.right >= w && bcr.right + options.right >= mw + w) // 左右符合条件
        var boolY = !(bcr.bottom - options.top <= 0 && bcr.top + mh - options.top <= 0) && !(bcr.top + options.bottom >= h && bcr.bottom + options.bottom >= mh + h) // 上下符合条件
        return el.width !== 0 && el.height !== 0 && boolX && boolY
    }

    _getTransparent(src, w, h) {
        if (this.images[src]) return this.images[src]
        this.canvas.width = w
        this.canvas.height = h
        var data = this.canvas.toDataURL('image/png')
        this.images[src] = data
        return data
    }

    start() {
        var self = this    // LazyLoadImg实例存一下

        var options = this.options    // 配置存一下

        clearTimeout(this._timer) // 清除定时器
        if (!this._timer) return
        // this._timer 是setTimeout的return flag 推荐采用settimeout的方法，而不是setinterval
        this._timer = setTimeout(function () {
            var list = Array.prototype.slice.apply(options.el.querySelectorAll('[data-src]'))    // 获取el下所有含有data-src属性的标签,且转成数组
            // 如果list.length为0 且页面内图片已经加载完毕 清空setTimeout循环
            if (!list.length && options.done) {    // list有数据就不关闭定时器
                clearTimeout(self._timer) // 有页面内的图片加载完成了，自己销毁程序
            } else {
                list.forEach(function (el) {    // 遍历dom
                    // 如果该元素状态为空（dataset HTML5方法 设置、获取属性）；并且检测该元素的位置
                    if (!el.dataset.LazyLoadImgState && self._testMeet(el, options.position)) {
                        self.loadImg(el)    // 加载图片
                    }
                })
            }
            // call it
            self.start()
        }, options.time)
    }

    loadImg(el) {
        var self = this

        // 加载图片
        var options = this.options

        el.dataset.LazyLoadImgState = 'start'
        // 执行加载之前做的事情
        options.before.call(this, el)
        var img = new window.Image()
        // 这里是一个坑 dataset.src 实际取的值是 属性data-src data- 是HTML5 DOMStringMap对象
        img.src = el.dataset.src

        // 图片加载成功
        img.addEventListener('load', function () {
            if (options.mode === 'diy') {
                el.src = self._getTransparent(el.src, el.width, el.height)
                options.diy.backgroundImage = 'url(' + img.src + ')'
                Object.assign(el.style, options.diy)
            } else {
                el.src = img.src
            }
            delete el.dataset.src
            el.dataset.LazyLoadImgState = 'success'
            return options.success.call(self, el)
        }, false)

        // 图片加载失败
        img.addEventListener('error', function () {
            delete el.dataset.src
            el.dataset.LazyLoadImgState = 'error'
            options.error.call(self, el)
        }, false)
    }

    destroy() {
        // 解除事件绑定,return掉,不会自调用
        delete this._timer
    }

    restart() {
        this._timer = true
        this.start()
    }
}

export default LazyLoadImg