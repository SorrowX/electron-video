<template>
	<div class="home">
		<home-header></home-header>
		<main>
			<home-nav></home-nav>

			<home-banner
			    :videoInfo="bannerVideoInfo"
			>
			</home-banner>

			<home-collect
			    :videoList="collectVideoList"
			></home-collect>

			<home-channel></home-channel>
		</main>
	</div>
</template>

<script>
    import HomeHeader from './home-header'
    import HomeNav from './home-nav'
    import HomeBanner from './home-banner'
    import HomeCollect from './home-collect'
    import HomeChannel from './home-channel'

    import { getCollectVideoListFromApi } from '@/api/api'

	export default {
		name: 'Home',
		components: { HomeHeader, HomeNav, HomeBanner, HomeCollect, HomeChannel },
		data() {
			return {
				bannerVideoInfo: {},
				collectVideoList: []
			}
		},
		methods: {
            async getCollectVideoList() {
            	let ret = await getCollectVideoListFromApi()
            	if (ret.status === 200 && ret.data.code === 0) {
            		let arr = ret.data.data
            		this.bannerVideoInfo = arr.splice(0, 1)[0]
                    this.collectVideoList = arr
            	}
            }
		},
		mounted() {
			this.getCollectVideoList()
		}
	}
</script>

<style scoped>
	main {
		position: relative;
		top: 44px;
		left: 0;
	}
</style>