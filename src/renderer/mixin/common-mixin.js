import { loopGeneratImg, videoScreenshot } from '../../api/api'
import { mapState, mapAction } from 'vuex'

const defaultBgImg = require('../assets/bg/dark/hDefault.jpg')
const errorBgImg = require('../assets/bg/dark/hDefault.jpg')

export default {
	computed: {
		...mapState('quickView', [
			'navArr'
		])
	},
	data() {
		return { defaultBgImg, errorBgImg }
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
			if (len > 0) {
				this.loadVideoData(nav['videoDirPath'], nav['imgDirPath'], callback)
			} else {
				callback && callback([])
			}
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
		}
	}
}