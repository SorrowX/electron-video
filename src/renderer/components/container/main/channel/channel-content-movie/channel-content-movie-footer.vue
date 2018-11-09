<template>
	<footer class="channel-content-movie-footer">
		<span>悦享品质</span>
		<span>Always Fun, Always Fine</span>
	</footer>
</template>

<script>
	export default {
		name: 'ChannelContentMovieFooter'
	}
</script>

<style scoped>
	.channel-content-movie-footer {
        height: 150px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
	}

	.channel-content-movie-footer span {
		color: rgba(204,204,204,1);
	}

	.channel-content-movie-footer span:nth-child(1) {
		font-size: 16px;
		letter-spacing: 30px;
	}

	.channel-content-movie-footer span:nth-child(2) {
		font-size: 12px;
		letter-spacing: 1px;
		margin-left: -28px;
	}
</style>