<template>
	<div class="home">
		<home-header></home-header>
		<main></main>
	</div>
</template>

<script>
    import HomeHeader from './home-header'

	export default {
		name: 'Home',
		components: { HomeHeader }
	}
</script>

<style scoped>
	main {
		height: 4500px;
		position: relative;
		top: 44px;
		left: 0;
		background: #ececec;
	}
</style>