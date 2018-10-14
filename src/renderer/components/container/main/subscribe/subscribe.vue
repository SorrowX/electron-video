<template>
	<div class="subscribe">
		<subscribe-header></subscribe-header>
		我是订阅页面
	</div>
</template>

<script>
	import SubscribeHeader from './subscribe-header'

	const components = { SubscribeHeader }

	export default {
		name: 'Subscribe',
		components
	}
</script>

<style scoped>
	.subscribe{
		display: flex;
		flex-direction: column;
		position: relative;

		font-size: 20px;
		color: #fff;
		text-align: center;
	}
</style>