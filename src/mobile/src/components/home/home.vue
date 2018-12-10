<template>
	<!-- <transition name="slide"> -->
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

			<router-view />
		</div>
	<!-- </transition> -->
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
    .home {
    	position: absolute;
    	left: 0;
    	top: 0;
    	right: 0;
    }

	main {
		position: relative;
		top: 0;
		left: 0;
	}

	.slide-enter-active, .slide-leave-active {
        transition: all .35s ease;
	}
	.slide-enter, .slide-leave-to {
	    /*opacity: 0;*/
	    transform: translate3d(-100%, 0, 0);
	}
</style>