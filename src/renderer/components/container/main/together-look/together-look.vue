<template>
	<div class="vip">
		<vip-header></vip-header>
	</div>
</template>

<script>
	import VipHeader from './together-look-header'

	const components = { VipHeader }

	export default {
		name: 'TogetherLook',
		components
	}
</script>

<style scoped>
	.vip{
		height: 100%;
		display: flex;
		flex-direction: column;
		position: relative;
	}
</style>