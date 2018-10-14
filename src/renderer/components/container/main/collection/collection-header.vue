<template>
	<div class="collection-header">
	    <base-logo :title="'我的收藏'"></base-logo>
	</div>
</template>

<script>
    import BaseLogo from '@/components/base/base-logo'

    const components = { BaseLogo }

	export default {
		name: 'CollectionHeader',
		components
	}
</script>

<style scoped>
	.collection-header{
	    flex: none;
		width: 100%;
		height: 39px;
		background-color: var(--common-header-bg-color);
	}
</style>