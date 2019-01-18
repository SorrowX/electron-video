<template>
	<div class="photo-wall-content">
		<div class="photo-wrapper"></div>
		<div class="empty" v-show="!resourceArr.length">
			<i class="bg-img"></i>
			<p>未获取到数据!</p>
		</div>
	</div>
</template>

<script>
	import CommonMixin from '@/mixin/common-mixin'
    import initPhoto, { setShowType } from './photo'

	export default {
		name: 'PhotoWallContent',
		mixins: [ CommonMixin ],
		data() {
			return {
				resourceArr: []
			}
		},
		methods: {
			initPhoto() {
				let self = this
				this.getRandomVideoData((resourceArr) => {
					this.resourceArr = resourceArr
					initPhoto({
						resourceArr,
						clickCb: function(item) {
							self.playVideo(item)
						}
					})
				})
			},
			setShowType(bool) {
				setShowType(bool)
			}
		},
		mounted() {
			this.initPhoto()
		}
	}
</script>

<style>
    .photo-wall-content {
    	flex: 1;
    	position: relative;
    	box-sizing: border-box;
    	position: relative;
    }

	.photo-wrapper {
		position: absolute;
		top: 0;
		left: 3%;
		width: 94%;
		height: 100%;
		overflow: hidden;
		/*box-shadow: 0 2px 32px #aaaaaa, 0 0 32px #aaaaaa;*/
	}

	/* 图片容器样式 */
	.photo {
		position: absolute;
		z-index: 1;
		width: 280px;
		padding: 5px;
		background-color: rgba(52,62,70,.7);
		border-radius: 4px;
	}

	.photo img {
		display: block;
		width: 100%;
		height: 100%;
	}

	.photo:hover {
		transform: rotate(0deg) !important;
		transform: scale(1.3) !important;
		box-shadow: 5px 5px 10px rgba(255,255,255,.5);
		z-index: 2;
		cursor: move;
	}

	.empty {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 2;
		display: flex;
		justify-content: center;
		align-items: center;
		color: rgba(183,174,168,1);
		font-size: 15px;
	}

	.empty {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 2;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
	}

	.empty>.bg-img {
        display: block;
        width: 120px;
        height: 120px;
        background-image: url(../../../../assets/waw.gif);
        background-size: contain;
	}

	.empty>p {
		margin-top: 20px;
		font-size: 14px;
		color: rgba(183,174,168,1);
	}
</style>