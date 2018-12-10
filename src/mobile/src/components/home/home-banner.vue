<template>
	<div class="home-banner">
        <img :src="videoInfo['imgUrl']" v-finger:tap="play">
        <div class="identifier">LOVE</div>
        <div class="title">
        	{{ videoInfo['filename'] }}
        </div>
	</div>
</template>

<script>
	export default {
		name: 'HomeBanner',
		props: {
		    videoInfo: { // 接口返回数组中的视频对象
		        type: Object,
		        default: function() { return {} }
		    }
		},
		methods: {
			play() {
                let video = this.videoInfo
                if (video) {
                	this.$router.push({
                	    name: 'play',
                	    params: video
                	})
                }
            }
		}
	}
</script>

<style scoped>
	.home-banner {
		width: 100%;
		height: 4.2rem;
		position: relative;
		overflow: hidden;
	}

	.home-banner img {
		width: 100%;
		height: 100%;
		background-size: contain;
	}

	.identifier {
		width: 38px;
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