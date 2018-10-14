<template>
	<div class="home-header">
	    <base-logo :title="'首页'"></base-logo>
	    <base-search-box></base-search-box>
	</div>
</template>

<script>
    import BaseLogo from '@/components/base/base-logo'
    import BaseSearchBox from '@/components/base/base-search-box'

    const components = { BaseLogo, BaseSearchBox }

	export default {
		name: 'HomeHeader',
		components
	}
</script>

<style scoped>
	.home-header {
	    flex: none;
	    display: flex;
	    flex-direction: row;
	    justify-content: space-between;
		width: 100%;
		height: 39px;
		background-color: var(--common-header-bg-color);
	}
</style>