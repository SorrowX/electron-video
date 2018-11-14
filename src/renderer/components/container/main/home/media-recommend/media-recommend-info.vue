<template>
	<div
	    class="media-info" 
	    :style="{ 'transform': 'translate3d(0, ' + mediaInfoDomtranslateY + '%, 0)' }"
	>
		<media-recommend-info-cover
		    :bgImg="mediaInfo['genImgPath']"
		    @switch-media="switchMedia"
		>
		</media-recommend-info-cover>
		<media-recommend-info-details
		    :show="showDetailsComponent"
		    :bgImg="mediaInfo['genImgPath']"
		>
		</media-recommend-info-details>
	</div>
</template>

<script>
	import MediaRecommendInfoCover from './media-recommend-info-cover'
	import MediaRecommendInfoDetails from './media-recommend-info-details'

    const components = { MediaRecommendInfoCover, MediaRecommendInfoDetails }

	export default {
		name: 'MediaRecommendInfo',
		components,
		props: {
			mediaInfo: {
				type: Object,
				default: function() {
					return {}
				}
			},
			mediaIndex: {
				type: Number,
				default: -1
			}
		},
		data() {
			return {
				mediaInfoDomtranslateY: 0,
				showDetailsComponent: false
			}
		},
		methods: {
			openDetail(isShowNextPage) {
				if (isShowNextPage) {
					this.mediaInfoDomtranslateY = -100
					this.showDetailsComponent = true
				} else {
					this.mediaInfoDomtranslateY = 0
					this.showDetailsComponent = false
				}
			},
			switchMedia(type) {
				this.$emit('scroll-whell', type)
			}
		}
	}
</script>

<style scoped>
	.media-info {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		transition: all .35s;
		transform: translate3d(0, 0px, 0); /* 控制单个媒体信息上下滚动 */
	}
</style>