<template>
	<div class="personal-center">
		<personal-center-header></personal-center-header>
		<div class="later-dev">
			<i class="bg-img"></i>
			<p>小徐：这也没开发啊,我不想好了...</p>
		</div>
	</div>
</template>

<script>
    import PersonalCenterHeader from './personal-center-header'

    const components = { PersonalCenterHeader }

	export default {
		name: 'PersonalCenter',
		components
	}
</script>

<style scoped>
	.personal-center{
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
        background-image: url(../../../../assets/kf.gif);
        background-size: contain;
	}

	.later-dev>p {
		margin-top: 20px;
		font-size: 14px;
		color: rgba(183,174,168,1);
	}
</style>