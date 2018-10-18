<template>
	<div class="quick-view-main">
		<div class="header">
			导入视频, 快速查看
		</div>
		<main>
			<quick-view-main-content 
			    v-show="arrMedia.length > 0" 
			    :arrMedia="arrMedia"
			>
			</quick-view-main-content>

			<quick-view-main-empty 
			    v-show="arrMedia.length === 0 && loading === false"
			>
			</quick-view-main-empty>
			
			<base-loading 
			    size="min" 
			    v-show="loading"
			>
			</base-loading>
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
		data() {
			return {
				arrMedia: [],
				loading: false
			}
		},
		methods: {
			
		},
		mounted() {
			this.loading = true
			setTimeout(() => {
				loopGeneratImg({
					videoResourcePath: 'D:\\迅雷',
					genImgResourcePath: 'D:\\迅雷\\img',
					num: 20,
					delayRequest: 0,
					imgTimeout: 100,
					imgExtName: '.png'
				}).then((data) => {
					console.log('导入视频结果: ', data)
					this.loading = false
					this.arrMedia = data
				})
			}, 3000)
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