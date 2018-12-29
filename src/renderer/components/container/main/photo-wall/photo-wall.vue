<template>
	<div class="photo-wall">
		<photo-wall-header></photo-wall-header>
	</div>
</template>

<script>
    import PhotoWallHeader from './photo-wall-header'

    const components = { PhotoWallHeader }

	export default {
		name: 'PhotoWall',
		components
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