<template>
	<div class="record">
		<record-header></record-header>
		<record-content></record-content>
	</div>
</template>

<script>
	import RecordHeader from './record-header'
	import RecordContent from './record-content'

	const components = { RecordHeader, RecordContent }

	export default {
		name: 'Record',
		components
	}
</script>

<style scoped>
	.record {
		display: flex;
		height: 100%;
		flex-direction: column;
		position: relative;
	}
</style>