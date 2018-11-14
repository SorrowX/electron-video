<template>
	<div class="play">
		<video 
		    :src="videoUrl"
		    :poster="poster"
		    ref="videoDom"
		    controls="controls"
		    @loadedmetadata="loadedmetadataHandler"
		>
		</video>
	</div>
</template>

<script>
    import { mapActions } from 'vuex'
    import { extend } from '../../../util/index'

	export default {
		name: 'MoviePlay',
		props: {
			videoUrl: {
				type: String,
				default: ''
			},
			poster: {
				type: String,
				default: ''
			},
			movieInfo: {
				type: Object,
				default: function() { return {} }
			}
		},
		methods: {
			play() {
				this.$nextTick(() => {
					let video =  this.$refs.videoDom
	                video.play().catch((e) => {
	                	alert('播放失败！')
	                })
				})
			},
			stop() {
				this.$refs.videoDom.pause()
			},
			getCurrentPlayTime() {
				return this.$refs.videoDom.currentTime
			},
			getVideoInfo() {
				return {
					curTime: this.$refs.videoDom.currentTime,
					duration: this.$refs.videoDom.duration
				}
			},
			setVideoPlayTime(second) {
				this.currentTime = second
			},
			addOneVideoRecord(media) {
				media = extend({}, media) || extend({}, this.movieInfo)
				media['videoInfo'] = this.getVideoInfo()
				this.addVideoRecord(media)
			},
			loadedmetadataHandler() {
            	if (this.currentTime !== 0) {
                	this.$refs.videoDom.currentTime = this.currentTime
            	}
			},
			...mapActions(['addVideoRecord'])
		},
		created() {
			this.currentTime = 0
		}
	}
</script>

<style scoped>
	/* 电影播放 样式 */
	.play {
		height: 60.4%;
		flex: none;
		position: sticky;
		top: 0;
		background-color: black;
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.play>video {
		width: 100%;
		height: 100%;
	}

	.play>video::-webkit-media-controls-panel {
		background-color: rgba(27,34,38, .8);
	}

	.play>video::-webkit-media-controls-current-time-display,
	.play>video::-webkit-media-controls-time-remaining-display {
		color: rgba(255,255,255, .9);
	}
</style>