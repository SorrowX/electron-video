<template>
    <div class="media-recommend">
    	<div class="all-media" 
    	    :style="{ 'transform': 'translate3d(' + allMediaDomTranslateX + '%, 0, 0)' }"
    	    v-show="dynamicCalcRenderMediaData.length > 0 && navArr.length > 0"
    	    ref="allMediaDom"
    	>
    		<div 
    		    class="media" 
    		    ref="mediaDoms"
    		    v-for="(media, index) in dynamicCalcRenderMediaData" 
            >
    			<media-recommend-info
    			    :mediaInfo="media"
    			    :mediaIndex="index"
    			    @scroll-whell="scrollWhellMedia"
    			    ref="recommendInfoComp"
    			>
    		    </media-recommend-info>
    			<media-recommend-operation
	    			:mediaInfo="media"
    			    :notLastOne="dynamicCalcRenderMediaData.length - 1 != index"
    			    @go-on-library="handlerGoOnLibrary"
    			    @next="handlerNext"
    			    @play="handlerPlay(media)"
    			    @collection="handlerCollection"
    			    @open-more="handlerOpenMore"
    			>
    			</media-recommend-operation>
    		</div>
    	</div>
    	<div v-show="navArr.length === 0" class="tip">
    		<p>请拖入 视频文件夹！</p>
    	</div>
    	<div class="no-result" 
    	    v-if="dynamicCalcRenderMediaData.length === 0 && !loading"
    	>
    	    <i class="no-result-img"></i>
    	    <p>该导航下暂无数据 哇啊啊 ...</p>
    	</div>
    	<transition>
	    	<base-loading v-if="loading" :showBg="true"></base-loading>
    	</transition>
    </div>
</template>

<script>
    import MediaRecommendInfo from './media-recommend-info'
    import MediaRecommendOperation from './media-recommend-operation'
    import CommonMixin from '@/mixin/common-mixin'
    import BaseLoading from '@/components/base/base-loading'
    import { 
    	SWITCH_QUICK_VIEW_NAV_DATA_MESSAGE
    } from '@/constant/index'
    import fu from '../../../../../../file-server/fu'

    const components = { MediaRecommendInfo, MediaRecommendOperation, BaseLoading }
    const ALL_MEDIA_COUNTS = 2
    let waiting = false // 等待更新数据
    const tickTime = 1 * 1000

	export default {
		name: 'MediaRecommend',
		mixins: [ CommonMixin ],
		components,
		props: {
			arrMedia: {
				type: Array,
				default: function() { return [] }
			},
			nav: [Object, String]
		},
		data() {
			return {
				allMediaDomTranslateX: 0,
				curIndex: 0, // 所有媒体页面中的当前页面的索引
				dynamicCalcRenderMediaData: [], // 左右滑动时,始终保持3条数据以提高性能
				loading: true
			}
		},
		watch: {
			arrMedia() { // 有新的数据,重置translatx值
				this.curIndex = this.allMediaDomTranslateX = 0
				this.initialData()
			}
		},
		methods: {
			scrollWhellMedia(direction) {
				if (waiting) return

				this.$refs.allMediaDom.style.transition = 'transform .65s'

			    let len = this.arrMedia.length
				if (direction === 'pre') { // 前一个
					this.curIndex--
					if (this.curIndex <= 0) {
						this.curIndex = 0
					}
				} else { // 下一个
					this.curIndex++
					if (this.curIndex >= len - 1) {
						this.curIndex = len - 1
					}
				}

				this.allMediaDomTranslateX =  -100 * this.curIndex
				
				this.updateRenderData(direction, this.curIndex)
			},
			updateRenderData(direction, curIndex) {
				waiting = true
				setTimeout(() => {
					this.$refs.allMediaDom.style.transition = 'transform 0s'

					let len = this.dynamicCalcRenderMediaData.length
					if (direction === 'next') {
						let lastMedia = this.dynamicCalcRenderMediaData[len - 1]
						let i = this.arrMedia.indexOf(lastMedia)
						let pushMedia = this.arrMedia[i + 1]
						if (pushMedia) {
							this.dynamicCalcRenderMediaData.push(pushMedia)
						}
					} else if (direction === 'pre') {
						this.dynamicCalcRenderMediaData = this.dynamicCalcRenderMediaData.slice(0, curIndex + ALL_MEDIA_COUNTS)
					}

					this.$nextTick(() => {
						waiting = false
					})

				}, tickTime)
			},
			handlerOpenMore(isShowNextPage) { // 处理是否展开 更多按钮
				this.$refs.recommendInfoComp[this.curIndex].openMore(isShowNextPage)
			},
			handlerCollection(isCollection) { // 处理 收藏按钮
                this.operateVideo(this.dynamicCalcRenderMediaData[this.curIndex], isCollection)
			},
			handlerPlay(media) { // 处理 播放按钮
				this.playVideo(media)
			},
			handlerNext() { // 处理 下一个按钮
				this.scrollWhellMedia('next')
			},
			handlerGoOnLibrary() { // 处理 进入片库按钮
				this.insideSwitchNav('QuickView')

				let navObj
				if (typeof this.nav === 'string') {
					navObj = this.navArr.find((nav) => {
						return nav['tag'] === this.nav
					})
				} else {
					navObj = this.nav
				}
				
				this.$root.$emit(SWITCH_QUICK_VIEW_NAV_DATA_MESSAGE, navObj)
			},
			initialData() {
				let arr = this.arrMedia.map((info) => {
					info['bgImg'] = info['imgUrl']
					return info 
				})
				if (arr.length > ALL_MEDIA_COUNTS) {
					arr.length = ALL_MEDIA_COUNTS
				}
				this.dynamicCalcRenderMediaData = arr
				this.loading = this.dynamicCalcRenderMediaData.length ? false : true
			},
			handlerEmptyData() {
				this.dynamicCalcRenderMediaData = []
				this.loading = false
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
		transition: transform .65s;
		transform: translate3d(0px, 0, 0); /* 控制左右滚动 */
		background-color: rgba(27,34,38,.8);
	}

	.media {
		position: relative;
		flex-shrink: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		transition: transform .35s;
	}

	.media-info {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		transition: transform .35s;
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

	/* 没有结果的 样式 */
	.no-result {
	    display: flex;
	    flex-direction: column;
	    justify-content: center;
	    align-items: center;
	    height: calc(100% - 120px); /* 减去底部高度 */
	    font-size: 14px;
	    color: rgba(183,174,168,1);
	}

	.no-result-img {
	    margin-top: 15%;
	    display: block;
	    width: 120px;
	    height: 120px;
	    background-image: url(../../../../../assets/waw.gif);
	    background-size: contain;
	}
</style>