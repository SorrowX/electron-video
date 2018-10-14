const CODES = {
	0: 'success',
	1: 'The url is not valid',
	2: 'onerror',
	3: 'No Access-Control-Allow-Origin'
}

const noop = function(res) { console.log(res) }

class VideoScreenshot {

	/**
	 * constructor
	 * @param options.url 音频|视频URL
	 * @param options.timePoint Number 秒 视频第几帧
	 * @param options.imgQuality Number 图片质量 取值范围为0到1
	 * @param options.callback 回调函数
	 */
	constructor(options) {
		this.timePoint = options && options.timePoint
		this.imgQuality = options && options.imgQuality || 1 
		this.callback = options && options.callback || noop
		this.url = options && options.url

		this._count = 0

		if (!this.url) {
			this.callback({ code: 1, msg: CODES[1] })
			return
		}

		this._setCurrentTime = false // 设置视频多少秒的时候会触发 canplaythrough事件,所以需要控制

		this.init(options)
	}

	init(options) {
		// 创建media
		let mediaType = 'video'
		this.media = document.createElement(mediaType)
		this.media.crossOrigin = 'anonymous'
		this.media.setAttribute('src', options.url)

		// 事件监听
		this.media.oncanplaythrough = (evt) => {
			if (this._setCurrentTime) {
				this.screenshot()
			}

			if (!this._setCurrentTime) {
				this._setCurrentTime = true
				this.media.currentTime = this.getFrame(this.timePoint) // 设置视频时间会触发canplaythrough事件
			}
		}

		this.media.onerror = (evt) => {
			this.callback({ code: 2, msg: CODES[2], data: evt })
		}
	}

	/**
	 * 随机截取视频中的一帧图片,如果用户指定 timePoint 属性,则优先使用用户指定的数值
	 */
	getFrame(timePoint) {
		if (timePoint) {
			return timePoint >= this.media.duration ? this.media.duration : timePoint
		} else {
			return this.genRandomNum(5, this.media.duration)
		}
	}

	/**
	 * 获取一个随机数
	 */
	genRandomNum(minNum, maxNum) {
	    let randomNum = Math.floor((Math.random() * maxNum))
	    return (randomNum - minNum > 0) ? randomNum : minNum
	}

	/**
	 * 获取视频图片数据
	 */
	screenshot() {
		// 创建 canvas
		let canvas = document.createElement('canvas')
		canvas.width = this.media.videoWidth
		canvas.height = this.media.videoHeight
		let ctx = canvas.getContext('2d')
		// 截取
		ctx.drawImage(this.media, 0, 0)

		let thumb = null
		// 非跨域资源 非同域资源无法获取数据
		try {
			let type = 'image/png'
			let data = canvas.toDataURL(type, this.imgQuality)
			thumb = VideoScreenshot.toBlobData(data, type)
		} catch (e) {
			this.callback({ code: 3, msg: CODES[3], thumb: thumb, media: this.media, canvas: canvas })
		}

		this.callback({ code: 0, msg: CODES[0], thumb: thumb, media: this.media, canvas: canvas })
	}

	destroy() {
		this.media.oncanplaythrough = null
		this.media.onerror = null
		this.media = null
	}

	/**
	 * canvas数据转换成blob数据
	 * @param data { Object } canvas 数据
	 * @param type { String } 'image/png'
	 */
	static toBlobData(data, type) {
		// 获取base64数据
		// base64数据格式:
		// "data:image/jpegbase64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAkGB+wgHBgkIBwgKCgkLDRYPDQw//9k="
		data = window.atob(data.split(',')[1])

		let ia = new Uint8Array(data.length)
		for (let i = 0; i < data.length; i++) {
			ia[i] = data.charCodeAt(i)
		}

		// canvas.toDataURL 返回的默认格式是 image/png
		return new Blob([ia], { type: type })
	}

    /**
	 * File/Blob对象 转 DataURL
	 * @param data { Blob对象数据 }
	 * @param callback
	 */
	static fileOrBlobToDataURL(data, callback){
		var fr = new FileReader()
		fr.readAsDataURL(data)
		fr.onload = function (evt){
			callback(evt.target.result)
		}
	}

    /**
	 * 事件监听
	 * @param evtName EventName
	 * @param callback
	 */
	listener(evtName, callback) {
		this.media.addEventListener(evtName, (evt) => {
			callback && callback(evt)
		}, false)
	}
}

export default VideoScreenshot