<template>
	<div class="collection">
		<collection-header></collection-header>
		我是 我的收藏 页面
	</div>
</template>

<script>
	import CollectionHeader from './collection-header'

	const components = { CollectionHeader }

	export default {
		name: 'Collection',
		components
	}
</script>

<style scoped>
	.collection{
		display: flex;
		flex-direction: column;
		position: relative;

		font-size: 20px;
		color: #fff;
		text-align: center;
	}
</style>