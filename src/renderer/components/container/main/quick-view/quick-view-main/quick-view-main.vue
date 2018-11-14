<template>
	<div class="quick-view-main" v-show="show">
		<header>
			导入视频, 快速查看
		</header>
		<main>
			<transition mode="out-in">
				<quick-view-main-content 
				    v-if="arrMedia.length > 0 && loading === false" 
				    :arrMedia="arrMedia"
				>
				</quick-view-main-content>
				
				<quick-view-main-empty 
				    v-if="arrMedia.length === 0 && loading === false"
				>
				</quick-view-main-empty>

				<base-loading 
				    v-if="loading"
				    size="min"
				    :speedProgress="speedProgress"
				>
				</base-loading>
			</transition>
		</main>
	</div>
</template>

<script>
    import { loopGeneratImg } from '../../../../../../api/api'
    import BaseLoading from '@/components/base/base-loading'
    import CommonMixin from '@/mixin/common-mixin'
    import QuickViewMainContent from './quick-view-main-content'
    import QuickViewMainEmpty from './quick-view-main-empty'

	export default {
		name: 'QuickViewMain',
		mixins: [ CommonMixin ],
		components: { 
			BaseLoading, 
			QuickViewMainContent, 
			QuickViewMainEmpty
		},
		props: {
			nav: [ Object ], // 导航对象
			show: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				arrMedia: [], // 渲染数据
				loading: true,
				speedProgress: 0 // load进度
			}
		},
		watch: {
			nav(curNav) {
				this.loadData(curNav)
			}
		},
		methods: {
			loadData(nav) {
				nav = nav || this.nav
				this.loading = true
				this.loadDataByNav(
					nav,
					(data) => {
						this.loading = false
						this.arrMedia = data || []
					},
					(processData) => {
						this.speedProgress = processData['speedProgress']
					}
				)
			}
		}
	}
</script>

<style scoped>
	.quick-view-main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		padding: 0 1% 0 2.5%; /* li含有右边maring的1.5,所以需要减去 */
        overflow: auto;
	}

	.quick-view-main header {
		height: 65px;
		flex: none;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-size: 15px;
		color: #fff;
	}

	.quick-view-main main {
		height: 100%;
		flex-grow: 1;
	}
</style>