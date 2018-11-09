<template>
	<div class="channel-content-movie-header">
		<div class="header-left" @click="play(renderData['bannerData'])">
			<div class="bg">
				<img :src="renderData['bannerData']['genImgPath']">
			</div>
			<div class="banner">
				<img :src="renderData['bannerData']['genImgPath']">
			</div>
			<div class="title">
				<span>{{ renderData['bannerData']['filename'] }}</span>
				<span>11-08期</span>
			</div>
		</div>
		<div class="header-right">
			<div class="recommend">
				<div 
				    v-for="(media, index) in renderData['recommendData']"
				    @click="play(media)"
				>
					<img :src="media['genImgPath']" alt="">
					<span>{{ media['filename'] }}</span>
				</div>
			</div>
			<div class="nav-list">
				<div class="nav-wrap">
					<div 
					    class="nav-item" 
					    v-for="nav in navArr"
					    @click="jumpNav(nav)"
					>
						{{ nav['tag'] }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import CommonMixin from '@/mixin/common-mixin'
	import { getRandomItemFromArr } from '@/util/index'

	const defaultBannerData = {
		genImgPath: require('../../../../../assets/bg/dark/hDefault_big.jpg'),
		filename: '影片名称'
	}
	let defaultRecommendData = Object.assign({}, defaultBannerData)
	defaultRecommendData.genImgPath = require('../../../../../assets/bg/DefaultImage/Assets/Dark/focusDefault.jpg')

	export default {
		name: 'ChannelContentMovieHeader',
		mixins: [ CommonMixin ],
		props: {
			tag: {
				type: String,
				default: '推荐'
			}
		},
		data() {
			return {
				renderData: {
					bannerData: defaultBannerData,
					recommendData: [
					    defaultRecommendData,
					    defaultRecommendData
					]
				}
			}
		},
		methods: {
			async updateRenderData(tag) {
				tag = tag || this.tag
				let dataArr = await this.getVideoDataByTagPromise(tag)
				if (dataArr.length >= 3) {
					let arr = getRandomItemFromArr(dataArr, 3)
					this.renderData.bannerData = arr[0]
					this.renderData.recommendData = [ arr[1], arr[2] ]
				} else if (dataArr.length == 2) {
					this.renderData.bannerData = dataArr[0]
					this.renderData.recommendData = [].concat(dataArr)
				} else if (dataArr.length == 1) {
					this.renderData.bannerData = dataArr[0]
					this.renderData.recommendData = [dataArr[0], dataArr[0]]
				}
				// console.log('头部renderData: ', this.renderData)
			},
			play(media) {
				if (media['videoUrl']) {
					this.playVideo(media)
				}
			},
			jumpNav(nav) {
				console.log('跳转到快速查看页面: ', nav)
			}
		},
		mounted() {
			this.updateRenderData()
		}
	}
</script>

<style scoped>
	.channel-content-movie-header {
        width: 100%;
        height: 265px;
        display: flex;
        margin-top: 15px;
        margin-bottom: 22px;
	}

	/* 头部左边样式 */
	.header-left {
        flex: 1;
        position: relative;
        overflow: hidden;
	}
	.header-left:hover {
		cursor: pointer;
	}
	.header-left>.bg {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
	}
	.header-left>.bg>img {
		width: 100%;
		height: 100%;
		filter: blur(6px) opacity(.6);
	}
	.header-left>.banner {
		width: 344px;
		height: 100%;
		position: absolute;
		left: 50%;
		transform: translate(-50%, 0);
	}
	.header-left>.banner>img {
		width: 100%;
		height: 100%;
	}
	.header-left>.title {
		width: 100%;
		height: 30px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 10px;
		position: absolute;
		bottom: 0;
		left: 0;
		background-color: rgba(0,0,0,.8);
	}
	.header-left>.title>span {
		font-size: 14px;
		color: rgba(204,204,204,1);
	}
	.header-left .title span:nth-child(2) {
		font-size: 12px;
	}

	/* 头部右边样式 */
	.header-right {
		width: 400px;
		height: 100%;
		display: flex;
	}

	.header-right>.recommend {
		flex: none;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
        width: 205px;
        height: 100%;
        overflow: hidden;
	}
	.header-right>.recommend>div {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.header-right>.recommend>div:hover {
		cursor: pointer;
	}
	.header-right>.recommend>div>img {
		width: 180px;
		height: 100px;
	}
	.header-right>.recommend>div>span {
		width: 180px;
		display: block;
		align-self: flex-start;
		color: rgba(204,204,204,1);
		font-size: 13px;
		margin-top: 4px;
		margin-left: 12px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.header-right>.nav-list {
		flex: 1;
		overflow: auto;
	}

	.nav-wrap {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	/* 滚动条控制样式 */
	.header-right>.nav-list::-webkit-scrollbar {
		display: none;
	}

	.nav-item {
		display: block;
        width: 96px;
        height: 48px;
        margin-bottom: 3px;
        background-color: rgba(38,44,48,1);
        font-size: 14px;
        color: rgba(153,153,153,1);
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        text-align: center;
        line-height: 48px;
	}
	.nav-item:hover {
		cursor: pointer;
	}
</style>