<template>
	<div class="subscribe">
		<subscribe-header></subscribe-header>
		<div class="later-dev">
			<i class="bg-img"></i>
			<p>小徐：暂时没想好开发啥,以后告诉你...</p>
		</div>
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
        background-image: url(../../../../assets/ll.gif);
        background-size: contain;
	}

	.later-dev>p {
		margin-top: 20px;
		font-size: 14px;
		color: rgba(183,174,168,1);
	}
</style>