<template>
	<div class="classic-video-list">
		<div class="video-list" v-show="videoList.length >  0">
			<base-lazy-load 
			    mode="default"
			    :time="300"
			    :done="true"
			    :position="{ top: 0, right: 0, bottom: 0, left: 0 }"
			>
				<ul>
					<li 
					    v-for="(video, index) in videoList" 
					    :key="video['filename']"
					    ref="aLiDoms"
					    v-finger:tap="goPlayPage(video)"
					>
						<div class="cover">
							<img :data-src="video['imgUrl']">
							<h4 class="title">{{ video['filename'] }}</h4>
							<i class="play-icon"></i>
							<span class="time">01:27</span>
						</div>
						<div class="info">
							<div class="user">
								<div class="head-portrait">
									<img :src="video['imgUrl']">
								</div>
								<span>{{ tag }}</span>
							</div>
							<div class="operat">
								<i class="message-icon"></i>
								<span>12</span>
								<i class="share-icon"></i>
							</div>
						</div>
					</li>
				</ul>
			</base-lazy-load>
		</div>
		<div v-if="done" class="done">
			没有更多数据啦
		</div>
	</div>
</template>

<script>
    import BaseLazyLoad from '@/components/base/base-lazy-load-img'
    import { extend } from '@/common/js/util/index'
    const defaultBgImg = require('../../assets/video-defaultpic.png')

    let allVideoList = []
    const VIDEO_NUM = 10

	export default {
		name: 'ClassicVideoList',
		components: { BaseLazyLoad },
		props: {
			tag: String,
            allVideoList: {
            	type: Array,
            	default: function() { return [] }
            }
		},
		data() {
			return {
				done: false,
				videoList: [],
				showPlayer: false
			}
		},
		methods: {
			loadVideoData(num) {
				let list = []
				let remaindList = allVideoList
				if (remaindList.length > 0) {
					list = remaindList.splice(0, num)
				}
				return list
			},
			load() {
				let list = this.loadVideoData(VIDEO_NUM)
				if (list.length > 0) {
					this.videoList = this.videoList.concat(list)
					if (list.length === VIDEO_NUM) {
						this.done = false
					} else if (list.length < VIDEO_NUM) {
						this.done = true
					}
				} else {
					this.done = true
				}
			},
			recovery() {
				this.videoList = []
				this.done = false
			},
			hanndeScroll() {
				if (this.checkScrollSlide()) {
					this.load()
				}
			},
			checkScrollSlide() { // 检查是否可以加载数据
				let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
				let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
				let i, lastDlDoms
				if (
					(i = this.$refs.aLiDoms) && 
					(lastDlDoms = i[i.length - 1])
				) {
					let lastDomHeight = lastDlDoms.offsetTop + Math.floor(lastDlDoms.offsetHeight / 3)
					return lastDomHeight <= scrollTop + clientHeight ? true : false
				} else {
					return false
				}
			},
			goPlayPage(video) {
				return () => {
					this.$router.push({
						name: 'play',
						params: video
					})
				}
			}
		},
		mounted() {
			window.addEventListener('scroll', this.hanndeScroll, false)

			this.$watch('allVideoList', (newVal) => {
				this.recovery()
				allVideoList = newVal.slice(0)
				this.load()
			}, {
				immediate: true
			})
		},
		destroyed() {
			window.removeEventListener('scroll', this.hanndeScroll)
		}
	}
</script>

<style scoped>
	.classic-video-list {
		width: 100%;
		position: relative;
	}

	.video-list {}

	.video-list ul {}

	.video-list ul li {
		margin-bottom: 0.12rem;
	}

	.video-list ul li .cover {
		height: 4.2rem;
		position: relative;
	}

	.cover img {
		width: 100%;
		height: 100%;
	}
	.cover .play-icon {
		display: flex;
		width: 48px;
		height: 48px;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-left: -24px;
		margin-top: -24px;
		background-image: url(../../assets/play.png);
		background-size: contain;
	}
	.cover .title {
		max-height: 48px;
		position: absolute;
		top: 0.26rem;
		left: 0.34rem;
		right: 0.34rem;
		color: #fff;
		font-size: 18px;
		font-weight: 400;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		display: -webkit-box;
		-webkit-box-orient: vertical;
	}
	.cover .time {
		min-width: 50px;
		min-height: 18px;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 2px 10px;
		position: absolute;
		right: 5px;
		bottom: 2px;
		border-radius: 40px;
		color: #fff;
		font-size: 12px;
		background-color: rgba(0,0,0,0.4);
	}

	.video-list ul li .info {
		height: 44px;
	    display: flex;
	    justify-content: space-between;
	    align-items: center;
	}

	.info .user {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.info .user .head-portrait {
		width: 22px;
		height: 22px;
		margin-right: 8px;
		margin-left: 16px;
	}
	.info .user .head-portrait img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.info .user span {
		display: block;
		max-width: 3.0rem;
		font-size: 15px;
		color: rgba(0,0,0,1);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.info .operat {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.share-icon, .message-icon {
		display: block;
		width: 18px;
		height: 18px;
	}
	.share-icon {
		background-image: url(../../assets/share.png);
		background-size: contain;
		margin: 0 20px;
	}
	.message-icon {
		background-image: url(../../assets/message.png);
		background-size: contain;
		margin-right: 5px;
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