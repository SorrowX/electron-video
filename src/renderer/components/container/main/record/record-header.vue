<template>
	<div class="record-header">
	    <base-logo :title="'播放记录'"></base-logo>
	</div>
</template>

<script>
    import BaseLogo from '@/components/base/base-logo'

    const components = { BaseLogo }

	export default {
		name: 'RecordHeader',
		components
	}
</script>

<style scoped>
	.record-header{
	    flex: none;
		width: 100%;
		height: 39px;
		background-color: var(--common-header-bg-color);
	}
</style>