<template>
	<div class="channel-content">
		<!-- <channel-content-nav></channel-content-nav> -->
		<channel-content-movie></channel-content-movie>
	</div>
</template>

<script>
    import ChannelContentNav from './channel-content-nav'
    import ChannelContentMovie from './channel-content-movie/channel-content-movie'
    const components = { ChannelContentNav, ChannelContentMovie }
	export default {
		name: 'ChannelContent',
		components
	}
</script>

<style scoped>
	.channel-content {
		flex: 1;
		height: 100%;
		background-color: rgba(27,34,38,1);
		position: relative;
		overflow: hidden;
	}
</style>