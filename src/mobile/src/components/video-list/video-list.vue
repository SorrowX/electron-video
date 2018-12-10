<template>
	<div class="video-list">
		<base-back :title="tag"></base-back>
		<div class="list">
			<classic-video-list :tag="tag"></classic-video-list>
		</div>
	</div>
</template>

<script>
    import BaseBack from '@/components/base/base-back'
    import ClassicVideoList from './classic-video-list'

	export default {
		name: 'VideoList',
		components: { BaseBack, ClassicVideoList },
		data() {
			return {
				tag: ''
			}
		},
		beforeRouteEnter (to, from, next) {
			next((vm) => {
				vm.tag = vm.$route.params.tag
			})
		},
		beforeRouteLeave (to, from, next) {
			next()
		}
	}
</script>

<style scoped>
	.video-list {
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		z-index: 20;
	}

	.list {
		position: relative;
		/*top: 44px;*/
		top: 0;
	}
</style>