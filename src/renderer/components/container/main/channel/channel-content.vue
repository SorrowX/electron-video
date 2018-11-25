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

		<base-loading 
		    v-show="loading"
		    size="min" 
		    :showBg="true"
		>
		</base-loading>
	</div>
</template>

<script>
	import BaseLoading from '@/components/base/base-loading'
    import ChannelContentChannel from './channel-content-channel'
    import ChannelContentMovie from './channel-content-movie/channel-content-movie'
    const components = { ChannelContentChannel, ChannelContentMovie, BaseLoading }
	export default {
		name: 'ChannelContent',
		components,
		data() {
			return {
				loading: false
			}
		},
		methods: {
			showDetails(channel) {
				this.loading = true
				this.$refs.channelMovieComp.isShow(true, channel.tag, () => {
					this.loading = false
				})
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