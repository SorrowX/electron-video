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
    devScaleFactor = devScaleFactor || config['developScaleFactor']
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

export function extend (to, from) {
    for (const key in from) {
        to[key] = from[key]
    }
    return to
}