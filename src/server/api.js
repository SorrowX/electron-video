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
		return item.name.match(/\.mp4|.jpg$/i)
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
async function getFileResource(folderPath) {
	if (cache[folderPath]) {
		return Promise.resolve(cache[folderPath])
	} else {
		let resource = await getResource(folderPath, function(item) {
			return item.name.match(/\.mp4$/i)
		})
		cache[folderPath] = resource
		return Promise.resolve(resource)
	}
}
async function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(() => {
			return resolve()
		}, ms || 1000)
	})
}

/**
 * 根据指定的视频文件夹和图片路径文件夹,生成所有视频的一帧图片
 * @param 
 *    options.num: { Number } 一次获取几个资源
 *    options.videoResourcePath: { String } 视频资源文件夹路径
 *    options.genImgResourcePath: { String } 生成的图片 存放的路径
 *    options.forceUpdate: { Boolean } 是否强制生成图片 如果存在图片的情况下
 *    options.errorImgPath: { String } 没有生成图片的情况下使用 该图片
 *    options.imgTimeout: { Number } 生成每个图片的超时时间
 *    options.imgExtName: { String } 生成每个图片的后缀名
 *    options.delayRequest: { Number } 当前视频生成完毕后, 等待多长时间 操作下一个视频(单位毫秒 该选项主要是为了缓解服务器压力)
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
	let {
		num = 10000,
		videoResourcePath,
		genImgResourcePath,
		forceUpdate = false,
		errorImgPath = '',
		imgTimeout = 3 * 1000,
		delayRequest = 1 * 1000,
		imgExtName = '.png',
		callback = function() {}
	} = options
	
	await getFileResource(videoResourcePath) // 获取视频资源且放入缓存中
	let resource = cache[videoResourcePath]

	let handleResourceArr
	if (resource.length <= num) {
		handleResourceArr = resource
	} else {
		handleResourceArr = resource.splice(0, num)
	}

	let i = 0, len = handleResourceArr.length
	let successNum = 0, failNum = 0, totalNum = len
	for (; i < len; i++) {
		try {
			let imgPath = genImgResourcePath + '/' + handleResourceArr[i]['filename'] + imgExtName
			let genImgPath
			if (forceUpdate || !fu.exist(imgPath)) {
				genImgPath = await screenshot({
					videoUrl: handleResourceArr[i]['videoUrl'],
					imgPath: imgPath,
					timeout: imgTimeout
				})
				await sleep(delayRequest) // 延迟1s, 缓解服务器压力
			} else {
				genImgPath = imgPath
			}
			handleResourceArr[i]['genImgPath'] = genImgPath
			handleResourceArr[i]['imgUrl'] = encode(genImgPath)
			++successNum
			callback({ state: 'success', successNum, failNum, totalNum, fileData: handleResourceArr[i] })
		} catch(e) {
			handleResourceArr[i]['genImgPath'] = errorImgPath
			handleResourceArr[i]['imgUrl'] = encode(errorImgPath)
			++failNum
			callback({ state: 'fail', successNum, failNum, totalNum, fileData: handleResourceArr[i] })
			console.error(`视频${handleResourceArr[i]['filename']}生成图片失败,视频地址: ${handleResourceArr[i]['videoUrl']}`, e)
		}
	}
	handleResourceArr.successNum = successNum
	handleResourceArr.failNum = failNum
	handleResourceArr.totalNum = totalNum
	return handleResourceArr
}

/*setTimeout(() => {
	loopGeneratPicture({
		videoResourcePath: 'D:\\迅雷',
		genImgResourcePath: 'D:\\迅雷\\img',
		num: 10
	}).then((data) => {
		console.log('hi', data)
	})

    let p = `D:\\迅雷\\img\\${Math.random()}.jpg`
	screenshot({
		videoUrl: 'http://192.168.130.164:9420/D:%5C%E8%BF%85%E9%9B%B7%E4%B8%8B%E8%BD%BD%5C%E5%AE%88%E6%9C%9B%E8%80%85BD%E4%B8%AD%E8%8B%B1%E5%8F%8C%E5%AD%97%5B%E7%94%B5%E5%BD%B1%E5%A4%A9%E5%A0%82www.dy2018.com%5D.mp4',
		imgPath: p,
	}).then((ret) => {
		console.log('ret: ', ret)
	}).catch((e) => {
		console.log('e: ', e)
	})
}, 5000)*/
