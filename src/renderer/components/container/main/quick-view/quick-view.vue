<template>
	<div class="quick-view">
		<quick-view-header></quick-view-header>
		<quick-view-nav></quick-view-nav>
		<quick-view-main></quick-view-main>
	</div>
</template>

<script>
	import QuickViewHeader from './quick-view-header'
	import QuickViewNav from './quick-view-nav'
	import QuickViewMain from './quick-view-main/quick-view-main'

	const components = { QuickViewHeader, QuickViewNav, QuickViewMain }

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