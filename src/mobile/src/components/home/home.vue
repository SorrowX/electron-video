<template>
	<div class="home">
		<home-header></home-header>
		<main>
			<home-nav></home-nav>
			<home-banner></home-banner>
			<home-list></home-list>
		</main>
	</div>
</template>

<script>
    import HomeHeader from './home-header'
    import HomeNav from './home-nav'
    import HomeBanner from './home-banner'
    import HomeList from './home-list'

	export default {
		name: 'Home',
		components: { HomeHeader, HomeNav, HomeBanner, HomeList }
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