<template>
	<div class="together-look">
		<together-look-header />
		<div class="later-dev">
			<i class="bg-img"></i>
			<p>想法：多个video元素,可一起看</p>
			<p>问题：渲染20多个video标签导致页面闪烁,没想到好的解决方案,暂停开发</p>
		</div>
		<!-- <together-look-nav @click-nav="handleClickNav" @play="handlerPlay" />
		<together-look-video-panel :mediaArr="mediaArr" ref="videoPanel" /> -->
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

	.later-dev {
		flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
	}

	.later-dev>.bg-img {
        display: block;
        width: 120px;
        height: 120px;
        background-image: url(../../../../assets/waw.gif);
        background-size: contain;
	}

	.later-dev>p {
		margin-top: 20px;
		font-size: 14px;
		color: rgba(183,174,168,1);
	}
</style>