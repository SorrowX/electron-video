<template>
	<div class="home">
		<home-header></home-header>

		<home-nav 
		    @click-nav="loadData"
		    ref="homeNavComponent"
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
	import { REFRESH_VUEX_STATE_MESSAGE } from '@/constant/index'

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
			},
			getFirstNavRenderData() {
				let navArr = this.navArr
				if (Array.isArray(navArr) && navArr.length > 0) {
		            this.loadData(navArr[0])
	            }
			}
		},
		mounted() {
			this.getFirstNavRenderData()
            this.$root.$on(REFRESH_VUEX_STATE_MESSAGE, () => {
				this.getFirstNavRenderData()
				this.$refs.homeNavComponent.correctNavIndex(0)
            })
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