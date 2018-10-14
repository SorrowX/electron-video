<template>
	<div class="home-nav">
		<button @click="genImg">点我</button>
	</div>
</template>

<script>
	import { loopGeneratImg } from '../../../../../api/api'

	export default {
		name: 'HomeNav',
		methods: {
			genImg() {
				// console.log(this.$router)
				this.$router.push({ name: 'movie', params: { userId: 123 }})
				/*loopGeneratImg({
					videoResourcePath: 'D:\\迅雷',
					genImgResourcePath: 'D:\\迅雷\\img'
				}).then((data) => {
					console.log('hi', data)
				})*/
			}
		}
	}
</script>

<style scoped>
	.home-nav {
		flex: none;
		height: 40px;
		background-color: var(--common-header-bg-color);
	}
</style>