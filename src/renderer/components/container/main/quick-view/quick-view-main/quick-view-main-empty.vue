<template>
	<div class="empty">
		<p>空空如也</p>
		<div class="course">
			<p>1. 暂无数据</p>
			<p>2. 拖入含有视频的文件夹试试 </p>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'QuickViewMainEmpty'
	}
</script>

<style scoped>
	/* 内容为空的 样式 */
	.empty {
		width: 98.5%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: rgba(39,45,49,1);
	}

	.empty p {
		margin-bottom: 2%;
		font-size: 16px;
		color: #fff;
	}

	.empty .course p {
		margin-bottom: 2%;
		font-size: 12px;
		color: rgba(153,153,153,1);
	}
</style>