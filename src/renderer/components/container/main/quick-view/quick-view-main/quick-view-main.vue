<template>
	<div class="quick-view-main" v-show="navArr && navArr.length > 0">
		<div class="header">
			导入视频, 快速查看
		</div>
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
			videoDirPath: {
				type: String,
				default: ''
			},
			imgDirPath: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				arrMedia: [],
				loading: true
			}
		},
		beforeRouteEnter (to, from, next) {
		    next(vm => {
			    vm.loadData()
		    })
		},
		beforeRouteUpdate (to, from, next) {
		    next()
		},
		beforeRouteLeave (to, from, next) {
		    next()
		},
		methods: {
			loadData() {
				if (!this.videoDirPath ||
					!this.imgDirPath
				) {
					return
				}

				this.loading = true
				this.loadVideoData(
					this.videoDirPath,
					this.imgDirPath,
					(data) => {
						this.loading = false
						this.arrMedia = data
					}
				)
			}
		},
		mounted() {
			this.$watch('videoDirPath', (path) => {
				this.loadData()
			})
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

	.header {
		height: 65px;
		flex: none;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-size: 15px;
		color: #fff;
	}

	main {
		height: 100%;
		flex-grow: 1;
	}
</style>