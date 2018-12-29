<template>
	<div class="photo-wall-header">
	    <base-logo :title="'照片墙'"></base-logo>
	</div>
</template>

<script>
    import BaseLogo from '@/components/base/base-logo'

    const components = { BaseLogo }

	export default {
		name: 'PhotoWallHeader',
		components
	}
</script>

<style scoped>
	.photo-wall-header{
	    flex: none;
		width: 100%;
		height: 39px;
		background-color: var(--common-header-bg-color);
	}
</style>