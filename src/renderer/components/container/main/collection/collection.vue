<template>
	<div class="collection">
		<collection-header></collection-header>
		<collection-content></collection-content>
	</div>
</template>

<script>
	import CollectionHeader from './collection-header'
	import CollectionContent from './collection-content'

	const components = { CollectionHeader, CollectionContent }

	export default {
		name: 'Collection',
		components
	}
</script>

<style scoped>
	.collection{
		height: 100%;
		display: flex;
		flex-direction: column;
		position: relative;
	}
</style>