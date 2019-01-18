<template>
	<div class="together-look-header">
	    <base-logo :title="'一起看(暂停开发)'"></base-logo>
	</div>
</template>

<script>
    import BaseLogo from '@/components/base/base-logo'

    const components = { BaseLogo }

	export default {
		name: 'TogetherLookHeader',
		components
	}
</script>

<style scoped>
	.together-look-header{
	    flex: none;
	    display: flex;
	    flex-direction: row;
	    justify-content: space-between;
		width: 100%;
		height: 39px;
		background-color: var(--common-header-bg-color);
	}
</style>