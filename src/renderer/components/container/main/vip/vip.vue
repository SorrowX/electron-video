<template>
	<div class="vip">
		<vip-header></vip-header>
		我是 VIP会员 页面
	</div>
</template>

<script>
	import VipHeader from './vip-header'

	const components = { VipHeader }

	export default {
		name: 'Vip',
		components
	}
</script>

<style scoped>
	.vip{
		display: flex;
		flex-direction: column;
		position: relative;

		font-size: 20px;
		color: #fff;
		text-align: center;
	}
</style>