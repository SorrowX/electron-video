<template>
	<div class="quick-view-main">
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
    import BaseLoading from '../../../../base/base-loading'
    import QuickViewMainContent from './quick-view-main-content'
    import QuickViewMainEmpty from './quick-view-main-empty'

	export default {
		name: 'QuickViewMain',
		components: { BaseLoading, QuickViewMainContent, QuickViewMainEmpty },
		props: {
			videoResourcePath: {
				type: String,
				default: ''
			},
			genImgResourcePath: {
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
		    // console.log('beforeRouteEnter')
		    next(vm => {
			    // console.log('beforeRouteEnter2', vm)
			    vm.loadData()
		    })
		},
		beforeRouteUpdate (to, from, next) {
		    // console.log('beforeRouteUpdate', to, this.videoResourcePath)
		    next()
		    // this.loadData()
		},
		beforeRouteLeave (to, from, next) {
		    // console.log('beforeRouteLeave')
		    next()
		},
		methods: {
			loadData() {
				if (!this.videoResourcePath ||
					!this.genImgResourcePath
				) {
					return
				}

				this.loading = true
				// console.log('路径打印:', this.videoResourcePath)
				loopGeneratImg({
					videoResourcePath: this.videoResourcePath,
					genImgResourcePath: this.genImgResourcePath,
					num: 0,
					delayRequest: 1000,
					imgTimeout: 1000,
					imgExtName: '.png'
				}).then((data) => {
					// console.log('导入视频结果: ', data)
					this.loading = false
					this.arrMedia = data
				})
			}
		},
		mounted() {
			// console.log('mounted')
			this.$watch('videoResourcePath', (path) => {
				// console.log('watch:', path)
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