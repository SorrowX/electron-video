import { getResource, screenshot, loopGeneratPicture } from '../file-server/api.js'

/**
 * 根据指定绝对路径文件夹,找出该文件夹下所有.mp4和.jpg文件,并返回
 * @param 
 *    folderPath: { String } 资源文件夹绝对路径
 * @return
 *    promise
 *        resolve res: { Array } 返回数组对象 [{ directory: 是否是文件夹, filename: 文件名, name:文件具体路径, url: 本地服务器文件地址, dir: 当前文件的目录 }]
 * @use
 *    getResource('D:\\迅雷下载').then((data) => { console.log(data) })
*/
export function getLocalResource(folderPath) {
	return getResource(folderPath)
}

/**
 * 根据指定的视频地址,随机生成视频一帧的图片,该图片会生成到指定的路径
 * @param 
 *    options.videoUrl: { String } 视频资源
 *    options.timePoint: { Number } 视频的第几帧 单位是秒
 *    options.imgPath: { String } 要生成的图片具体路径
 * @return
 *    promise 
 *        resolve imgPath: { 生成好的图片地址 }
 *        reject error实例
 * @use
 *    screenshot({
			videoUrl: 'url',
			imgPath: 'imgPath'
      }).then((ret) => { console.log(ret) }).catch((e) => { console.log(e) })
*/
export function videoScreenshot(options) {
	return screenshot(options)
}

export function loopGeneratImg(options) {
    return loopGeneratPicture(options)
}