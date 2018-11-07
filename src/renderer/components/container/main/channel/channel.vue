<template>
	<div class="channel">
		<channel-header></channel-header>
		<channel-content></channel-content>
	</div>
</template>

<script>
    import ChannelHeader from './channel-header'
    import ChannelContent from './channel-content'

    const components = { ChannelHeader, ChannelContent }

	export default {
		name: 'Channel',
		components
	}
</script>

<style scoped>
	.channel{
		height: 100%;
		display: flex;
		flex-direction: column;
		position: relative;
	}
</style>