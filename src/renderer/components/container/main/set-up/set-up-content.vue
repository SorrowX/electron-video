<template>
	<div class="set-up-content">
		<video-thumb-option 
		    @video-thumb-page="handlerVideoThumbBtn"
		>
		</video-thumb-option>

		<zoom-option></zoom-option>
	</div>
</template>

<script>
    import VideoThumbOption from './set-up-content-video-thumb-option'
    import ZoomOption from './set-up-content-zoom-option'

    const components = { VideoThumbOption, ZoomOption }

	export default {
		name: 'setUpContent',
		components,
		data() {
			return {
			}
		},
		methods: {
			handlerVideoThumbBtn(compName) {
                this.$emit('video-thumb-page', compName)
			}
		}
	}
</script>

<style scoped>
	.set-up-content {
		height: 1500px;

		font-size: 17px;
		font-weight: 100;
		color: rgba(204,204,204, 1);
	}
</style>