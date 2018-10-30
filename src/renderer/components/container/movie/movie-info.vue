<template>
	<div class="info">
		<header>
			<div 
			    class="title" 
			    @click="openFileDir(movieInfo['genImgPath'])"
			>
		        {{ movieInfo['filename'] || '电影' }}
		    </div>

			<div class="operation">
				<span @click="fastScreenshot">
					<i class="magnet"></i>
					截图
				</span>

				<span ref="syncLookDom" @click="showQrcode">
					<i class="sync-see"></i>
					同步看
				</span>

				<span @click="forcePlay">
					<i class="force-play"></i>
					播放
				</span>

				<span @click="collection">
					<i :class="[isCollection === false ? 'cancel-collection' : 'collection']"></i>
					收藏
				</span>

				<span @click="openFileDir(movieInfo['name'])">
					<i class="down"></i>
					目录
				</span>

				<div id="qrcode" :style="qrcodeStyle"></div>
			</div>
		</header>
		<main>
			<div class="summary">
				<p v-for="(val, key) in movieInfo">
					{{ key }}: {{ val }}
				</p>
			</div>
			<div class="information">
				<p class="information-title">{{ movieInfo['filename'] || '电影' }}</p>
				<p class="information-hot">热度: 3456</p>
				<p class="information-act">主演: 刘德华 徐冬冬 郑则仕 汤镇业 黄日华</p>
				<p class="information-show">上映: 2017-09-30</p>
			</div>
		</main>
	</div>
</template>

<script>
	const { shell } = require('electron')
	import CommonMixin from '@/mixin/common-mixin'
	import { getMobileUrl } from '../../../../shared/util'
	import QRCode from '../../../../shared/qrcode'

	export default {
		name: 'MovieInfo',
		mixins: [ CommonMixin ],
		props: {
			movieInfo: {
				type: Object,
				default: function() { return {} }
			}
		},
		data() {
			return {
				qrcodeStyle: {
					'left': '0px',
					'top': '0px',
					'display': 'none'
				},
				isCollection: false
			}
		},
		methods: {
			openFileDir(path) {
				shell.showItemInFolder(path)
			},
			fastScreenshot() {
                this.screenshot({
                	videoUrl: this.movieInfo['videoUrl'], 
                	imgPath: this.movieInfo['genImgPath'], 
                	timePoint: this.$parent.getCurPlayTime()
                }).then((path) => {
                	this.openFileDir(path)
                }).catch((e) => {
                	console.error('快速截图异常: ', e)
                	alert('快速截图异常', e)
                })
			},
			forcePlay() {
				shell.openItem(this.movieInfo['name'])
			},
			showQrcode(evt) {
				if (evt.target.nodeName === 'I') {
					this.setQrcodeStyle(evt.target, () => {
						this.makeCode()
					})
				}
			},
			setQrcodeStyle(dom, callback) {
				if (this.qrcodeStyle['display'] === 'none') {
					this.qrcodeStyle = {
						'left': dom.offsetLeft + 15 + 'px',
						'top': dom.offsetTop + 50 + 'px',
						'display': 'block'
					}
				} else {
					this.qrcodeStyle = {
						'left': '0px',
						'top': '0px',
						'display': 'none'
					}
				}
				this.$nextTick(callback)
			},
			makeCode() {
				if (!this.qrcode) {
					this.qrcode = new QRCode(document.getElementById('qrcode'), {
						text: this.movieInfo['videoUrl'],
						width: 120,
						height: 120,
						colorDark : '#000000',
						colorLight : '#ffffff',
						correctLevel : QRCode.CorrectLevel.L
					})
				} else {
					this.qrcode.clear()
					this.qrcode.makeCode(this.movieInfo['videoUrl'])
				}
			},
			collection() {
                this.isCollection = !this.isCollection
                this.operateVideo(this.movieInfo, this.isCollection)
            },
            updateCollectUi(media) {
            	this.isCollection = this.videoIsInCollect(media)
            }
		},
		mounted() {
            this.qrcode = null

            this.$watch('videoCollection', () => {
            	this.updateCollectUi(this.movieInfo)
            }, {
                immediate: true
            })
		}
	}
</script>

<style scoped>
	/* 电影信息 样式 */
	.info {
		flex: none;
		display: flex;
		flex-direction: column;
		padding: 10px 24px 10px 24px;
		position: relative;
	}

	header {
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	/* 标题 样式 */
	.title {
		font-size: 16px;
		color: #fff;
	}

	/* 操作样式 样式 */
	.operation {
		display: flex;
		position: relative;
	}

	.operation>span {
		width: 38px;
		height: 42px;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 10px;
		color: #fff;
		font-size: 10px;
		border: .5px solid transparent;
		position: relative;
	}

	#qrcode {
		width: 130px;
		height: 130px;
		display: none;
		position: absolute;
		transition: all .35s;
		background-color: #fff;
		padding: 5px;
	}

	.operation>span:hover {
		border: .5px solid #ccc;
		cursor: pointer;
	}

	.operation i {
		display: block;
		width: 22px;
		height: 22px;
		margin-bottom: 6px;
		background-size: contain;
		background-repeat: no-repeat;
	}

	.operation .magnet{
		background-image: url(../../../assets/play-page/pin.scale-200.png);
	}

	.operation .sync-see {
		background-image: url(../../../assets/play-page/mobilsync.scale-200.png);
	}

	.operation .force-play{
		background-image: url(../../../assets/media-recommend/play_count.png);
	}

	.operation .cancel-collection{
		background-image: url(../../../assets/play-page/favor_normal.scale-200.png);
	}

	.operation .collection{
		background-image: url(../../../assets/play-page/favor_Indeterminate.scale-200.png);
	}

	.operation .down{
		background-image: url(../../../assets/play-page/download_normal.scale-200.png);
	}

	main {
		display: flex;
	}

	/* 电影介绍 样式 */
	.summary {
		width: 100%;
		padding-right: 20px;
		/*text-indent: 25px;*/
		overflow: hidden;
	    user-select: text;
	}

	.summary p {
		color: currentColor;
		word-wrap: break-word;
	}

	/* 电影信息 样式 */
	.information {
		width: 30%;
		flex: none;
	}

	.summary,
	.information p {
		font-size: 13px;
		line-height: 1.8em;
		color: rgba(255,255,255, .9);
	}
</style>