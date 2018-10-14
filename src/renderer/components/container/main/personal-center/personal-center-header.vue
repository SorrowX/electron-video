<template>
	<div class="personal-center-header">
	    <base-logo :title="'个人中心'"></base-logo>
	</div>
</template>

<script>
    import BaseLogo from '@/components/base/base-logo'

    const components = { BaseLogo }

	export default {
		name: 'PersonalCenterHeader',
		components
	}
</script>

<style scoped>
	.personal-center-header{
	    flex: none;
		width: 100%;
		height: 39px;
		background-color: var(--common-header-bg-color);
	}
</style>