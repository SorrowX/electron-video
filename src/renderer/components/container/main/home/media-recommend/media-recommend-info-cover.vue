<template>
	<div class="media-cover" @mousewheel="handlerWheel">
		<div class="cover">
			<img :src="bgImg">
		</div>
	</div>
</template>

<script>
    import { debounce } from '@/util/index'

	export default {
		name: 'MediaRecommendCover',
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
				if (evt.wheelDelta > 0) { // 向上是正数 x轴向左
					this.$emit('switch-media', 'pre')
				} else { // 表示向下是负数 x轴向右
					this.$emit('switch-media', 'next')
				}
			}
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