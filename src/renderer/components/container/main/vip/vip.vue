<template>
	<div class="vip">
		<vip-header></vip-header>
		<div class="later-dev">
			<i class="bg-img"></i>
			<p>小徐：因为不充钱,所以不开发,这解释过吗...</p>
		</div>
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
		height: 100%;
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.later-dev {
		flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
	}

	.later-dev>.bg-img {
        display: block;
        width: 120px;
        height: 120px;
        background-image: url(../../../../assets/vv.gif);
        background-size: contain;
	}

	.later-dev>p {
		margin-top: 20px;
		font-size: 14px;
		color: rgba(183,174,168,1);
	}
</style>