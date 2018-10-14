<template>
    <div class="media-recommend">
    	<div class="all-media" 
    	    :style="{ 'transform': 'translate3d(' + allMediaDomTranslateX + '%, 0, 0)' }"
    	    @animationstart="handlerAnimationStart"
    	    @animationend="handlerAnimationEnd"
    	>
    		<div class="media" v-for="(media, index) in arrMedia">
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
    			    @play="handlerPlay"
    			    @collection="handlerCollection"
    			    @open-detail="handlerOpenDetail"
    			>
    			</media-recommend-operation>
    		</div>
    	</div>
    </div>
</template>

<script>
    import MediaRecommendInfo from './media-recommend-info'
    import MediaRecommendOperation from './media-recommend-operation'

    const components = { MediaRecommendInfo, MediaRecommendOperation }
    let animationPadding = false

	export default {
		name: 'MediaRecommend',
		components,
		data() {
			return {
				allMediaDomTranslateX: 0,
				curIndex: 0, // 所有媒体页面中的当前页面的索引
				arrMedia: [ // 媒体数据
				    {
                        bgImg: 'https://ykimg.alicdn.com/product/image/2018-09-28/c5bf0c88aef1af97ebf2af7bbc9a829f.jpg'
				    }, 
				    {
						bgImg: 'https://ykimg.alicdn.com/product/image/2018-09-30/4ea9a99638ea40549a1afe3e7244d64a.jpg'
				    },
			        {
			    		bgImg: 'https://ykimg.alicdn.com/product/image/2018-09-28/487d58186a97d29ede141c2b1b172683.jpg'
			        },
		            {
		        		bgImg: 'https://ykimg.alicdn.com/product/image/2018-09-29/380b4c6f3b7c80888ca435c0c16830c2.jpg'
		            },
		            {
                        bgImg: 'https://ykimg.alicdn.com/product/image/2018-09-28/c5bf0c88aef1af97ebf2af7bbc9a829f.jpg'
				    }, 
				    {
						bgImg: 'https://ykimg.alicdn.com/product/image/2018-09-30/4ea9a99638ea40549a1afe3e7244d64a.jpg'
				    },
			        {
			    		bgImg: 'https://ykimg.alicdn.com/product/image/2018-09-28/487d58186a97d29ede141c2b1b172683.jpg'
			        },
		            {
		        		bgImg: 'https://ykimg.alicdn.com/product/image/2018-09-29/380b4c6f3b7c80888ca435c0c16830c2.jpg'
		            }
				]
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
				let len = this.arrMedia.length

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
			handlerPlay() { // 处理 播放按钮
				console.log('跳转到播放页面')
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
</style>