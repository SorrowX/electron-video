<template>
	<div class="record">
		<record-header></record-header>
		我是 播放记录 页面
	</div>
</template>

<script>
	import RecordHeader from './record-header'

	const components = { RecordHeader }

	export default {
		name: 'Record',
		components
	}
</script>

<style scoped>
	.record{
		display: flex;
		flex-direction: column;
		position: relative;

		font-size: 20px;
		color: #fff;
		text-align: center;
	}
</style>