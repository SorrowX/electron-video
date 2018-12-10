<template>
	<div class="base-back">
		<div class="back" v-finger:tap="back">
			<i class="back-arrow"></i>
			<span>返回</span>
		</div>
		<div class="title">
			{{ title }}
		</div>
	</div>
</template>

<script>
	export default {
		name: 'BaseBack',
		props: {
            title: {
            	type: String,
            	default: '视频列表'
            }
		},
		methods: {
			back() {
				window.history.length > 1
			        ? this.$router.go(-1)
			        : this.$router.push('/')
			}
		}
	}
</script>

<style scoped>
	.base-back {
		width: 100%;
		max-width: 7.5rem;
		min-width: 6.4rem;
        height: 44px;
        display: flex;
		align-items: center;
        position: sticky;
        top: 0;
        left: 0;
        right: 0;
        z-index: 888;
        margin: auto;
        background-color: #fff;
        border-bottom: 1px solid #eee;
	}

	.back {
		height: 100%;
	    width: 60px;
		display: flex;
		align-items: center;
	}
	.back-arrow {
		display: block;
		width: 22px;
		height: 22px;
		background: url(../../assets/arrow-up.png);
		background-size: contain;
		transform: rotate(-90deg);
	}
	.title {
		position: absolute;
		left: 50%;
		top: 50%;
		right: 0;
		transform: translate(-50%, -50%);
		display: flex;
		justify-content: center;
	}
</style>