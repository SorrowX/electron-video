<template>
	<div class="empty">
		<p>{{ title }}</p>
		<div class="tip">
			<p v-for="(tip, index) in tips">
			    {{ index + 1 }}. {{ tip }}
			</p>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'BaseEmptyTip',
		props: {
			title: {
				type: String,
				default: '标题'
			},
			tips: {
				type: Array,
				default: function() { return {} }
			}
		}
	}
</script>

<style scoped>
	/* 内容为空的 样式 */
	.empty {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: rgba(33,40,44,1);
	}

	.empty p {
		margin-bottom: 2%;
		font-size: 16px;
		color: #fff;
	}

	.empty .tip p {
		margin-bottom: 2%;
		font-size: 13px;
		color: rgba(153,153,153,1);
	}
</style>