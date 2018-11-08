<template>
	<div class="channel-content-movie">
		<main class="channel-content-movie-main">
			<div class="movie-list">
				<ul class="movie-list-ul">
					<li>
						<img src="../../../../../assets/bg/DefaultImage/Assets/Dark/focusDefault.jpg" alt="">
						<i>11-06期</i>
						<p>关于毒液你不知道的事关于毒液你不知道的事关于毒液你不知道的事</p>
						<span>飞碟一分钟第三季飞碟一分钟第三季飞碟一分钟第三季</span>
					</li>

					<li>
						<img src="../../../../../assets/bg/DefaultImage/Assets/Dark/focusDefault.jpg" alt="">
						<p>关于毒液你不知道的事</p>
						<span>飞碟一分钟第三季</span>
					</li>

					<li>
						<img src="../../../../../assets/bg/DefaultImage/Assets/Dark/focusDefault.jpg" alt="">
						<p>关于毒液你不知道的事</p>
						<span>飞碟一分钟第三季</span>
					</li>

					<li>
						<img src="../../../../../assets/bg/DefaultImage/Assets/Dark/focusDefault.jpg" alt="">
						<p>关于毒液你不知道的事</p>
						<span>飞碟一分钟第三季</span>
					</li>

					<li>
						<img src="../../../../../assets/bg/DefaultImage/Assets/Dark/focusDefault.jpg" alt="">
						<p>关于毒液你不知道的事</p>
						<span>飞碟一分钟第三季</span>
					</li>

					<li>
						<img src="../../../../../assets/bg/DefaultImage/Assets/Dark/focusDefault.jpg" alt="">
						<p>关于毒液你不知道的事</p>
						<span>飞碟一分钟第三季</span>
					</li>

					<li>
						<img src="../../../../../assets/bg/DefaultImage/Assets/Dark/focusDefault.jpg" alt="">
						<p>关于毒液你不知道的事</p>
						<span>飞碟一分钟第三季</span>
					</li>
				</ul>
			</div>
		</main>
	</div>
</template>

<script>
	export default {
		name: 'ChannelContentNav'
	}
</script>

<style scoped>
	.channel-content-movie {
		position: absolute;
		width: 100%;
		height: 100%;
		overflow: auto;
	}

	.channel-content-movie-main {
		width: 100%;
		height: 1500px;
		padding-left: 22px;
		padding-right: 22px;
	}

	.movie-list {
		width: 100%;
		overflow: hidden;
	}
	.movie-list-ul {
		display: inline-flex;
		transition: all .35s;
	}
	.movie-list-ul li {
		flex: none;
		width: 180px;
		display: inline-block;
		margin-right: 14px;
		position: relative;
	}
	.movie-list-ul>li>img {
		width: 100%;
		height: 95px;
	}
	.movie-list-ul>li>i {
		display: flex;
		justify-content: center;
		align-items: center;
        position: absolute;
        height: 22px;
        width: 52px;
        background-color: rgba(0,0,0,.6);
        right: 0;
        top: 73px;
        color: #fff;
        font-style: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
	}
	.movie-list-ul>li>p {
        font-size: 14px;
        color: rgba(204,204,204,1);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        margin-bottom: 2px;
	}
	.movie-list-ul>li>span {
		display: block;
        color: rgba(102,102,102,1);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
	}
</style>