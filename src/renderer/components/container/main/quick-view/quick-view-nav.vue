<template>
	<base-nav
	    :navArrList="navArr"
	    @click-nav="handlerClickNav"
	    ref="baseNavComponent"
	>
		<i class="nav-operate-img" @click="addNavPage"></i>
		<span @click.self="settingNavPage">设置</span>
	</base-nav>
</template>

<script>
    import { mapState } from 'vuex'
    import BaseNav from '@/components/base/base-nav'
    import { 
    	QUICK_VIEW_NAV_SHOW_UI_MESSAGE,
    	QUICK_VIEW_SETTING_NAV_SHOW_UI_MESSAGE 
    } from '@/constant/index'

	export default {
		name: 'QuickViewNav',
		components: { BaseNav },
		computed: {
			...mapState('quickView', ['navArr'])
		},
		methods: {
			handlerClickNav(index, nav) {
				this.$emit('click-nav', nav)
			},
			correctNavIndex(nav) {
				let i = this.navArr.indexOf(nav)
				if (i != -1) {
					this.$refs.baseNavComponent.correctNavIndex(i)
				}
			},
			addNavPage() {
				this.$root.$emit(QUICK_VIEW_NAV_SHOW_UI_MESSAGE, true, 'add')
			},
			settingNavPage() {
				this.$root.$emit(QUICK_VIEW_SETTING_NAV_SHOW_UI_MESSAGE, true)
			}
		}
	}
</script>

<style scoped>
	.nav-operate-img {
		display: block;
		height: 2px;
		width: 18px;
		margin-right: 10px;
		position: relative;
		background: rgba(11,190,6,1);
	}

	.nav-operate-img::after {
		content: "";
		width: 2px;
		height: 18px;
		position: absolute;
		left: 8px;
		top: -8px;
		background: rgba(11,190,6,1);
	}
</style>