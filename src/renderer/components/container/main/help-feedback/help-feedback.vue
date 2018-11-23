<template>
	<div class="help-feedback">
		<help-feedback-header></help-feedback-header>
		<div class="later-dev">
			<i class="bg-img"></i>
			<p>小徐：大王, 我这就滚...</p>
		</div>
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
		height: 100%;
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.later-dev {
		flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
	}

	.later-dev>.bg-img {
        display: block;
        width: 120px;
        height: 120px;
        background-image: url(../../../../assets/gun.gif);
        background-size: contain;
	}

	.later-dev>p {
		margin-top: 20px;
		font-size: 14px;
		color: rgba(183,174,168,1);
	}
</style>