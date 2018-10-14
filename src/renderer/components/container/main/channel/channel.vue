<template>
	<div class="channel">
		<channel-header></channel-header>
		我是 频道 页面
	</div>
</template>

<script>
    import ChannelHeader from './channel-header'

    const components = { ChannelHeader }

	export default {
		name: 'Channel',
		components
	}
</script>

<style scoped>
	.channel{
		display: flex;
		flex-direction: column;
		position: relative;

		font-size: 20px;
		color: #fff;
		text-align: center;
	}
</style>