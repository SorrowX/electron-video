<template>
	<div class="quick-view">
		<quick-view-header></quick-view-header>

		<quick-view-nav 
		    ref="navComponent"
		    @click-nav="updateQuickViewMainData"
		>
		</quick-view-nav>

		<quick-view-main
		    :show="navArr.length > 0"
		    ref="viewMainComponent"
		></quick-view-main>

		<quick-view-tip
		    :show="navArr.length === 0"
		></quick-view-tip>

		<!-- 导航添加修改设置相关组件 -->
		<quick-view-add-or-update-nav 
		    @update-quick-view-main-content="updateQuickViewMainData"
		>
		</quick-view-add-or-update-nav>

		<qucik-view-setting></qucik-view-setting>
	</div>
</template>

<script>
	import QuickViewHeader from './quick-view-header'
	import QuickViewNav from './quick-view-nav'
	import QuickViewTip from './quick-view-tip'
	import QuickViewAddOrUpdateNav from './quick-view-add-or-update-nav'
	import QucikViewSetting from './qucik-view-setting'
	import QuickViewMain from './quick-view-main/quick-view-main'
	import { mapState, mapActions } from 'vuex'

	const components = { 
		QuickViewHeader, 
		QuickViewNav, 
		QuickViewTip,
		QuickViewAddOrUpdateNav,
		QucikViewSetting,
		QuickViewMain
	}

	export default {
		name: 'QuickView',
		components,
		computed: {
			...mapState('quickView', ['navArr'])
		},
		methods: {
			// 根据nav载入数据
			updateQuickViewMainData(nav) {
				this.$refs.navComponent.correctNavIndex(nav)
				this.$refs.viewMainComponent.loadData(nav)
			},
			loadDefaultData() {
				if (this.navArr.length > 0) {
					this.updateQuickViewMainData(this.navArr[0])
				}
			}
		},
		mounted() {
			this.loadDefaultData()
		}
	}
</script>

<style scoped>
	.quick-view {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		position: relative;
		overflow: hidden;
	}
</style>