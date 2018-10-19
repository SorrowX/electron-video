<template>
	<div class="empty">
		<p>空空如也</p>
		<div class="course">
			<p>1. 进入设置中心 </p>
			<p>2. 点击 '进入操作页面' 旁边的 'Go' 按钮, 对选择好目录下的视频进行截图</p>
			<p>3. 然后回到 '导入视频,快速查看' 页面</p>
			<p>4. 选择视频资源文件夹内容即可</p>
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