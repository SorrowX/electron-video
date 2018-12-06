/* AlloyFinger v0.1.4
 * By dntzhang
 * Github: https://github.com/AlloyTeam/AlloyFinger
 * Sorrow.X --- 添加注释,注释纯属个人理解(关于rotate旋转手势,理解的还不透彻)
 */
var AlloyFinger = (function () {
    // 一些要使用的内部工具函数

    // 2点之间的距离 (主要用来算pinch的比例的, 两点之间的距离比值求pinch的scale)
    function getLen(v) {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    };

    // dot和getAngle函数用来算两次手势状态之间的夹角, cross函数用来算方向的, getRotateAngle函数算手势真正的角度的
    function dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    };

    // 求两次手势状态之间的夹角
    function getAngle(v1, v2) {
        var mr = getLen(v1) * getLen(v2);
        if (mr === 0) return 0;
        var r = dot(v1, v2) / mr;
        if (r > 1) r = 1;
        return Math.acos(r);
    };

    // 利用cross结果的正负来判断旋转的方向(大于0为逆时针, 小于0为顺时针)
    function cross(v1, v2) {
        return v1.x * v2.y - v2.x * v1.y;
    };

    // 如果cross大于0那就是逆时针对于屏幕是正角,对于第一象限是负角,所以 角度 * -1, 然后角度单位换算
    function getRotateAngle(v1, v2) {
        var angle = getAngle(v1, v2);
        if (cross(v1, v2) > 0) {
            angle *= -1;
        };
        return angle * 180 / Math.PI;
    };

    // HandlerAdmin构造函数
    var HandlerAdmin = function(el) {
        this.handlers = [];    // 手势函数集合
        this.el = el;    // dom元素
    };

    // HandlerAdmin原型方法

    // 把fn添加到实例的 handlers数组中
    HandlerAdmin.prototype.add = function(handler) {
        this.handlers.push(handler); 
    };

    // 删除 handlers数组中的函数
    HandlerAdmin.prototype.del = function(handler) {
        if(!handler) this.handlers = [];    // handler为假值,handlers则赋值为[](参数不传undefined,其实不管this.handlers有没有成员函数,都得置空)

        for(var i = this.handlers.length; i >= 0; i--) {
            if(this.handlers[i] === handler) {    // 如果函数一样
                this.handlers.splice(i, 1);    // 从handler中移除该函数(改变了原数组)
            };
        };
    };

    // 执行用户的回调函数
    HandlerAdmin.prototype.dispatch = function() {
        for(var i=0, len=this.handlers.length; i<len; i++) {
            var handler = this.handlers[i];    
            if(typeof handler === 'function') handler.apply(this.el, arguments);    // 执行回调this为dom元素, 把触发的事件对象作为参数传过去了
        };
    };

    function wrapFunc(el, handler) {
        var handlerAdmin = new HandlerAdmin(el);    // 实例化一个对象
        handlerAdmin.add(handler);

        return handlerAdmin;
    };

    // AlloyFinger构造函数
    var AlloyFinger = function (el, option) {    // el: dom元素/id, option: 各种手势的集合对象

        this.element = typeof el == 'string' ? document.querySelector(el) : el;    // 获取dom元素

        this.now = null;    // 开始时的时间戳
        this.last = null;    // 最后数值
        this.delta = null;    // 差值 变量增量
        this.preTapPosition = { x: null, y: null };    // 用来保存start()方法时的手指坐标
        this.preV = { x: null, y: null };    // 开始前的坐标
        this.x1 = this.x2 = this.y1 = this.y2 = null;    // start()时的坐标x1, y1, move()时的坐标x2, y2 (相对于页面的坐标)
        this.pinchStartLen = null;    // start()方法开始时捏的长度
        this.scale = 1;    // 初始缩放比例为1
        this.isDoubleTap = false;    // 是否双击, 默认为false

        this.tapTimeout = null;    // tap超时
        this.singleTapTimeout = null;    // singleTap超时
        this.longTapTimeout = null;    // longTap超时(定时器的返回值)
        this.swipeTimeout = null;    // swipe超时

        // 绑定原型上start, move, end, cancel函数的this对象为 AlloyFinger实例
        this.start = this.start.bind(this);
        this.move = this.move.bind(this);
        this.end = this.end.bind(this);
        this.cancel = this.cancel.bind(this);

        // 给dom元素 绑定原生的 touchstart, touchmove, touchend, touchcancel事件, 默认冒泡
        this.element.addEventListener("touchstart", this.start, false);
        this.element.addEventListener("touchmove", this.move, false);
        this.element.addEventListener("touchend", this.end, false);
        this.element.addEventListener("touchcancel", this.cancel, false);

        var noop = function () { };    // 空函数(把用户没有绑定手势函数默认赋值此函数)

        // 提供了14种手势函数. 根据option对象, 分别创建一个 HandlerAdmin实例 赋值给相应的this属性
        // start()中的
        this.touchStart = wrapFunc(this.elements, option.touchStart || noop);
        this.multipointStart = wrapFunc(this.elements, option.multipointStart || noop);
        this.longTap = wrapFunc(this.elements, option.longTap || noop);
        // move()中的
        this.pressMove = wrapFunc(this.elements, option.pressMove || noop);
        this.pinch = wrapFunc(this.elements, option.pinch || noop);
        this.rotate = wrapFunc(this.elements, option.rotate || noop);
        this.touchMove = wrapFunc(this.elements, option.touchMove || noop);
        // end()中的
        this.multipointEnd = wrapFunc(this.elements, option.multipointEnd || noop);
        this.touchEnd = wrapFunc(this.elements, option.touchEnd || noop);
        this.tap = wrapFunc(this.elements, option.tap || noop);
        this.singleTap = wrapFunc(this.elements, option.singleTap || noop);
        this.doubleTap = wrapFunc(this.elements, option.doubleTap || noop);
        this.swipe = wrapFunc(this.elements, option.swipe || noop);
        // cancel()中的
        this.touchCancel = wrapFunc(this.elements, option.touchCancel || noop);
    };

    // AlloyFinger原型对象
    AlloyFinger.prototype = {

        start: function (evt) {
            if (!evt.touches) return;    // 如果没有TouchList对象, 直接return掉 (touches: 位于屏幕上的所有手指的列表)

            this.now = Date.now();    // 开始时间戳
            this.x1 = evt.touches[0].pageX;    // 相对于页面的 x1, y1 坐标
            this.y1 = evt.touches[0].pageY;
            this.delta = this.now - (this.last || this.now);    // 时间戳差值

            this.touchStart.dispatch(evt);    // 调用HandlerAdmin实例this.touchStart上的dispatch方法(1.start()中的touchStart回调事件)

            if (this.preTapPosition.x !== null) {    // 开始前tap的x坐标不为空的话(一次没点的时候必然是null了)
                this.isDoubleTap = (this.delta > 0 && this.delta <= 250 && Math.abs(this.preTapPosition.x - this.x1) < 30 && Math.abs(this.preTapPosition.y - this.y1) < 30);
            };
            this.preTapPosition.x = this.x1;    // 把相对于页面的 x1, y1 坐标赋值给 this.preTapPosition
            this.preTapPosition.y = this.y1;
            this.last = this.now;    // 把开始时间戳赋给 this.last
            var preV = this.preV,    // 把开始前的坐标赋给 preV变量
                len = evt.touches.length;    // len: 手指的个数

            if (len > 1) {    // 一根手指以上
                this._cancelLongTap();    // 取消长按定时器
                this._cancelSingleTap();    // 取消SingleTap定时器

                var v = {    // 2个手指坐标的差值
                    x: evt.touches[1].pageX - this.x1, 
                    y: evt.touches[1].pageY - this.y1 
                };
                preV.x = v.x;    // 差值赋值给PreV对象
                preV.y = v.y;

                this.pinchStartLen = getLen(preV);    // start()方法中2点之间的距离
                this.multipointStart.dispatch(evt);    // (2.start()中multipointStart回调事件)
            };

            this.longTapTimeout = setTimeout(function () {
                this.longTap.dispatch(evt);    // (3.start()中longTap回调事件, 定时器)
            }.bind(this), 750);
        },

        move: function (evt) {
            if (!evt.touches) return;    // 如果没有TouchList对象, 直接return掉 (touches: 位于屏幕上的所有手指的列表)

            var preV = this.preV,    // 把start方法保存的2根手指坐标的差值xy赋给preV变量
                len = evt.touches.length,    // 手指个数
                currentX = evt.touches[0].pageX,    // 第一根手指的坐标(相对于页面的 x1, y1 坐标)
                currentY = evt.touches[0].pageY;
            this.isDoubleTap = false;    // 移动过程中不能双击了

            if (len > 1) {    // 2根手指以上(处理捏pinch和旋转rotate手势)

                var v = {    // 第二根手指和第一根手指坐标的差值
                    x: evt.touches[1].pageX - currentX, 
                    y: evt.touches[1].pageY - currentY 
                };

                if (preV.x !== null) {    // start方法中保存的this.preV的x不为空的话

                    if (this.pinchStartLen > 0) {    // 2点间的距离大于0
                        evt.scale = getLen(v) / this.pinchStartLen;    // move中的2点之间的距离除以start中的2点的距离就是缩放比值
                        this.pinch.dispatch(evt);    // scale挂在到evt对象上 (5.move()中的pinch回调事件)
                    };

                    evt.angle = getRotateAngle(v, preV);    // 计算angle角度
                    this.rotate.dispatch(evt);    // (6.move()中的rotate回调事件)
                };

                preV.x = v.x;    // 把move中的2根手指中的差值赋值给preV, 当然也改变了this.preV
                preV.y = v.y;

            } else {    // 一根手指(处理拖动pressMove手势)

                if (this.x2 !== null) {    // 一根手指第一次必然为空,因为初始化赋值为null, 下面将会用x2, y2保存上一次的结果

                    evt.deltaX = currentX - this.x2;    // 拖动过程中或者手指移动过程中的差值(当前坐标与上一次的坐标)
                    evt.deltaY = currentY - this.y2;

                } else {
                    evt.deltaX = 0;    // 第一次嘛, 手指刚移动,哪来的差值啊,所以为0呗
                    evt.deltaY = 0;
                };
                this.pressMove.dispatch(evt);    // deltaXY挂载到evt对象上,抛给用户(4.move()中的pressMove回调事件)
            };

            this.touchMove.dispatch(evt);    // evt对象因if语句而不同,挂载不同的属性抛出去给用户 (7.move()中的touchMove回调事件)

            this._cancelLongTap();    // 取消长按定时器

            this.x2 = currentX;    // 存一下本次的pageXY坐标, 为了下次做差值
            this.y2 = currentY;

            if (len > 1) {    // 2个手指以上就阻止默认事件
                evt.preventDefault();
            };
        },

        end: function (evt) {
            if (!evt.changedTouches) return;    // 位于该元素上的所有手指的列表, 没有TouchList也直接return掉

            this._cancelLongTap();    // 取消长按定时器

            var self = this;    // 存个实例
            if (evt.touches.length < 2) {    // 手指数量小于2就触发 (8.end()中的multipointEnd回调事件)
                this.multipointEnd.dispatch(evt);
            };

            this.touchEnd.dispatch(evt);    // 触发(9.end()中的touchEnd回调事件)

            //swipe 滑动
            if ((this.x2 && Math.abs(this.x1 - this.x2) > 30) || (this.y2 && Math.abs(this.preV.y - this.y2) > 30)) {

                evt.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2);    // 获取上下左右方向中的一个

                this.swipeTimeout = setTimeout(function () {
                    self.swipe.dispatch(evt);    // 立即触发,加入异步队列(13.end()中的swipe回调事件)
                }, 0);

            } else {   // 以下是tap, singleTap, doubleTap事件派遣

                this.tapTimeout = setTimeout(function () {

                    self.tap.dispatch(evt);    // 触发(10.end()中的tap回调事件)
                    // trigger double tap immediately
                    if (self.isDoubleTap) {    // 如果满足双击的话

                        self.doubleTap.dispatch(evt);    // 触发(12.end()中的doubleTap回调事件)
                        clearTimeout(self.singleTapTimeout);    // 清除singleTapTimeout定时器

                        self.isDoubleTap = false;    // 双击条件重置

                    } else {
                        self.singleTapTimeout = setTimeout(function () {
                            self.singleTap.dispatch(evt);    // 触发(11.end()中的singleTap回调事件)
                        }, 250);
                    };

                }, 0);    // 加入异步队列,主线程完成立马执行
            };

            this.preV.x = 0;    // this.preV, this.scale, this.pinchStartLen, this.x1 x2 y1 y2恢复初始值
            this.preV.y = 0;
            this.scale = 1;
            this.pinchStartLen = null;
            this.x1 = this.x2 = this.y1 = this.y2 = null;
        },

        cancel: function (evt) {
            //清除定时器
            clearTimeout(this.singleTapTimeout);
            clearTimeout(this.tapTimeout);
            clearTimeout(this.longTapTimeout);
            clearTimeout(this.swipeTimeout);
            // 执行用户的touchCancel回调函数,没有就执行一次noop空函数
            this.touchCancel.dispatch(evt);
        },

        _cancelLongTap: function () {    // 取消长按定时器
            clearTimeout(this.longTapTimeout);
        },

        _cancelSingleTap: function () {    // 取消延时SingleTap定时器
            clearTimeout(this.singleTapTimeout);
        },

        // 2点间x与y之间的绝对值的差值作比较,x大的话即为左右滑动,y大即为上下滑动,x的差值大于0即为左滑动,小于0即为右滑动
        _swipeDirection: function (x1, x2, y1, y2) {    // 判断用户到底是从上到下，还是从下到上，或者从左到右、从右到左滑动
            return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down');
        },

        // 给dom添加14种事件中的一种
        on: function(evt, handler) {    
            if(this[evt]) {    // 看看有没有相应的事件名
                this[evt].add(handler);    // HandlerAdmin实例的add方法
            };
        },

        // 移除手势事件对应函数
        off: function(evt, handler) {
            if(this[evt]) {
                this[evt].del(handler);    // 从数组中删除handler方法
            };
        },

        destroy: function() {

            // 关闭所有定时器
            if(this.singleTapTimeout) clearTimeout(this.singleTapTimeout);
            if(this.tapTimeout) clearTimeout(this.tapTimeout);
            if(this.longTapTimeout) clearTimeout(this.longTapTimeout);
            if(this.swipeTimeout) clearTimeout(this.swipeTimeout);

            // 取消dom上touchstart, touchmove, touchend, touchcancel事件
            this.element.removeEventListener("touchstart", this.start);
            this.element.removeEventListener("touchmove", this.move);
            this.element.removeEventListener("touchend", this.end);
            this.element.removeEventListener("touchcancel", this.cancel);

            // 把14个HandlerAdmin实例的this.handlers置为空数组
            this.rotate.del();
            this.touchStart.del();
            this.multipointStart.del();
            this.multipointEnd.del();
            this.pinch.del();
            this.swipe.del();
            this.tap.del();
            this.doubleTap.del();
            this.longTap.del();
            this.singleTap.del();
            this.pressMove.del();
            this.touchMove.del();
            this.touchEnd.del();
            this.touchCancel.del();

            // 实例成员的变量全部置为null
            this.preV = this.pinchStartLen = this.scale = this.isDoubleTap = this.delta = this.last = this.now = this.tapTimeout = this.singleTapTimeout = this.longTapTimeout = this.swipeTimeout = this.x1 = this.x2 = this.y1 = this.y2 = this.preTapPosition = this.rotate = this.touchStart = this.multipointStart = this.multipointEnd = this.pinch = this.swipe = this.tap = this.doubleTap = this.longTap = this.singleTap = this.pressMove = this.touchMove = this.touchEnd = this.touchCancel = null;

            return null;
        }
    };

    // 抛出去
    /*if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = AlloyFinger;
    } else {
        window.AlloyFinger = AlloyFinger;
    };*/
    return AlloyFinger;
})();

export default AlloyFinger;














  
    
