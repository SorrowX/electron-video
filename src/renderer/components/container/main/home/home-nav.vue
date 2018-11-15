<template>
	<base-nav
	    :navArrList="navArr"
	    @click-nav="handlerClickNav"
	    ref="baseNavComponent"
	>
		<i class="nav-operate-img"></i>
		<span>导航</span>
	</base-nav>
</template>

<script>
	import { mapState } from 'vuex'
	import BaseNav from '@/components/base/base-nav'

	export default {
		name: 'HomeNav',
		components: { BaseNav },
		computed: {
			...mapState('quickView', ['navArr'])
		},
		methods: {
			handlerClickNav(index, nav) {
				this.$emit('click-nav', nav)
			},
			correctNavIndex(index) {
				this.$refs.baseNavComponent.correctNavIndex(index)
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
