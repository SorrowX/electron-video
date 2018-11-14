import fu from './fu'
import { encode } from './util'
import VideoScreenshot from './video-screenshot'

/**
 * 根据指定绝对路径文件夹,找出该文件夹下所有.mp4和.jpg文件,并返回
 * @param 
 *    folderPath: { String } 资源文件夹绝对路径
 *    match: { Function } 资源文件筛选
 * @return
 *    promise
 *        resolve res: { Array } 返回数组对象 [{ directory: 是否是文件夹, filename: 文件名, name:文件具体路径, url: 本地服务器文件地址, dir: 当前文件的目录 }]
 * @use
 *    getResource('D:\\迅雷下载').then((data) => { console.log(data) })
*/
export function getResource(folderPath, match) {
	match = match || function(item) {
		return item.name.match(/\.mp4$|\.jpg$/i)
	}
	return new Promise((resolve, reject) => {
		let res = []
		let options = {
		    sync: false,
		    matchFunction: match
		}
		let onComplete = function() {
		    resolve(res)
		}
		fu.each(folderPath, function(item) {
			if (item.directory === false) {
				item.videoUrl = encode(item.name)
			}
		    res.push(item)
		}, options, onComplete)
	})
}

/**
 * 根据指定的视频地址,随机生成视频一帧的图片,该图片会生成到指定的路径
 * @param 
 *    options.videoUrl: { String } 视频资源
 *    options.timePoint: { Number } 视频的第几帧 单位是秒
 *    options.imgPath: { String } 要生成的图片具体路径
 *    options.timeout: { Number } 毫秒数 超过生成图片的时间将会终止
 * @return
 *    promise 
 *        resolve imgPath: { 生成好的图片地址 }
 *        reject error实例
 * @use
 *      screenshot({
			videoUrl: 'url',
			imgPath: 'imgPath'
        }).then((ret) => { console.log(ret) }).catch((e) => { console.log(e) })
*/
export function screenshot(options) {
	let { videoUrl, imgPath, timePoint, timeout = 1000 * 3 } = options

	let videoScreenshotInstance = null

	return Promise.race([
		new Promise(function(resolve, reject) {
			setTimeout(() => {
				videoScreenshotInstance.destroy()
				videoScreenshotInstance = null
				reject(new Error('generate img timeout!'))
			}, timeout)
		}),
		new Promise((resolve, reject) => {
			videoScreenshotInstance = new VideoScreenshot({
				url: videoUrl,
				timePoint: timePoint,
				callback(res) {
					if (res.code === 0) {
						VideoScreenshot.fileOrBlobToDataURL(res.thumb, (data) => {
							let base64 = data.replace(/^data:image\/\w+;base64,/, '')
							let dataBuffer = new Buffer(base64, 'base64')
							if (!fu.exist(imgPath)) {
								fu.touch(imgPath)
							}
							fu.write(imgPath, dataBuffer)
							return resolve(imgPath)
						})
					} else {
						return reject(new Error(res))
					}
				}
			})
		})
	])
}

const cache = {}
async function getFileResource(folderPath, direct) {
	if (!direct && cache[folderPath]) {
		return Promise.resolve(cache[folderPath])
	} else {
		let resource = await getResource(folderPath, function(item) {
			return item.name.match(/\.mp4$/i)
		})
		cache[folderPath] = resource
		return Promise.resolve(resource)
	}
}
/**
 * 根据指定的视频文件夹和图片路径文件夹,生成所有视频的一帧图片
 * @param 
 *    options.num: { Number } 一次获取几个资源 (0比较特殊会返回全部数据)
 *    options.videoResourcePath: { String } 视频资源文件夹路径
 *    options.genImgResourcePath: { String } 生成的图片 存放的路径
 *    options.forceUpdate: { Boolean } 是否强制生成图片 如果存在图片的情况下
 *    options.errorImgPath: { String } 没有生成图片的情况下使用 该图片
 *    options.imgTimeout: { Number } 生成每个图片的超时时间
 *    options.imgExtName: { String } 生成每个图片的后缀名
 *    options.existImg: { Array } 按照给出的图片后缀寻找该图片是否存在本地文件中
 * @return
 *    promise 
 *        resolve imgPath: { 生成好的图片地址 }
 *        reject error实例
 * @use
 *      loopGeneratPicture({
			videoResourcePath: 'D:\\迅雷',
			genImgResourcePath: 'D:\\迅雷\\img',
			num: 10
        }).then((data) => { console.log(data) }).catch((e) => { console.log(e) })
*/
export async function loopGeneratPicture(options) {
	console.log('执行loopGeneratPicture方法')
	console.log('--------------------------')
	let {
		num = 0,
		videoResourcePath,
		genImgResourcePath,
		errorImgPath = '',
		imgTimeout = 3 * 1000,
		imgExtName = '.png',
		existImg = ['.png', '.jpg'],
		forceUpdate = false,
		callback = function() {}
	} = options

	await getFileResource(videoResourcePath, true) // 获取视频资源且放入缓存中
	let resource = cache[videoResourcePath]

	let ret
	if (resource.length <= num || num === 0) {
		ret = resource
	} else {
		ret = resource.splice(0, num)
	}

	let i = 0, len = ret.length
	let successNum = 0, 
	    failNum = 0, 
	    totalNum = len,
	    speedProgress = 0,
	    imgPath

	for (; i < len; i++) {
		try {
		    imgPath = genImgResourcePath + '/' + ret[i]['filename'] + imgExtName
			let imgPathArr = getImgPath(genImgResourcePath, ret[i]['filename'])
			let genImgPath, existRet

			if (forceUpdate) {
				try {
					genImgPath = await screenshot({
						videoUrl: ret[i]['name'],
						imgPath: imgPath,
						timeout: imgTimeout
					})
				} catch(e) {
					handlerError(ret[i], e)
					continue
				}
			} else {
				existRet = imgPathIsExist(imgPathArr)
				if (existRet['isExist']) {
					genImgPath = existRet['path']
				} else {
					try {
						genImgPath = await screenshot({
							videoUrl: ret[i]['name'],
							imgPath: imgPath,
							timeout: imgTimeout
						})
					} catch(e) {
						handlerError(ret[i], e)
						continue
					}
				}
			}
			
			ret[i]['genImgPath'] = genImgPath
			ret[i]['imgUrl'] = encode(genImgPath)
			++successNum
			speedProgress = Math.ceil((successNum + failNum)/totalNum * 100)
			callback({ state: 'success', successNum, failNum, totalNum, speedProgress, fileData: ret[i] })
		} catch(e) {
			handlerError(ret[i], e)
		}
	}
	ret.successNum = successNum
	ret.failNum = failNum
	ret.totalNum = totalNum
	return ret

	function handlerError(retItem, err) {
		if (!fu.exist(imgPath)) {
			fu.touch(imgPath)
		}
		if (errorImgPath) {
			 fu.copy(errorImgPath, imgPath)
		}
		retItem['genImgPath'] = imgPath
		retItem['imgUrl'] = encode(imgPath)
		++failNum
		speedProgress = Math.ceil((successNum + failNum)/totalNum * 100)
		callback({ state: 'fail', successNum, failNum, totalNum, speedProgress, fileData: retItem })
		console.error(`[loopGeneratPicture function]: 视频${retItem['filename']}生成图片失败,视频地址: ${retItem['videoUrl']}`, err)
	}

	function getImgPath(genImgResourcePath, filename) {
		let imgPathArr = []
		imgPathArr = existImg.map((extName) => {
			return genImgResourcePath + '/' + filename + extName
		})
		return imgPathArr
	}

	function imgPathIsExist(imgPathArr) {
		let exitPath = ''
		let ret = imgPathArr.every((imgPath) => {
			if (fu.exist(imgPath)) {
				exitPath = imgPath
			}
			return fu.exist(imgPath) == false
		})
		return {
			isExist: (ret === true ? false : true),
			path: exitPath
		}
	}
}
