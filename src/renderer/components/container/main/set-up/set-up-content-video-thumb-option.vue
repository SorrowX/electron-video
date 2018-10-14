<template>
	<div class="video-thumb">
		<div class="title">视频缩略图操作</div>
		<div class="gen-img">
			<p>
			    进入操作页面
			    <button @click="$emit('video-thumb-page', 'VideoThumb')">Go</button>
			</p>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'VideoThumbOption'
	}
</script>

<style scoped>
	.video-thumb {
		margin: 40px 0;
	}

	.video-thumb>.title {
		margin-bottom: 30px;
	}

	.gen-img {
		font-size: 13px;
	}

	.gen-img button {
	    display: inline-block;
	    border: none;
	    padding: 3px 15px;
	    margin-left: 10px;
	    text-align: center;
	    text-decoration: none;
	    font-size: 10px;
	    border-radius: 2px;
	    color: rgba(204,204,204, 1);
	    background-color: #4CAF50; /* Green */
	}
</style>