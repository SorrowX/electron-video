<template>
	<base-nav
	    :navArrList="navArr"
	    @click-nav="handlerClickNav"
	    ref="baseNavComponent"
	>
		<i class="nav-operate-img" @click.self="goChannelPage"></i>
		<span @click.self="goChannelPage">导航</span>
	</base-nav>
</template>

<script>
	import { mapState } from 'vuex'
	import BaseNav from '@/components/base/base-nav'
	import CommonMiXin from '@/mixin/common-mixin'

	export default {
		name: 'HomeNav',
		components: { BaseNav },
		mixins: [ CommonMiXin ],
		computed: {
			...mapState('quickView', ['navArr'])
		},
		methods: {
			handlerClickNav(index, nav) {
				this.$emit('click-nav', nav)
			},
			correctNavIndex(index) {
				this.$refs.baseNavComponent.correctNavIndex(index)
			},
			goChannelPage() {
				this.insideSwitchNav('Channel')
			}
		}
	}
</script>

<style scoped>
	.nav-operate-img {
		display: block;
		width: 18px;
		height: 18px;
		background-image: url(../../../../assets/channel2.scale-200.png);
		background-size: contain;
		margin-right: 10px; 
	}
</style>
