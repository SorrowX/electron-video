<template>
	<div class="quick-view">
		<quick-view-header></quick-view-header>
		<quick-view-nav></quick-view-nav>
		<quick-view-content></quick-view-content>
	</div>
</template>

<script>
	import QuickViewHeader from './quick-view-header'
	import QuickViewNav from './quick-view-nav'
	import QuickViewContent from './quick-view-content'

	const components = { QuickViewHeader, QuickViewNav, QuickViewContent }

	export default {
		name: 'QuickView',
		components
	}
</script>

<style scoped>
	.quick-view {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		position: relative;
		overflow: hidden;
	}
</style>