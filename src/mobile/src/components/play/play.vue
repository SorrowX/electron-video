<template>
	<div class="play">
		<base-back :title="'视频播放'"></base-back>
		<video-player ref="playerComp"></video-player>
	</div>
</template>

<script>
	import BaseBack from '@/components/base/base-back'
	import VideoPlayer from './video-player'

	export default {
		name: 'Play',
		components: { BaseBack, VideoPlayer },
		beforeRouteEnter (to, from, next) {
			next((vm) => {
				let video = vm.$route.params
				if (Object.keys(video).length === 0) {
					vm.$router.go(-1)
				} else {
                    vm.videoInfo = vm.$route.params
                    vm.$refs.playerComp.setData(vm.videoInfo)
				}
			})
		},
		beforeRouteLeave (to, from, next) {
			next()
		},
		data() {
			return {
				videoInfo: {}
			}
		}
	}
</script>

<style scoped>
	.play {
		position: absolute;
    	left: 0;
    	top: 0;
    	right: 0;
	}
</style>