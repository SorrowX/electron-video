<template>
	<div class="home">
		<home-header></home-header>

		<home-nav 
		    @click-nav="loadData"
		>
		</home-nav>

		<div class="home-content">
            <media-recommend 
                :arrMedia="arrMedia"
            >
            </media-recommend>
		</div>
	</div>
</template>

<script>
	import HomeHeader from './home-header'
	import HomeNav from './home-nav'
	import MediaRecommend from './media-recommend/media-recommend'
	import { loopGeneratImg } from '../../../../../api/api'
	import CommonMixin from '@/mixin/common-mixin'

	const components = { HomeHeader, HomeNav, MediaRecommend }

	export default {
		name: 'Home',
		mixins: [ CommonMixin ],
		components,
		data() {
			return {
				arrMedia: []
			}
		},
		methods: {
			loadData(nav) {
				this.loadDataByNav(
					nav,
					(data) => {
						this.arrMedia = data
					}
				)
			}
		},
		activated() {
            // console.log('Home activated')
		},
		deactivated() {
			// console.log('Home deactivated')
		},
		mounted() {
			if (Array.isArray(this.navArr)) {
	            this.loadData(this.navArr[0])
            }
		}
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