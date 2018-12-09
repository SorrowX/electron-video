<template>
	<div class="home-channel">
		<dl 
		    v-for="(videoList, channelTag) in channelVideoMap" 
		    :key="channelTag"
		    ref="dlDoms"
		>
		    <dt>
		    	<i class="refresh" v-finger:tap="refreshChannelData(channelTag)"></i>
		    	<span v-finger:tap="refreshChannelData(channelTag)">{{ channelTag }}</span>
		    	<p v-finger:tap="clickChannel(channelTag)">更多</p>
		    </dt>
		    <dd>
		    	<home-list
		    	    :videoList="videoList"
		    	    :num="listNumn"
		    	>
		    	</home-list>
		    </dd>
	    </dl>

	    <div class="done" v-if="done">人家可是有底线的啦...</div>
	</div>
</template>

<script>
    import HomeList from './home-list'
    import { getNavListFromApi, getVideoListByNavFromApi } from '@/api/api'
    import { getRandomItemFromArr } from '@/common/js/util/index'

	export default {
		name: 'HomeChannel',
		components: { HomeList },
		data() {
			return {
				navList: [],
				channelVideoMap: {},
				done: false,
				listNumn: 6
			}
		},
		methods: {
			init() {
				window.addEventListener('scroll', this.loadData, false)

				this.getChannelRenderData()
			},
			async getChannelRenderData() {
				let list, tag
				if (this._waiting) return
				this._waiting = true

                let navList = await this.getNavList()
                if (navList.length > 0) {
                	let navObj = navList.shift()
                	list = await this.getVideoList(tag = navObj.tag)
                	this.$set(this.channelVideoMap, tag, list)
                	this.done = false
                } else {
                    this.done = true
                }

                this._waiting = false
                return this.channelVideoMap
			},
			loadData() {
                if (this.checkScrollSlide()) {
                	this.getChannelRenderData()
                }
			},
			checkScrollSlide() { // 检查是否可以加载数据
				let scrollTop = document.documentElement.scrollTop || document.body.scrollTop // 滚动条滚动的距离
				let clientHeight = document.documentElement.clientHeight || document.body.clientHeight // 浏览器视口的高度
				let i
				if (i = this.$refs.dlDoms) {
					let lastDlDoms = i[i.length - 1] // 这里取最后一个dl dom元素,其offsetTop是相对与main元素的(没有给类home-channel的div加上定位了,这样好计算些)
					let lastDomHeight = lastDlDoms.offsetTop + Math.floor(lastDlDoms.offsetHeight / 2)
					return lastDomHeight <= scrollTop + clientHeight ? true : false
				} else {
					return false
				}
			},
			async getNavList() {
				if (
					this.navList.length === 0 &&
					!this.navList.__done__
				) {
					let navRet = await getNavListFromApi()
					if (navRet.status === 200 && navRet.data.code === 0) {
						this.navList = navRet.data.data
						this.navList.__done__ = true
					}
				}
				return this.navList
			},
			async getVideoList(tag) {
				let list = []
				let ret = await getVideoListByNavFromApi({ tag })
				if (ret.status === 200 && ret.data.code === 0) {
                    list = ret.data.data
				}
				return list
			},
			refreshChannelData(channelTag) {
				return () => {
					if (this._refresh) return
					this._refresh = true
					this.getVideoList(channelTag).then((list) => {
                        this.channelVideoMap[channelTag] = getRandomItemFromArr(list, this.listNumn)
                        this._refresh = false
					})
				}
			},
			clickChannel(channelTag) {
				return () => {
					this.$router.push({
						name: 'video_list',
						params: {
							tag: channelTag
						}
					})
				}
			}
		},
		mounted() {
			this.init()
		},
		destroyed() {
			window.removeEventListener('scroll', this.loadData)
		}
	}
</script>

<style scoped>
	.home-channel {}

	.home-channel dl {}

	.home-channel dl dt {
		height: 50px;
		display: flex;
		align-items: center;
		position: sticky;
		top: 43px;
		z-index: 9;
		background: rgba(255,255,255,0.9);
	}

	.home-channel dl dt p {
		position: absolute;
	    right: 0;
	    font-size: 14px;
	    height: 100%;
	    width: 60px;
	    display: flex;
	    justify-content: center;
	    align-items: center;
	}

	.home-channel dl dt span {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
	}
	

	.home-channel dl dd {}

	.refresh {
		width: 14px;
		height: 14px;
		display: block;
		margin: 0 8px;
		background-image: url(../../assets/refresh.png);
		background-size: 14px 14px;
	}

	.done {
		width: 90%;
		height: 44px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-top: 1px solid #eee;
	    font-size: 13px;
	    letter-spacing: 3px;
	    margin: auto;
	    margin-top: 20px;
	}
</style>