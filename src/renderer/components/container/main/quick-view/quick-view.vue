<template>
	<div class="quick-view">
		<quick-view-header></quick-view-header>
		<quick-view-content></quick-view-content>
	</div>
</template>

<script>
	import QuickViewHeader from './quick-view-header'
	import QuickViewContent from './quick-view-content'

	const components = { QuickViewHeader, QuickViewContent }

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