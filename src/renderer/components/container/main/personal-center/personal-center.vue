<template>
	<div class="personal-center">
		<personal-center-header></personal-center-header>
		我是 个人中心 页面
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
		display: flex;
		flex-direction: column;
		position: relative;

		font-size: 20px;
		color: #fff;
		text-align: center;
	}
</style>