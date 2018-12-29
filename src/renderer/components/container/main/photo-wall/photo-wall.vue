<template>
	<div class="photo-wall">
		<photo-wall-header 
		    @change-data="handlerChangeData"
		    @show-type="handlerShowType"
		>
		</photo-wall-header>
		<photo-wall-content ref="wallComp"></photo-wall-content>
	</div>
</template>

<script>
    import PhotoWallHeader from './photo-wall-header'
    import PhotoWallContent from './photo-wall-content'

    const components = { PhotoWallHeader, PhotoWallContent }

	export default {
		name: 'PhotoWall',
		components,
		methods: {
			handlerChangeData() {
                this.$refs.wallComp.initPhoto()
			},
			handlerShowType(bool) {
				this.$refs.wallComp.setShowType(bool)
			}
		}
	}
</script>

<style scoped>
	.photo-wall {
		height: 100%;
		display: flex;
		flex-direction: column;
		position: relative;
	}
</style>