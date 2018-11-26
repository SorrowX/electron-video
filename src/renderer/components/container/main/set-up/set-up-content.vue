<template>
	<div class="set-up-content">
		<video-thumb-option 
		    @video-thumb-page="changeOperateComponent"
		>
		</video-thumb-option>

		<zoom-option></zoom-option>

		<save-storage-data
		    @operate-storage-page="changeOperateComponent"
		>
		</save-storage-data>
	</div>
</template>

<script>
    import VideoThumbOption from './set-up-content-video-thumb-option'
    import ZoomOption from './set-up-content-zoom-option'
    import SaveStorageData from './set-up-content-save-storage-data'

    const components = { VideoThumbOption, ZoomOption, SaveStorageData }

	export default {
		name: 'setUpContent',
		components,
		data() {
			return {
			}
		},
		methods: {
			changeOperateComponent(compName) {
                this.$emit('change-operate-component', compName)
			}
		}
	}
</script>

<style scoped>
	.set-up-content {
		font-size: 17px;
		font-weight: 100;
		color: rgba(204,204,204, 1);
	}
</style>