<template>
	<div class="together-look-video-panel" ref="videoPanel">
		<div class="panel">
			<div class="row" v-for="(arr, index) in renderArr" ref="rows">
				<div v-for="(media, idx) in arr">
					<!-- <video :src="media['name']" :poster="media['genImgPath']" ref="videos"></video> -->
					{{ media }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'TogetherLookVideoPanel',
		props: {
			rows: {
				type: Number,
				default: 2
			},
			rowNum: {
				type: Number,
				default: 3
			},
			mediaArr: {
				type: Array,
				default: function() { return [1,2,3,4,5,6,7,8,9,10] }
			}
		},
		data() {
			return {
			}
		},
		watch: {
			mediaArr() {
				this.$nextTick(() => {
					this.setRowHeight()
				})
			}
		},
		computed: {
			renderArr() {
				this._rows = 0 // 实际的行数
				let mediaArr = this.mediaArr,
				    arr = [],
				    len = this.rows
				while (len) {
					let data = mediaArr.splice(0, this.rowNum)
					data.length > 0 ? (this._rows++) : ''
					arr.push(data)
					len -= 1
				}
				// console.log('數據： ', arr)
				return arr
			}
		},
		methods: {
			setRowHeight() { // 计算行的高度和行内元素的宽度
				let dom = this.$refs.videoPanel,
				    rawsDom = this.$refs.rows
				let height = parseInt(dom.offsetHeight)
				rawsDom && rawsDom.forEach((raw) => {
					raw.style.height = (100 / this._rows) + '%'
					raw.children && [...raw.children].forEach((dom) => {
						dom.style.width = (100 / this.rowNum) + '%'
					})
				})
			},
			togetherPlay() {
				this.$refs.videos.forEach((video, i) => {
					if (video.pause) {
						video.play()
					} else {
						video.pause()
					}
				})
			}
		},
		mounted() {
			// this.setRowHeight()
		}
	}
</script>

<style scoped>
	.together-look-video-panel,
	.panel {
		width: 100%;
		height: 100%;
	}

	.row {
		display: flex;
	}
	.row>div {
		/*flex: 1;*/
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		/*border: 1px solid red;*/
	}
	.row>div>video {
		width: 100%;
	}
</style>