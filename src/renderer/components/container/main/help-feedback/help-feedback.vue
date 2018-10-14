<template>
	<div class="help-feedback">
		<help-feedback-header></help-feedback-header>
		我是 帮助与反馈 页面
	</div>
</template>

<script>
    import HelpFeedbackHeader from './help-feedback-header'

    const components = { HelpFeedbackHeader }

	export default {
		name: 'HelpFeedback',
		components
	}
</script>

<style scoped>
	.help-feedback{
		display: flex;
		flex-direction: column;
		position: relative;

		font-size: 20px;
		color: #fff;
		text-align: center;
	}
</style>