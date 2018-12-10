<template>
	<!-- <transition name="slide"> -->
		<div class="video-list">
			<base-back :title="tag"></base-back>
			<div class="list">
				<classic-video-list :tag="tag"></classic-video-list>
			</div>
		</div>
	<!-- </transition> -->
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
		},
		methods: {
			tap() {
                this.$router.go(-1)
			},
			tap2() {
                this.$router.push({ name: 'home' })
			}
		},
		activated() {
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

	.slide-enter-active, .slide-leave-active {
        transition: all .35s ease;
	}
	.slide-enter, .slide-leave-to {
	    /*opacity: 0;*/
	    transform: translate3d(100%, 0, 0);
	}
</style>