<template>
	<div class="play">
		<video 
		    :src="videoUrl"
		    :poster="poster"
		    ref="videoDom"
		    controls="controls"
		>
		</video>
	</div>
</template>

<script>
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
			}
		},
		methods: {
			play() {
				this.$nextTick(() => {
	                this.$refs.videoDom.play()
				})
			},
			getCurrentPlayTime() {
				return this.$refs.videoDom.currentTime
			}
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