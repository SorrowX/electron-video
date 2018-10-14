<template>
	<div class="set-up-header">
	    <base-logo :title="'设置'"></base-logo>
	</div>
</template>

<script>
    import BaseLogo from '@/components/base/base-logo'

    const components = { BaseLogo }

	export default {
		name: 'SetUpHeader',
		components
	}
</script>

<style scoped>
	.set-up-header{
	    flex: none;
		width: 100%;
		height: 39px;
		background-color: var(--common-header-bg-color);
	}
</style>