<template>
	<div class="subscribe-header">
	    <base-logo :title="'订阅'"></base-logo>
	</div>
</template>

<script>
    import BaseLogo from '@/components/base/base-logo'

    const components = { BaseLogo }

	export default {
		name: 'SubscribeHeader',
		components
	}
</script>

<style scoped>
	.subscribe-header{
	    flex: none;
		width: 100%;
		height: 39px;
		background-color: var(--common-header-bg-color);
	}
</style>