<template>
	<div class="video-player">
		<video 
		    :src="videoSrc"
		    :poster="poster"
		    width="100%" 
		    height="100%" 
		    controls="controls"
		    ref="videoDom"
		>
		</video>
		<div class="info">
			<p>{{ name }}</p>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'VideoPlayer',
		data() {
			return {
				videoSrc: '',
				poster: '',
				name: ''
			}
		},
		methods: {
			setData(videoInfo) {
				this.videoSrc = videoInfo.videoUrl
				this.poster = videoInfo.imgUrl
				this.name = videoInfo.filename
			}
		},
		deactivated() {
			let dom = this.$refs.deactivated
			dom && dom.stop()
		}
	}
</script>

<style scoped>
	.video-player {
		height: 4.5rem;
		background: currentColor;
		position: sticky;
		top: 44px;
	}

	.info {
		height: 44px;
		display: flex;
		align-items: center;
		background-color: #fff;
		border-bottom: 1px solid #eee;
		padding-left: 10px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>