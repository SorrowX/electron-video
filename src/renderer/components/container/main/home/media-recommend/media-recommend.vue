<template>
    <div class="media-recommend">
    	<div class="all-media" 
    	    v-show="arrMediaInfo.length > 0"
    	    :style="{ 'transform': 'translate3d(' + allMediaDomTranslateX + '%, 0, 0)' }"
    	    @animationstart="handlerAnimationStart"
    	    @animationend="handlerAnimationEnd"
    	>
    		<div class="media" v-for="(media, index) in arrMediaInfo">
    			<media-recommend-info
    			    :mediaInfo="media"
    			    :mediaIndex="index"
    			    @scroll-whell="scrollWhellMedia"
    			    ref="recommendInfoComp"
    			>
    		    </media-recommend-info>
    			<media-recommend-operation
    			    @go-on-library="handlerGoOnLibrary"
    			    @next="handlerNext"
    			    @play="handlerPlay(media)"
    			    @collection="handlerCollection"
    			    @open-detail="handlerOpenDetail"
    			>
    			</media-recommend-operation>
    		</div>
    	</div>
    	<div v-show="arrMediaInfo.length === 0" class="tip">
    		<p>当前页面暂无数据, 请进入‘快速查看’页面,进行添加导航！</p>
    	</div>
    </div>
</template>

<script>
    import MediaRecommendInfo from './media-recommend-info'
    import MediaRecommendOperation from './media-recommend-operation'
    import CommonMixin from '../../../../../mixin/common-mixin'

    const components = { MediaRecommendInfo, MediaRecommendOperation }
    let animationPadding = false

	export default {
		name: 'MediaRecommend',
		mixins: [ CommonMixin ],
		components,
		props: {
			arrMedia: {
				type: Array,
				default: function() { return [] }
			}
		},
		data() {
			return {
				allMediaDomTranslateX: 0,
				curIndex: 0, // 所有媒体页面中的当前页面的索引
			}
		},
		computed: {
			arrMediaInfo() {
				return this.arrMedia.map((info) => {
					info['bgImg'] = info['imgUrl']
					return info 
				})
			}
		},
		methods: {
			handlerAnimationStart() {
				animationPadding = true
			},
			handlerAnimationEnd() {
				animationPadding = false
			},
			scrollWhellMedia(type) {
				if (animationPadding) return
				let len = this.arrMediaInfo.length

				if (type === 'pre') { // 前一个
					this.curIndex--
					if (this.curIndex <= 0) 
						this.curIndex = 0
				} else { // 下一个
					this.curIndex++
					if (this.curIndex >= len) 
						this.curIndex = len - 1
				}

				this.allMediaDomTranslateX = -100 * this.curIndex
			},
			handlerOpenDetail(isShowNextPage) { // 处理是否展开 详情按钮
				this.$refs.recommendInfoComp[this.curIndex].openDetail(isShowNextPage)
			},
			handlerCollection(isCollection) { // 处理 收藏按钮
                console.log('是否收藏: ', isCollection)
			},
			handlerPlay(media) { // 处理 播放按钮
				this.playVideo(media.videoUrl, media.imgUrl)
			},
			handlerNext() { // 处理 下一个按钮
				this.scrollWhellMedia('next')
			},
			handlerGoOnLibrary() { // 处理 进入片库按钮
				console.log('进入片库')
			}
		}
	}
</script>

<style scoped>
	.media-recommend {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.all-media {
		width: 93.8%;
		height: 100%;
		display: flex;
		transition: all .65s;
		transform: translate3d(0px, 0, 0); /* 控制左右滚动 */
		background-color: rgba(27,34,38,.8);
	}

	.media {
		position: relative;
		flex-shrink: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.media-info {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		transition: all .35s;
		transform: translate3d(0, 0px, 0); /* 控制单个媒体信息上下滚动 */
	}

	.tip {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 15px;
		color: rgba(76,174,80,.8);
	}
</style>