<template>
	<div class="home-banner">
        <img src="http://r1.ykimg.com/050C00005BFE8EE4AD9AB73BF70D2121" alt="">
        <div class="vip">VIP</div>
        <div class="title">
        	火王之破晓之战
        </div>
	</div>
</template>

<script>
	export default {
		name: 'HomeBanner'
	}
</script>

<style scoped>
	.home-banner {
		width: 100%;
		height: 4.2rem;
		position: relative;
		background: #FAFAFA;
		overflow: hidden;
	}

	.home-banner img {
		width: 100%;
		height: 100%;
		background-size: contain;
	}

	.vip {
		width: 28px;
		height: 16px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		right: 5px;
		top: 5px;
		color: #fff;
		font-size: 12px;
		background-image: linear-gradient(46deg,rgba(255,147,19,0.8) 0%, rgba(255,102,00,0.8) 100%);
		box-shadow: 0 0 8px 0 rgba(255,110,0,0.20);
	}

	.title {
		position: absolute;
		bottom: 5px;
		left: 20px;
		font-size: 18px;
		color: #fff;
		font-weight: bold;
	}
</style>