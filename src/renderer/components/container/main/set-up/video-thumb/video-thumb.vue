<template>
	<div class="video-thumb-page">
		<div class="main" ref="mainDom">
			<div class="set-option">
				<div class="video-path">
					<input v-model.trim="videoResourcePath" placeholder="选择 视频资源文件夹的路径" type="text" readonly>
					<button @click="setPath('video')">浏览</button>
				</div>

				<div class="generate-image-path">
					<input v-model.trim="genImgResourcePath" placeholder="选择 图片生成后存放的文件夹路径" type="text" readonly>
					<button @click="setPath('generate-image')">浏览</button>
				</div>

				<div class="error-image-path">
					<input v-model.trim="errorImgPath" placeholder="选择 图片生成失败后的默认图片(可选)" type="text" readonly>
					<button @click="setErrorDefaultImgPath">浏览</button>
				</div>

				<div class="error-image-path">
					<input v-model.trim="imgExtName" placeholder="选择 图片后缀名(eg: .jpg)" type="text">
					<button>图片后缀</button>
				</div>

				<div class="image-num">
					<input v-model.number="num" placeholder="输入 每次生成图片的个数" type="number">
					<span>图片个数</span>
				</div>

				<div class="image-timeout">
					<input v-model.number="imgTimeout" placeholder="输入 每张图片的最长耗时时间" type="number">
					<span>图片耗时/ms</span>
				</div>

				<div class="image-force-update">
					<input type="checkbox" id="checkbox" v-model="forceUpdate">
					<label for="checkbox"> 是否强制生成</label>
				</div>

				<div class="generate">
					<button @click="genImg">开始生成图片</button>
				</div>

				<div class="generate-result" v-show="generateResultArr.length > 0">
					<div class="generate-result-title"> 生成情况报告 </div>
					<ul>
						<li v-for="(item, index) in generateResultArr">
						    <p>电影: {{ item['fileData']['filename'] }}<p>
						    <p>
						    	生成结果: 
						    	<span 
						    	    :class="item['state'] === 'fail' ? 'error-color' : ''"
						    	>
						            {{ item['state'] }}
						        </span>
						    </p>
						</li>
					</ul>
					<div class="generate-summary" v-show="genOver">
						<p>成功数量: {{ generateResult['successNum'] }}</p>
						<p>失败数量: {{ generateResult['failNum'] }}</p>
						<p>总共数量: {{ generateResult['totalNum'] }}</p>
						<button @click="openFolder('image')">打开图片目录</button>
						<button @click="openFolder('video')">打开视频目录</button>
						<button @click="genImg" v-show="generateResult['failNum'] > 0">继续生成图片</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { loopGeneratImg } from '../../../../../../api/api'

    const videoResourceTitle = '选择 视频资源文件夹的路径'
    const genImgResourceTitle = '选择 图片生成后存放的文件夹路径'
    const errorImgTitle = '选择 图片生成失败后的默认图片(可选)'

	export default {
		name: 'VideoThumb',
		data() {
			return {
				videoResourcePath: '',
				genImgResourcePath: '',
				errorImgPath: '',
				num: 10000,
				imgTimeout: 3 * 1000,
				forceUpdate: false,
				imgExtName: '.jpg',

				generateResultArr: [],
				generateResult: {},
				genOver: false,
				waiting: false
			}
		},
		methods: {
			genImg() {
				if (this.waiting) return
				this.genOver = !(this.waiting = true)
				this.generateResultArr = []

				let i, self = this
				let videoResourcePath = (i = this.videoResourcePath) && i[0]
				let genImgResourcePath = (i = this.genImgResourcePath) && i[0]
				let errorImgPath = this.errorImgPath[0]
				if (
					videoResourcePath == '' || 
					genImgResourcePath == ''
				) {
					alert('路径必须要填写')
					return
				}
				loopGeneratImg({
					videoResourcePath,
					genImgResourcePath,
					errorImgPath,
					num: this.num,
					imgTimeout: this.imgTimeout,
					forceUpdate: this.forceUpdate,
					imgExtName: this.imgExtName,
					callback(ret) {
						self.generateResultArr.push(ret)
						self.scrollButtom()
					}
				}).then((data) => {
					this.generateResult = data
					this.genOver = !(this.waiting = false)
					self.scrollButtom()
				})
			},
			setPath(type) {
				let title = videoResourceTitle, self = this
				type = type || 'video'
                if (type === 'generate-image') {
					title = genImgResourceTitle
                }
				const { dialog } = require('electron').remote
				dialog.showOpenDialog(
				    {
				        title,
				        properties: ['openDirectory', 'promptToCreate '],
				        filters: [
                            { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
					        { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] }
                        ]
				    },
				    function (filePath) {
				        if (type === 'video') {
				        	self.videoResourcePath = filePath
				        } else if (type === 'generate-image') {
				        	self.genImgResourcePath = filePath
				        }
				    }
				)
			},
			setErrorDefaultImgPath() {
				let self = this
				const { dialog } = require('electron').remote
				dialog.showOpenDialog(
				    {
				        title: errorImgTitle,
				        properties: ['openFile'],
				        filters: [
                            { name: 'Images', extensions: ['jpg', 'png', 'gif'] }
                        ]
				    },
				    function (filePath) {
						self.errorImgPath = filePath
				    }
				)
			},
			scrollButtom() {
				this.$nextTick(() => {
					let dom = this.$refs.mainDom
					dom.scrollTop = dom.scrollHeight
				})
			},
			openFolder(type) {
				const { shell } = require('electron')
				let i
				let videoResourcePath = (i = this.videoResourcePath) && i[0]
				let genImgResourcePath = (i = this.genImgResourcePath) && i[0]
				if (type === 'video') {
					shell.showItemInFolder(videoResourcePath)
				} else if (type === 'image') {
					shell.showItemInFolder(genImgResourcePath)
				}
			}
		}
	}
</script>

<style scoped>
	.video-thumb-page {
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.main {
		width: 50%;
		height: 60%;
		border: 1px solid rgba(187,188,189,.3);
		overflow: auto;
		position: relative;
	}

	.set-option {
		padding: 6% 10% 0 10%;
	}

	.set-option>div {
		margin-bottom: 5%;
	}

	/* 路径选择 样式 */
	.video-path,
	.generate-image-path,
	.error-image-path {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.video-path input,
	.generate-image-path input,
	.error-image-path input {
		width: 75%;
		height: 24px;
		padding-left: 2%;
		border: none;
		outline: none;
		font-size: 10px;
		color: #fff;
		background-color: rgba(187,188,189,.1);
	}

	.video-path button,
	.generate-image-path button,
	.error-image-path button {
		width: 20%;
		height: 24px;
		outline-color: rgba(187,188,189,1);
		border: none;
		font-size: 10px;
		border-radius: 3px;
		color: #ccc;
		background-color: rgba(76,174,80,.5);
	}

	/* 数值写入 样式 */
	.image-num,
	.image-delay-request,
	.image-timeout {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.image-num input,
	.image-delay-request input,
	.image-timeout input {
		width: 75%;
		height: 24px;
		padding-left: 2%;
		border: none;
		outline: none;
		font-size: 10px;
		color: #fff;
		background-color: rgba(187,188,189,.1);
	}

	.image-num span,
	.image-delay-request span,
	.image-timeout span {
		display: block;
		width: 20%;
		height: 24px;
		line-height: 24px;
		color: #ccc;
		text-align: center;
	}

	/* 是否强制生成 */
	.image-force-update {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.image-force-update input {
		appearance: none;
		display: block;
        width: 14px;
        height: 14px;
	}

	.image-force-update label {
       color: #ccc;
	}

	/* 生成 按钮 样式 */
	.generate {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.generate button {
		height: 24px;
		width: 55%;
		outline-color: rgba(187,188,189,1);
		border: none;
		font-size: 10px;
		border-radius: 3px;
		color: #ccc;
		background-color: rgba(76,174,80,.5);
	}

	/* 生成结果样式 */
	.generate-result {
		margin-top: 50px;
		user-select: text;
	}

	.generate-result-title {
		height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        color: #fff;
        letter-spacing: 8px;
	}

	.generate-result ul {

	}

	.generate-result ul li {
		padding: 0 2%;
		margin: 5% 0;
		border-bottom: 1px solid rgba(187,188,189,.3);
		color: #ccc;
		overflow: hidden;
	}

	.error-color {
		color: red;
	}

	.generate-summary p {
		font-size: 12px;
		color: #fff;
		letter-spacing: 2px;
		margin: 1% 0;
	}

	.generate-summary button {
		width: 25%;
		height: 24px;
		margin-top: 3%;
		margin-right: 5%;

		outline-color: rgba(187,188,189,1);
		border: none;
		font-size: 10px;
		border-radius: 3px;
		color: #ccc;
		background-color: rgba(76,174,80,.5);
	}

	/* 滚动条控制样式 */
	.main::-webkit-scrollbar {
		width: 3px;
		height: 4px;
	}

	.main::-webkit-scrollbar-track {
	    background-color: var(--common-header-bg-color);
	    border-radius: 10px;
	}

	.main::-webkit-scrollbar-thumb {
	    background-color: #434648;
	    border-radius: 10px;
	}
</style>