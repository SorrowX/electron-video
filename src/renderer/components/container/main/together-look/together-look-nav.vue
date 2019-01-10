<template>
	<base-nav
	    :navArrList="navArr"
	    @click-nav="handlerClickNav"
	    ref="baseNavComponent"
	>
		<span @click.self="openSettingPage">设置</span>
	</base-nav>
</template>

<script>
	import { mapState } from 'vuex'
	import BaseNav from '@/components/base/base-nav'
	import CommonMiXin from '@/mixin/common-mixin'

	export default {
		name: 'TogetherLookNav',
		components: { BaseNav },
		mixins: [ CommonMiXin ],
		computed: {
			...mapState('quickView', ['navArr'])
		},
		methods: {
			handlerClickNav(index, nav) {
				this.$emit('click-nav', nav)
			},
			openSettingPage() {
				this.$emit('play')
				console.log('处理设置页面')
			}
		}
	}
</script>

<style scoped>
</style>
