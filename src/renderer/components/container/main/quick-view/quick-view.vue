<template>
	<div class="quick-view">
		<quick-view-header></quick-view-header>

		<quick-view-nav 
		    @no-nav-data="showTipComponent"
		    ref="navComponent"
		>
		</quick-view-nav>

		<quick-view-tip 
		    :show="showTip"
		>
		</quick-view-tip>

		<quick-view-add-or-update-nav
		    @commit="commitHandler"
		>
		</quick-view-add-or-update-nav>

		<!-- <quick-view-main></quick-view-main> -->
		<router-view></router-view>
	</div>
</template>

<script>
	import QuickViewHeader from './quick-view-header'
	import QuickViewNav from './quick-view-nav'
	import QuickViewTip from './quick-view-tip'
	import QuickViewAddOrUpdateNav from './quick-view-add-or-update-nav'
	import QuickViewMain from './quick-view-main/quick-view-main'
	import { mapState, mapActions } from 'vuex'

	const components = { 
		QuickViewHeader, 
		QuickViewNav, 
		QuickViewTip,
		QuickViewAddOrUpdateNav,
		QuickViewMain
	}

	export default {
		name: 'QuickView',
		components,
		data() {
			return {
				showTip: false
			}
		},
		computed: {
			...mapState('quickView', [
				'navArr'
			])
		},
		methods: {
			showTipComponent(bool) {
				this.showTip = bool
			},
			commitHandler() {
				let len = this.navArr.length - 1
				this.$refs.navComponent.handlerClickNav(len, this.navArr[len])
			}
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