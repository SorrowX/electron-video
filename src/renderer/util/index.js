import config from '../../config/config'
import { local } from '../../shared/storage'
import { WINDOW_ZOOM_FACTOR } from '../constant/index'

/**
 * 函数节流
 * @param 
 *    fn: { Function } 要节流的函数
 *    ms: { Number } 毫秒
 *    ctx: { Object } this指向
 * @return
 *    节流的匿名函数
*/
export function debounce(fn, ms, ctx) {
    ms || (ms = 150)
    let last, deferTimer
    return function() {
        let context = ctx || this
        let now = +new Date(),
            args = arguments
        if (last && now < last + ms) {
            clearTimeout(deferTimer)
            deferTimer = setTimeout(function() {
                last = now
                fn.apply(context, args)
            }, ms)
        } else {
            last = now
            fn.apply(context, args)
        }
    }
}

/**
 * 设置缩放比列
 * @param 
 *    devInnerHeight: { Number } 开发时设置的electron窗体分辨率的height
 *    devScaleFactor: { Number } 设置该值 达到自己想要的效果即可
 * @return
 *    缩放因子
*/
export function setZoomFactor(devScaleFactor, devInnerHeight) {
    devScaleFactor = devScaleFactor || local.getItem(WINDOW_ZOOM_FACTOR) || config['developScaleFactor']
    devInnerHeight = devInnerHeight || config['windowHeight']

    let devDevicePixelRatio = 1.0
    let scaleFactor = require('electron').screen.getPrimaryDisplay().scaleFactor
    let zoomFactor = 
        (window.innerHeight / devInnerHeight) * 
        (window.devicePixelRatio / devDevicePixelRatio) * 
        (devScaleFactor / scaleFactor)

    let min = 0.8, max = 1.4
    if (zoomFactor <= min) {
        zoomFactor = min
    }
    if (zoomFactor >= max) {
        zoomFactor = max
    }

    require('electron').webFrame.setZoomFactor(zoomFactor)

    local.setItem(WINDOW_ZOOM_FACTOR, zoomFactor) // 存入缓存中

    console.log('zoomFactor: ', require('electron').webFrame.getZoomFactor())

    return require('electron').webFrame.getZoomFactor()
}

/**
 * 浅拷贝
 * @param 
 *    to: { Object } 
 *    from: { Object } 被拷贝的对象
 * @return
 *    to
*/
export function extend (to, from) {
    for (const key in from) {
        to[key] = from[key]
    }
    return to
}

/**
 * 获取时间根据时间搓
 * @param 
 *    time: { Number } 时间搓 
 *    isFull: { Boolean } 是否包含小时和分钟 
 * @return
 *    string 字符串时间
*/
export const getTime = function(time, isFull) {
    let year, mouth, date, hours, min
    let d = new Date(time)

    year = twoDigits(d.getFullYear())
    mouth = twoDigits(d.getMonth() + 1)
    date = twoDigits(d.getDate())
    hours = twoDigits(d.getHours())
    min = twoDigits(d.getMinutes())

    return isFull ? `${year}-${mouth}-${date} ${hours}:${min}` : `${year}-${mouth}-${date}`

    function twoDigits(num) {
        return String(num).length <= 1 ? ('0' + num) : String(num)
    }
}

/**
 * 获取秒获取时间
 * @param 
 *    second: { Number } 秒
 * @return
 *    string 字符串时间
*/
export const getTimeStrBySecond = function(second) {
    let min, hour
    min = Math.floor(second / 60)
    if (min <= 60) {
        return min + '分钟'
    } else {
        hour = Math.floor(second/3600)
        min = Math.floor(second/60) % 60
        return `${hour}小时${min}分钟`
    }
}

const getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * 数组随机换位
 * @param 
 *    arr: { Array } 数组
 * @return
 *    Array
*/
export const shuffle = function(arr) {
   let _arr = arr.slice()
   for (let i = 0; i < _arr.length; i++) {
       let j = getRandomInt(0, i)
       let t = _arr[i]
       _arr[i] = _arr[j]
       _arr[j] = t
   }
   return _arr
}

/**
 * 随机获取数组中的几个元素
 * @param 
 *    arr: { Array } 数组
 *    n: { Number } 需要获取的个数
 * @return
 *    Array
*/
export const getRandomItemFromArr = function(arr, n) {
    if (arr.length <= n) {
        return arr.slice()
    }
    let randomArr = shuffle(arr)
    return randomArr.slice(0, n)
}