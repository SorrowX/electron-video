<template>
	<div class="nav-panel">
		<base-back :title="'导航'"></base-back>
		我是可愛的導航
	</div>
</template>

<script>
	import BaseBack from '@/components/base/base-back'

	export default {
		name: 'NavPanel',
		components: { BaseBack },
	}
</script>

<style scoped>
	/* 导航面板 */
	.nav-panel {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999999;
		background: #fff;
	}
</style>