<template>
	<div class="media-cover" @mousewheel="handlerWheel">
		<div class="cover">
			<img :src="bgImg" @error="handlerError">
		</div>
		<div class="media-info">
			<div class="info">
				<div class="title">
					<p>{{ mediaInfo['filename'] }}</p>
					<span>
						<i class="hot"></i>
					    2761
					</span>
				</div>

				<div class="score">
					<span>评分</span>
					<span>8.5</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    import { debounce } from '@/util/index'
    import CommonMixin from '@/mixin/common-mixin'
    const DELAY_TIME = 1 * 1000

	export default {
		name: 'MediaRecommendCover',
		mixins: [ CommonMixin ],
		props: {
			bgImg: {
				type: String,
				default: ''
			},
			mediaInfo: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		methods: {
			handlerClickDetailBtn() {
                this.$emit('is-open-detail-page', true)
			},
			handlerWheel(evt) {
				this.lastTimeStamp = evt.timeStamp
				if (this.lastTimeStamp - this.preTimeStamp > DELAY_TIME) {
					this.preTimeStamp = this.lastTimeStamp
					if (evt.wheelDelta > 0) { // 向上是正数 x轴向左
						this.$emit('switch-media', 'pre')
					} else { // 表示向下是负数 x轴向右
						this.$emit('switch-media', 'next')
					}
				}
			},
			handlerError(evt) {
				evt.target.src = this.homeErrorBgImg
			}
		},
		created() {
			this.lastTimeStamp = this.preTimeStamp = 0
		}
	}
</script>

<style scoped>
	.media-cover {
		flex-shrink: 0;
		width: 100%;
		height: 100%;
		position: relative;
		padding: .8% 0 .8% 1.5%;
	}

	.cover {
       width: 100%;
       height: 100%;
       overflow: hidden;
	}

	.cover img {
		width: 100%;
        height: 100%;
        background-repeat: no-repeat;
	}

	.media-info {
		width: 68%;
		position: absolute;
		bottom: 7%;
		left: 4.5%;
	}

	.info {
		display: flex;
		justify-content: space-between;
	}

	.title {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.title p {
		font-size: 14px;
	    color: #fff;
	    letter-spacing: 2px;
	    font-style: normal;
	    margin-right: 20px;
	    max-width: 350px;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	}

	.hot {
		display: block;
		width: 18px;
		height: 18px;
		margin-right: 6px;
		background-image: url(../../../../../assets/media-recommend/hot_count.png);
		background-size: contain;
	}

	.title span {
		display: flex;
		align-items: center;
		color: #fff;
	}

	.score {
		width: 80px;
		height: 28px;
		border-radius: 3px;
		display: flex;
	}
	.score>span {
		display: inline-block;
		width: 36px;
		height: 28px;
		text-align: center;
		line-height: 28px;
		color: #fff;

	}
	.score>span:nth-child(1) {
		background-color: rgba(255,110,30,1);
		border-top-left-radius: 3px;
		border-bottom-left-radius: 3px;
	}
	.score>span:nth-child(2) {
		background-color: rgba(0,0,0,.5);
		border-top-right-radius: 3px;
		border-bottom-right-radius: 3px;
	}
</style>