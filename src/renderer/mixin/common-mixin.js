import { extend } from '../util/index'
import { mapState, mapActions } from 'vuex'
import { loopGeneratImg, videoScreenshot } from '../../api/api'
import { WINDOW_BAR_SHOW_BACK_ARROW_MESSAGE } from '@/constant/index'
import { INSIDE_SWITCH_NAV_MESSAGE } from '@/constant/index'

const defaultBgImg = require('../assets/bg/dark/hDefault.jpg')
const errorBgImg = require('../assets/bg/dark/hDefault.jpg')
const homeErrorBgImg = require('../assets/bg/DefaultImage/Assets/Dark/Scale-200/home_item_default_cover.png')

let videoCache = {} // 视频缓存

export default {
	computed: {
		...mapState([
			'videoCollection',
			'videoRecord'
		]),
		...mapState('quickView', [
			'navArr'
		])
	},
	data() {
		return { 
			defaultBgImg, 
			errorBgImg, 
			homeErrorBgImg
		}
	},
	methods: {
		async searchResourcesByKey(key) {
			key = key.trim()
			let ret = {
				navRet: [],
				keyRet: [],
				result: null
			}
			// 1. 根据key先获取导航中的数据列表
			if (this.navArr.indexOf(key) !== -1) {
				ret.navRet = await this.getVideoDataByTagPromise(key)
			}
			// 2. 根据key获取videoCache缓存中的数据
			let arrKey = Object.keys(videoCache),
			    i = 0,
			    len = arrKey.length
			for (; i < len; i++) {
				let arrData = videoCache[arrKey[i]]
				arrData.forEach((obj, index) => {
					if (obj.filename.indexOf(key) !== -1) {
						if (index === 1 && !ret.result) {
							ret.result = obj
						} else {
							ret.keyRet.push(obj)
						}
					}
				})
			}
			return ret
		},
		/*
         * 根据左侧导航名内部切换对应的组件
         * @params
         * navName { String } Home|Channel|Subscribe|Record|Collection|QuickView|Vip|PersonalCenter|HelpFeedback|SetUp
		*/
		insideSwitchNav(navName) {
			this.$root.$emit(INSIDE_SWITCH_NAV_MESSAGE, navName)
		},
		/*
         * 数据视频资源路径和图片资源路径获取数据
         * @params
         *  options: {
	     *     videoDirPath: '视频目录地址'，
	     *     imgDirPath: '图片目录地址'，
	     *     callback: '获取完数据的回调'，
	     *     processCb: '获取每个数据的回调(含有进度条)',
	     *     direct: Boolean 是否直接从文件夹中获取还是videoCache缓存中获取(默认 false 从缓存中获取)
         *  }
		*/
		loadVideoData(options) {
			let { 
				videoDirPath, 
				imgDirPath, 
				callback = function() {}, 
				processCb = function() {}, 
				direct = false 
			} = options
			if (direct) {
				loopGeneratImg({
					videoResourcePath: videoDirPath,
					genImgResourcePath: imgDirPath,
					num: 0,
					imgTimeout: 5000,
					imgExtName: '.jpg',
					callback: processCb
				}).then((data) => {
					videoCache[videoDirPath] = data
					callback && callback(data || [])
				})
			} else {
				if (videoCache[videoDirPath]) {
					callback && callback(videoCache[videoDirPath] || [])
				} else {
					loopGeneratImg({
						videoResourcePath: videoDirPath,
						genImgResourcePath: imgDirPath,
						num: 0,
						imgTimeout: 5000,
						imgExtName: '.jpg',
						callback: processCb
					}).then((data) => {
						videoCache[videoDirPath] = data
						callback && callback(data || [])
					})
				}
			}
		},
		/*
         * 根据导航随机获取视频数据
         * @params
         *   callback: 拿到数据后的回调
         *   direct： false表示从缓存中获取
		*/
		getRandomVideoData(callback, direct) {
			let len = this.navArr.length
			if (len > 0) {
				let nav = this.navArr[Math.floor(Math.random() * len)]
				this.loadVideoData({
					videoDirPath: nav['videoDirPath'],
					imgDirPath: nav['imgDirPath'],
					callback,
					direct
				})
			} else {
				callback && callback([])
			}
		},
		/*
         * 根据导航获取视频数据
         * @params
         *   options: {
	     *      nav: [Object|String] 导航对象或者导航tag名  
	     *      callback: '获取完数据的回调'，
	     *      processCb: '获取每个数据的回调(含有进度条)',
	     *      direct: Boolean 是否直接从文件夹中获取还是videoCache缓存中获取
         *   }
		*/
		loadDataByNav(options) {
			let { nav, callback, processCb, direct } = options
			let navObj
			if (typeof nav == 'string') {
				navObj = this.navArr.find(o => o.tag === nav)
			} else {
				navObj = nav
			}

			this.loadVideoData({
				videoDirPath: navObj['videoDirPath'], 
				imgDirPath: navObj['imgDirPath'],
				callback,
				processCb,
				direct
			})
		},
		/*
         * 根据导航tag获取视频数据
		*/
		getVideoDataByTagPromise(tagName) {
			return new Promise((resolve, reject) => {
				this.loadDataByNav({
					nav: tagName, 
					callback: (data) => {
						return resolve(data)
					}
				})
			})
		},
		/*
         * 播放视频
         * media { Object } Object: { videoUrl, videoPoster } 必须包含这2个属性
		*/
		playVideo(media) {
			this.$root.$emit(WINDOW_BAR_SHOW_BACK_ARROW_MESSAGE, true)
			let movieComponent = this.$root.appMovieComponent
			movieComponent.play(media)
		},
		/*
         * 视频截图
         * options { Object } Object: { videoUrl, imgPath, timePoint }
		*/
		screenshot(options) {
			return videoScreenshot(options)
		},
		/*
         * 操作视频(收藏还是取消收藏)
         * meida { Object }
         * type { Boolean } true: 收藏; false: 取消收藏
		*/
		operateVideo(meida, type) {
			if (type === true) {
				this.collectVideo(meida)
			} else {
				this.cancelCollectVideo(meida)
			}
		},
		/*
         * 视频是否在收藏中
         * media { Object }
         * return Boolean false: 不在 true:在
		*/
		videoIsInCollect(media) {
            let i = this.videoCollection.findIndex((video) => {
            	return video.filename === media.filename
            })
            return i === -1 ? false : true
		},
		/*
         * 处理图片加载情况
		*/
		handleImgSuccess(el) {
			el.classList.add('img-success')
		},
		handleImgError(el) {
			el.src = this.errorBgImg
		},
		/*
         * 随机生成视频时间(ui好看点)
		*/
		getRandomNumber() {
			let arr = [0,1,2,3,4,5,6,7,8,9]
			return Math.floor(Math.random() * arr.length)
		},
		getTime() {
			return `${this.getRandomNumber()}${this.getRandomNumber()}:${this.getRandomNumber()}${this.getRandomNumber()}`
		},
		...mapActions([
			'collectVideo', 
			'cancelCollectVideo', 
			'deleteVideoRecordByKey'
		])
	}
}