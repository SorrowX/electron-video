<template>
	<div class="help-feedback-header">
	    <base-logo :title="'帮助与反馈'"></base-logo>
	</div>
</template>

<script>
    import BaseLogo from '@/components/base/base-logo'

    const components = { BaseLogo }

	export default {
		name: 'HelpFeedbackHeader',
		components
	}
</script>

<style scoped>
	.help-feedback-header{
	    flex: none;
		width: 100%;
		height: 39px;
		background-color: var(--common-header-bg-color);
	}
</style>