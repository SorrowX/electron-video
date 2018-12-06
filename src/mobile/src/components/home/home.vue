<template>
	<div class="home">
		<home-header></home-header>
		<main>
			<home-nav></home-nav>
		</main>
	</div>
</template>

<script>
    import HomeHeader from './home-header'
    import HomeNav from './home-nav'

	export default {
		name: 'Home',
		components: { HomeHeader, HomeNav }
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