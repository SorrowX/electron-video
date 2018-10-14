<template>
	<div class="cache-header">
	    <base-logo :title="'快速查看'"></base-logo>
	</div>
</template>

<script>
    import BaseLogo from '@/components/base/base-logo'

    const components = { BaseLogo }

	export default {
		name: 'QuickViewHeader',
		components
	}
</script>

<style scoped>
	.cache-header{
	    flex: none;
		width: 100%;
		height: 39px;
		background-color: var(--common-header-bg-color);
	}
</style>