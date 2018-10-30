<template>
	<div class="collection">
		<collection-header
		    @open-select-collection="openSelectUI"
		    @delete-collection="deleteCollectionVideo"
		>
		</collection-header>
		<collection-content ref="collContentComp"></collection-content>
	</div>
</template>

<script>
	import CollectionHeader from './collection-header'
	import CollectionContent from './collection-content'

	const components = { CollectionHeader, CollectionContent }

	export default {
		name: 'Collection',
		components,
		methods: {
			openSelectUI(bool) {
				this.$refs.collContentComp.openSelectUI(bool)
			},
			deleteCollectionVideo() {
				this.$refs.collContentComp.deleteCollectionVideo()
			}
		}
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