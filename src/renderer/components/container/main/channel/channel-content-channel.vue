<template>
	<div class="channel-content-channel">
		<main class="channel-content-channel-main">
			<dl>
				<dt>常用频道</dt>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
			</dl>

			<dl>
				<dt>全部频道</dt>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧电视剧电视剧电视剧电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
				<dd>
					<img src="../../../../assets/logo.png">
					电视剧
				</dd>
			</dl>
		</main>
	</div>
</template>

<script>
	export default {
		name: 'ChannelContentChannel'
	}
</script>

<style scoped>
	.channel-content-channel {
		position: absolute;
		width: 100%;
		height: 100%;
		overflow: auto;
		z-index: -1;
	}

	.channel-content-channel-main {
		padding-left: 22px;
		padding-right: 12px;
	}

	.channel-content-channel-main>dl {
	}

	.channel-content-channel-main>dl>dt {
		height: 64px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: sticky;
		top: 0;
		z-index: 10;
		font-size: 16px;
		color: rgba(204,204,204,1);
		background-color: rgba(27,34,38,1);
	}

	.channel-content-channel-main>dl>dd {
		width: 95px;
		height: 95px;
		display: inline-flex;
		margin-right: 10px;
		margin-bottom: 10px;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		transition: border .35s;
		border: 2px solid rgba(39,45,49,1);
		font-size: 13px;
		color: rgba(204,204,204,1);
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.channel-content-channel-main>dl>dd:hover {
		border: 2px solid rgba(10,190,5,1);
		cursor: pointer;
	}

	.channel-content-channel-main>dl>dd>img {
		width: 34px;
		height: 34px;
		margin: 10px 0 12px 0;
	}
</style>