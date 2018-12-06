/* AlloyTouch v0.2.1
 * By AlloyTeam http://www.alloyteam.com/
 * Github: https://github.com/AlloyTeam/AlloyTouch
 * MIT Licensed.
 * Sorrow.X --- 添加注释,注释纯属个人理解
 */

 // 兼容不支持requestAnimationFrame的浏览器
;(function () {
    'use strict';

    if (!Date.now)
        Date.now = function () { return new Date().getTime(); };

    var vendors = ['webkit', 'moz'];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        var vp = vendors[i];
        window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = (window[vp + 'CancelAnimationFrame']
                                   || window[vp + 'CancelRequestAnimationFrame']);
    }
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
        || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var lastTime = 0;
        window.requestAnimationFrame = function (callback) {
            var now = Date.now();
            var nextTime = Math.max(lastTime + 16, now);
            return setTimeout(function () { callback(lastTime = nextTime); },
                              nextTime - now);
        };
        window.cancelAnimationFrame = clearTimeout;
    }
}());

var AlloyTouch = (function () {

    // 给元素绑定事件, 默认冒泡
    function bind(element, type, callback) {
        element.addEventListener(type, callback, false);
    };

    // 三次贝塞尔
    function ease(x) {
        return Math.sqrt(1 - Math.pow(x - 1, 2));
    };

    // 相反的三次贝塞尔
    function reverseEase(y) {
        return 1 - Math.sqrt(1 - y * y);
    };

    // INPUT|TEXTAREA|BUTTON|SELECT这几个标签就不用阻止默认事件了
    function preventDefaultTest(el, exceptions) {
        for (var i in exceptions) {
            if (exceptions[i].test(el[i])) {
                return true;
            };
        };
        return false;
    };

    var AlloyTouch = function (option) {
        
        this.element = typeof option.touch === "string" ? document.querySelector(option.touch) : option.touch;    // 反馈触摸的dom
        this.target = this._getValue(option.target, this.element);    // 运动的对象
        this.vertical = this._getValue(option.vertical, true);    // 不必需，默认是true代表监听竖直方向touch
        this.property = option.property;    // 被滚动的属性
        this.tickID = 0;

        this.initialValue = this._getValue(option.initialValue, this.target[this.property]);    // 被运动的属性的初始值,默认从Transform原始属性拿值
        this.target[this.property] = this.initialValue;    // 给运动的属性赋值
        this.fixed = this._getValue(option.fixed, false);
        this.sensitivity = this._getValue(option.sensitivity, 1);    // 默认是1, 灵敏度
        this.moveFactor = this._getValue(option.moveFactor, 1);    // move时的运动系数
        this.factor = this._getValue(option.factor, 1);    // 系数
        this.outFactor = this._getValue(option.outFactor, 0.3);    // 外部系数
        this.min = option.min;    // 不必需,滚动属性的最小值,越界会回弹
        this.max = option.max;    // 不必需,运动属性的最大值,越界会回弹, 一般为0
        this.deceleration = 0.0006;    // 减速系数
        this.maxRegion = this._getValue(option.maxRegion, 600);    // 最大区域, 默认60
        this.springMaxRegion = this._getValue(option.springMaxRegion, 60);    // 弹动的最大值区域, 默认60
        this.maxSpeed = option.maxSpeed;    // 最大速度
        this.hasMaxSpeed = !(this.maxSpeed === undefined);    // 是否有最大速度属性
        this.lockDirection = this._getValue(option.lockDirection, true);    // 锁定方向

        var noop = function () { };    // 空函数
        this.touchStart = option.touchStart || noop;
        this.change = option.change || noop;
        this.touchMove = option.touchMove || noop;
        this.pressMove = option.pressMove || noop;
        this.tap = option.tap || noop;
        this.touchEnd = option.touchEnd || noop;
        this.touchCancel = option.touchCancel || noop;
        this.reboundEnd = option.reboundEnd || noop;    // 回弹回调
        this.animationEnd = option.animationEnd || noop;
        this.correctionEnd = option.correctionEnd || noop;    // 修改回调

        this.preventDefault = this._getValue(option.preventDefault, true);    // 默认是true,是否阻止默认事件
        this.preventDefaultException = { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ };    // 这几个tag标签,阻止默认事件例外
        this.hasMin = !(this.min === undefined);    // 是否有min,和max属性
        this.hasMax = !(this.max === undefined);
        if (this.hasMin && this.hasMax && this.min > this.max) {    // 最小值不能比最大值大啊
            throw "the min value can't be greater than the max value."
        };
        this.isTouchStart = false;    // 触摸是否开始
        this.step = option.step;    // 步数(回弹)
        this.inertia = this._getValue(option.inertia, true);    // 默认true,开启惯性效果

        this._calculateIndex();    // 添加this.currentPage属性,如果写轮播的话

        this.eventTarget = window;
        if(option.bindSelf){
            this.eventTarget = this.element;    // 默认touchmove, touchend, touchcancel绑定在 window 上的, 如果option.bindSelf为真值,则绑定到反馈触摸的dom
        };

        this._moveHandler = this._move.bind(this);    // 函数赋值
        // 反馈触摸的dom只绑定了touchstart(_start), window绑定了 touchmove(_move), touchend(_end), touchcancel(_cancel)方法
        bind(this.element, "touchstart", this._start.bind(this));
        bind(this.eventTarget, "touchend", this._end.bind(this));
        bind(this.eventTarget, "touchcancel", this._cancel.bind(this));
        this.eventTarget.addEventListener("touchmove", this._moveHandler, { passive: false, capture: false });    // 使用 passive 改善的滚屏性能
        this.x1 = this.x2 = this.y1 = this.y2 = null;    // start时的坐标和move时的坐标
    };

    AlloyTouch.prototype = {
        _getValue: function (obj, defaultValue) {    // 取用户的值还是使用默认值
            return obj === undefined ? defaultValue : obj;
        },
        _start: function (evt) {
            this.isTouchStart = true;    // 触摸开始
            this.touchStart.call(this, evt, this.target[this.property]);    // (1. touchStart(evt, propValue)回调)
            cancelAnimationFrame(this.tickID);    // 只要触摸就停止动画
            this._calculateIndex();    // 重新计算this.currentPage属性值
            this.startTime = new Date().getTime();    // 开始的时间戳
            this.x1 = this.preX = evt.touches[0].pageX;    // 开始前的坐标保存到x,y 和 preXY去
            this.y1 = this.preY = evt.touches[0].pageY;
            this.start = this.vertical ? this.preY : this.preX;    // 如果监听竖直方向则取y坐标,否则横向方向取x坐标
            this._firstTouchMove = true;    // 开始move(这个条件为_move做铺垫)
            this._preventMove = false;    // 不阻止dom继续运动(开启惯性运动之旅的条件之一 哈哈)
        },
        _move: function (evt) {
            if (this.isTouchStart) {    // 触摸开始了
                var len = evt.touches.length,    // 手指数量
                    currentX = evt.touches[0].pageX,    // move时的坐标
                    currentY = evt.touches[0].pageY;

                if (this._firstTouchMove && this.lockDirection) {    // 开始move 且 锁定方向 
                    var dDis = Math.abs(currentX - this.x1) - Math.abs(currentY - this.y1);    // 是左右滑动还是上下滑动(x>y为水平, y>x为竖直)
                    if (dDis > 0 && this.vertical) {    // 左右滑动 且 监听竖直方向
                        this._preventMove = true;    // 阻止dom继续运动
                    } else if (dDis < 0 && !this.vertical) {    // 竖直滑动 且 监听横向方向
                        this._preventMove = true;
                    };    // 以上2种情况直接不开启惯性运动之旅(因为左右滑动的话this.vertical需为false,竖直滑动的话this.vertical需为true)
                    this._firstTouchMove = false;    // 变成false, 为了手指连续移动中,此方法就不用进来了
                };
                if(!this._preventMove) {    // move时 属性运动(关闭惯性运动后, 其实只有此运动了, 手指移动才会运动, 离开则不会运动了)

                    var d = (this.vertical ? currentY - this.preY : currentX - this.preX) * this.sensitivity;    // 根据竖直还是左右来确定差值 * 灵敏度
                    var f = this.moveFactor;    // 变量f的值为 move时的运动系数(默认1)
                    if (this.hasMax && this.target[this.property] > this.max && d > 0) {    // 有最大值 且 运动属性值>最大值 且 坐标差值d>0
                        f = this.outFactor;
                    } else if (this.hasMin && this.target[this.property] < this.min && d < 0) {    // 有最小值 且 运动属性值<最小值 且 坐标差值d<0
                        f = this.outFactor;    // 满足以上2中条件 变量f 的值就变成 this.outFactor(默认0.3)
                    };
                    d *= f;    // 坐标差值再乘以运动系数
                    this.preX = currentX;    // 把move时的坐标保存到preXY去
                    this.preY = currentY;
                    if (!this.fixed) {    // this.fixed默认false(fixed一旦固定了,move时, dom也不会运动)
                        this.target[this.property] += d;    //把坐标的差值且乘以运动系数后的结果累加给运动的对象(被transform.js加工后的dom对象)
                        // console.log('_move: ' + this.target[this.property]);
                    };
                    this.change.call(this, this.target[this.property]);    // (2. move时的change(evt, propValue)回调)
                    var timestamp = new Date().getTime();    // move时的时间戳
                    if (timestamp - this.startTime > 300) {    // move时的时间戳和start时的时间戳大于300的话
                        this.startTime = timestamp;    // move时的时间戳赋值给start时的时间戳
                        this.start = this.vertical ? this.preY : this.preX;    // 重新计算this.start值
                    };
                    this.touchMove.call(this, evt, this.target[this.property]);    // (3. touchMove(evt, propValue)回调)
                };

                if (this.preventDefault && !preventDefaultTest(evt.target, this.preventDefaultException)) {    //阻止默认事件除了INPUT|TEXTAREA|BUTTON|SELECT这几个标签
                    evt.preventDefault();
                };

                if (len === 1) {    // 一根手指
                    if (this.x2 !== null) {    //一开始为null
                        evt.deltaX = currentX - this.x2;    // move移动时的差值
                        evt.deltaY = currentY - this.y2;

                    } else {
                        evt.deltaX = 0;    // 一开始差值为0啦
                        evt.deltaY = 0;
                    }
                    this.pressMove.call(this, evt, this.target[this.property]);    // (4. pressMove(evt, propValue)回调)
                }
                this.x2 = currentX;    //把本次坐标赋值给x2,y2
                this.y2 = currentY;
            }
        },
        _end: function (evt) {
            if (this.isTouchStart) {    // 触摸开始了

                this.isTouchStart = false;    // 触摸开始变量置为false(_move方法进不去了)
                var self = this,    // 存个实例
                    current = this.target[this.property],    // 当前运动对象的运动属性的值
                    triggerTap = (Math.abs(evt.changedTouches[0].pageX - this.x1) < 30 && Math.abs(evt.changedTouches[0].pageY - this.y1) < 30);    // 是否触发tap事件回调
                if (triggerTap) {    // 触发tap事件
                    this.tap.call(this, evt, current);    // (5. tap(evt, propValue)回调)
                };

                if (this.touchEnd.call(this, evt, current, this.currentPage) === false) return;    // (6. touchEnd(evt, propValue, 当前第几页)回调)这个主要给轮播用的吧

                if (this.hasMax && current > this.max) {    // 有最大值 且 当前运动对象的运动属性的值大于最大值

                    this._to(this.max, 200, ease, this.change, function (value) {    // (最大小值, time, 曲线, change函数, fn)
                        this.reboundEnd.call(this, value);
                        this.animationEnd.call(this, value);
                    }.bind(this));

                } else if (this.hasMin && current < this.min) {    // 有最小值 且 当前运动对象的运动属性的值小于最小值

                    this._to(this.min, 200, ease, this.change, function (value) {
                        this.reboundEnd.call(this, value);
                        this.animationEnd.call(this, value);
                    }.bind(this));

                } else if (this.inertia && !triggerTap && !this._preventMove) {    // 开启惯性效果(默认为true) 且 不触发tap事件 且 this._preventMove为false;

                    var dt = new Date().getTime() - this.startTime;    // _end时的时间戳和_move时的时间戳的差值
                    if (dt < 300) {    // 小于300ms就执行惯性运动
                        var distance = ((this.vertical ? evt.changedTouches[0].pageY : evt.changedTouches[0].pageX) - this.start) * this.sensitivity,    // _end中的坐标与_move中坐标的差值乘以灵敏度
                            speed = Math.abs(distance) / dt,    // 速度为坐标差值/时间戳差值
                            speed2 = this.factor * speed;    // 速度2为 系数(默认1)乘以速度
                        if(this.hasMaxSpeed && speed2 > this.maxSpeed) {    // 有最大速度 且 速度2大于最大速度
                            speed2 = this.maxSpeed;    // 速度2就为最大速度
                        };

                        // 目标值destination = 当前运动对象的运动属性的值 + (速度2*速度2)/(2*减速系数)*(-1||1); 
                        var destination = current + (speed2 * speed2) / (2 * this.deceleration) * (distance < 0 ? -1 : 1); 
                        // console.log('distance： '+ distance);
                        // console.log('目标值destination： '+ destination);
                        // console.log('差值： '+ destination > current);

                        var tRatio = 1;    // 比例
                        if (destination < this.min ) {    // 目标值 比 最小值 小
                            if (destination < this.min - this.maxRegion) {
                                tRatio = reverseEase((current - this.min + this.springMaxRegion) / (current - destination));
                                destination = this.min - this.springMaxRegion;
                            } else {
                                tRatio = reverseEase((current - this.min + this.springMaxRegion * (this.min - destination) / this.maxRegion) / (current - destination));
                                destination = this.min - this.springMaxRegion * (this.min - destination) / this.maxRegion;
                            }
                        } else if (destination > this.max) {    // 目标值 比 最大值 大
                            if (destination > this.max + this.maxRegion) {
                                tRatio = reverseEase((this.max + this.springMaxRegion - current) / (destination - current));
                                destination = this.max + this.springMaxRegion;
                            } else {
                                tRatio = reverseEase((this.max + this.springMaxRegion * ( destination-this.max) / this.maxRegion - current) / (destination - current));
                                destination = this.max + this.springMaxRegion * (destination - this.max) / this.maxRegion;
                                
                            }
                        };

                        // 持续时间duration = 数字舍入(速度/减速系数) * 比例;
                        var duration = Math.round(speed / self.deceleration) * tRatio;
                        // console.log('持续时间duration: ' + duration);

                        // end方法计算好的目标值和持续时间传入_to方法,运动起来吧
                        self._to(Math.round(destination), duration, ease, self.change, function (value) {    // 回调函数的value 就是 destination

                            if (self.hasMax && self.target[self.property] > self.max) {    // 有最大值 且 运动属性的值大于最大值

                                cancelAnimationFrame(self.tickID);
                                self._to(self.max, 600, ease, self.change, self.animationEnd);

                            } else if (self.hasMin && self.target[self.property] < self.min) {    // 有最小值 且 运动属性的值小于最小值

                                cancelAnimationFrame(self.tickID);
                                self._to(self.min, 600, ease, self.change, self.animationEnd);

                            } else {
                                self._correction();    // 回弹
                            };

                            self.change.call(this, value);    // (7. change(运动属性的值)回调函数)
                        });
                    } else {
                        self._correction();    // 回弹
                    }
                } else {
                    self._correction();    // 回弹
                };

                // 阻止默认事件
                if (this.preventDefault && !preventDefaultTest(evt.target, this.preventDefaultException)) {
                    evt.preventDefault();
                };

            };
            // 坐标置null
            this.x1 = this.x2 = this.y1 = this.y2 = null;
        },
        // 提供目标值, 持续时间, 然后根据时间戳和time持续时间的差值比较, 时间戳< time的话就一直调用动画,否则结束
        _to: function (value, time, ease, onChange, onEnd) {    // value:目标值, time:持续时间, ease: 曲线动画, onChange: this.change回调函数(用户的), onEnd回调
            if (this.fixed) return;    // fixed(默认false)有真值就return掉
            var el = this.target,    // 运动的对象
                property = this.property;    // 运动的属性
            var current = el[property];    // 运动对象运动属性当前的值
            var dv = value - current;    // 目标值与当前属性的差值
            var beginTime = new Date();    // 开始时间戳
            var self = this;    // 存个实例
            var toTick = function () {

                var dt = new Date() - beginTime;    // 时间戳差值
                if (dt >= time) {    // 时间戳差值大于持续时间
                    el[property] = value;    // 把目标值赋值给dom属性
                    onChange && onChange.call(self, value);    // (7. change(目标值)回调函数)
                    onEnd && onEnd.call(self, value);    // onEnd回调
                    return;
                };
                el[property] = dv * ease(dt / time) + current;
                // console.log(el[property]);
                self.tickID = requestAnimationFrame(toTick);    // 动画自调用
                onChange && onChange.call(self, el[property]);    //(7. change(属性值)回调函数)
            };
            toTick();    // 调用
        },
        // 该函数用来当动画完成后根据this.step修正一点(回弹效果)
        _correction: function () {
            if (this.step === undefined) return;    // step没赋值的话就return掉
            var el = this.target,    // 运动的对象
                property = this.property;    // 运动对象的运动属性
            var value = el[property];    // 运动对象运动属性的值
            var rpt = Math.floor(Math.abs(value / this.step));    // 向下取整(取绝对值(运动对象运动属性的值/ this.step值))
            var dy = value % this.step;    // 运动对象运动属性的值取余数

            if (Math.abs(dy) > this.step / 2) {    // 我想这里又应用了啥物理原理根据条件判断,来计算value目标值的,然后调用_to方法执行惯性运动
                this._to((value < 0 ? -1 : 1) * (rpt + 1) * this.step, 400, ease, this.change, function (value) {
                    this._calculateIndex();
                    this.correctionEnd.call(this, value);
                    this.animationEnd.call(this, value);
                }.bind(this));
            } else {
                this._to((value < 0 ? -1 : 1) * rpt * this.step, 400, ease, this.change, function (value) {
                    this._calculateIndex();    // 重新计算this.currentPage值
                    this.correctionEnd.call(this, value);    // (8. correctionEnd(属性值)回调函数)
                    this.animationEnd.call(this, value);    // (9. animationEnd(属性值)回调函数)
                }.bind(this));
            }
        },
        _cancel: function (evt) {
            var current = this.target[this.property];
            this.touchCancel.call(this, evt, current);
            this._end(evt);
        },
        // 给用户使用的, 控制dom以不同的曲线动画运动
        to: function (v, time, user_ease) {
            this._to(v, this._getValue(time, 600), user_ease || ease, this.change, function (value) {
                this._calculateIndex();
                this.reboundEnd.call(this, value);    // (10. reboundEnd(属性值)回调函数)
                this.animationEnd.call(this, value);    // (9. animationEnd(属性值)回调函数)
            }.bind(this));

        },
        // 计算this.currentPage值
        _calculateIndex: function () {
            if (this.hasMax && this.hasMin) {
                this.currentPage = Math.round((this.max - this.target[this.property]) / this.step);    // 当前第几页,比如轮播图的第几个,从0开始
            }
        }
        
    };

    // 抛出去
    /*if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = AlloyTouch;
    } else {
        window.AlloyTouch = AlloyTouch;
    };*/

    return AlloyTouch;

})();


export default AlloyTouch;