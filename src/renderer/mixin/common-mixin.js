import { loopGeneratImg, videoScreenshot } from '../../api/api'
import { extend } from '../util/index'
import { mapState, mapActions } from 'vuex'

const defaultBgImg = require('../assets/bg/dark/hDefault.jpg')
const errorBgImg = require('../assets/bg/dark/hDefault.jpg')
const homeErrorBgImg = require('../assets/bg/DefaultImage/Assets/Dark/Scale-200/home_item_default_cover.png')

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
		/*
         * 数据视频资源路径和图片资源路径获取数据
		*/
		loadVideoData(videoDirPath, imgDirPath, callback) {
			loopGeneratImg({
				videoResourcePath: videoDirPath,
				genImgResourcePath: imgDirPath,
				num: 0,
				delayRequest: 1000,
				imgTimeout: 1000,
				imgExtName: '.png'
			}).then((data) => {
				callback && callback(data)
				this.arrMedia = data
			})
		},
		/*
         * 根据导航随机获取视频数据
		*/
		getRandomVideoData(callback) {
			let len = this.navArr.length
			if (len > 0) {
				let nav = this.navArr[Math.floor(Math.random() * len)]
				this.loadVideoData(nav['videoDirPath'], nav['imgDirPath'], callback)
			} else {
				callback && callback([])
			}
		},
		/*
         * 根据导航tag获取视频数据
		*/
		getVideoDataByTag(tagName, callback) {
			let nav = this.navArr.find(nav => nav.tag === tagName)
			if (nav) {
				this.loadVideoData(nav['videoDirPath'], nav['imgDirPath'], callback)
			} else {
				callback && callback([])
			}
		},
		getVideoDataByTagPromise(tagName) {
			return new Promise((resolve, reject) => {
				this.getVideoDataByTag(tagName, (data) => {
					return resolve(data)
				})
			})
		},
		/*
         * 播放视频
         * media { Object } Object: { videoUrl, videoPoster } 必须包含这2个属性
		*/
		playVideo(media) {
			this.$root.$emit('window-bar-show-back-arrow', true)
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