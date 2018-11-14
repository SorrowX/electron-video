<template>
	<div class="channel-content">
		<channel-content-channel
		    @show-details="showDetails"
		>
		</channel-content-channel>

		<channel-content-movie 
		    ref="channelMovieComp"
		>
		</channel-content-movie>
	</div>
</template>

<script>
    import ChannelContentChannel from './channel-content-channel'
    import ChannelContentMovie from './channel-content-movie/channel-content-movie'
    const components = { ChannelContentChannel, ChannelContentMovie }
	export default {
		name: 'ChannelContent',
		components,
		methods: {
			showDetails(channel) {
				this.$refs.channelMovieComp.isShow(true, channel.tag)
			}
		}
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