<template>
	<div class="together-look">
		<together-look-header />
		<together-look-nav @click-nav="handleClickNav" @play="handlerPlay" />
		<together-look-video-panel :mediaArr="mediaArr" ref="videoPanel" />
	</div>
</template>

<script>
	import TogetherLookHeader from './together-look-header'
	import TogetherLookNav from './together-look-nav'
	import TogetherLookVideoPanel from './together-look-video-panel'
	import CommonMixin from '@/mixin/common-mixin'

	const components = { TogetherLookHeader, TogetherLookNav, TogetherLookVideoPanel }

	export default {
		name: 'TogetherLook',
		mixins: [ CommonMixin ],
		components,
		data() {
			return {
				mediaArr: []
			}
		},
		methods: {
			handleClickNav(nav) {
				this.loadDataByNav({
					nav,
					direct: true,
					callback: (data) => {
						this.mediaArr = data
						console.log('总数据', this.mediaArr)
					}
				})
			},
			handlerPlay() {
                this.$refs.videoPanel.togetherPlay()
			}
		}
	}
</script>

<style scoped>
	.together-look {
		height: 100%;
		display: flex;
		flex-direction: column;
		position: relative;
	}
</style>