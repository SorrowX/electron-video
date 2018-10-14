<template>
	<div class="home">
		<home-header></home-header>
		<home-nav></home-nav>
		<div class="home-content">
            <media-recommend></media-recommend>
		</div>
	</div>
</template>

<script>
	import HomeHeader from './home-header'
	import HomeNav from './home-nav'
	import MediaRecommend from './media-recommend/media-recommend'

	const components = { HomeHeader, HomeNav, MediaRecommend }

	export default {
		name: 'Home',
		components
	}
</script>

<style scoped>
	.home {
		display: flex;
		flex-direction: column;
		height: 100%;
		position: relative;
	}

	.home-content {
		flex: 1;
		overflow: hidden;
	}

</style>