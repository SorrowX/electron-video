<template>
	<transition name="slide">
		<div class="video-list">
			<div class="test">
				<button v-finger:tap="tap">返回(浏览器返回)</button>
			</div>
			<div class="test">
				<button v-finger:tap="tap2">返回 (路由跳转)</button>
			</div>
			<div class="test">3</div>
			<div class="test">4</div>
			<div class="test">5</div>
			<div class="test">6</div>
		</div>
	</transition>
</template>

<script>
	export default {
		name: 'VideoList',
		data() {
			return {
			}
		},
		beforeRouteEnter (to, from, next) {
			next((vm) => {
				// console.log(vm.$route)
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
		background-color: #f60;
		z-index: 20;
	}

	.test {
		height: 300px;
		background-color: currentColor;
	}
	.test:nth-child(1) {
		background-color: #eee;
	}
	.test:nth-child(2) {
		background-color: #ccc;
	}
	.test:nth-child(3) {
		background-color: #f60;
	}
	.test:nth-child(4) {
		background-color: green;
	}
	.test:nth-child(5) {
		background-color: red;
	}
	.test:nth-child(6) {
		background-color: currentColor;
	}

	.slide-enter-active, .slide-leave-active {
        transition: all .35s ease;
	}
	.slide-enter, .slide-leave-to {
	    /*opacity: 0;*/
	    transform: translate3d(100%, 0, 0);
	}
</style>