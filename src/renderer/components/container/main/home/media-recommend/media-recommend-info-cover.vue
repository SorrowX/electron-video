<template>
	<div class="media-cover" @mousewheel="handlerWheel">
		<div class="cover">
			<img :src="bgImg" @error="handlerError">
		</div>
	</div>
</template>

<script>
    import { debounce } from '@/util/index'
    import CommonMixin from '@/mixin/common-mixin'

	export default {
		name: 'MediaRecommendCover',
		mixins: [ CommonMixin ],
		props: {
			bgImg: {
				type: String,
				default: ''
			}
		},
		methods: {
			handlerClickDetailBtn() {
                this.$emit('is-open-detail-page', true)
			},
			handlerWheel(evt) {
				this.lastTimeStamp = evt.timeStamp
				if (this.lastTimeStamp - this.preTimeStamp > 500) {
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
</style>