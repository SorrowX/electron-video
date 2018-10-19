<template>
	<div class="play-page">
		<div class="play-movie">
			<div class="movie">
				<movie-play 
				    :videoUrl="videoUrl" 
				    :poster="videoPoster" 
				    ref="moviePlayComponent"
				>
				</movie-play>
				<movie-info></movie-info>
			</div>
			<div class="recommend">
				<movie-recommend></movie-recommend>
			</div>
		</div>
	</div>
</template>

<script>
    import MoviePlay from './movie-play'
    import MovieInfo from './movie-info'
    import MovieRecommend from './movie-recommend'

    const components = { MoviePlay, MovieInfo, MovieRecommend }

	export default {
		name: 'Movie',
		components,
		data() {
			return {
				videoUrl: '',
				videoPoster: ''
			}
		},
		beforeRouteEnter (to, from, next) {
		    // 在渲染该组件的对应路由被 confirm 前调用
		    // 不！能！获取组件实例 `this`
		    // 因为当守卫执行前，组件实例还没被创建
		    // console.log('beforeRouteEnter')
		    next(vm => {
		        vm.$root.$emit('window-bar-show-back-arrow', true)
		    })
		},
		beforeRouteUpdate (to, from, next) {
		    // 在当前路由改变，但是该组件被复用时调用
		    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
		    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
		    // 可以访问组件实例 `this`
		    // console.log('beforeRouteUpdate')
		    next()
		},
		beforeRouteLeave (to, from, next) {
		    // 导航离开该组件的对应路由时调用
		    // 可以访问组件实例 `this`
		    // console.log('beforeRouteLeave')
		    next()
		    this.$root.$emit('window-bar-show-back-arrow', false)
		},
		methods: {
			play(videoUrl, videoPoster) {
				this.videoUrl = videoUrl
				this.videoPoster = videoPoster
				this.$refs.moviePlayComponent.play()
			}
		},
		mounted() {
	        console.log('播放视频数据: ', this.$route.params)
			const { videoUrl, imgUrl } = this.$route.params
			this.videoUrl = videoUrl
			this.videoPoster = imgUrl
		}
	}
</script>

<style scoped>
	.play-page {
	    height: 100%;
	    width: 100%;
	    position: absolute;
	    left: 0;
	    top: 0;
	}
	.play-movie {
		width: 100%;
		height: 100%;
		display: flex;
		overflow: hidden;
		background-color: #1B2226;
	}

	/* 电影相关 样式 */
	.movie {
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow: auto;
	}

	/* 喜欢内容相关 样式 */
	.recommend {
		width: 378px;
		flex: none;
		background-color: rgba(60,60,65,1);
		overflow: auto;
	}

	/* 隐藏 movie 滚动条 样式 */
	.movie::-webkit-scrollbar {
		display: none;
	}

	/* 喜欢内容滚动条 样式 */
	.recommend::-webkit-scrollbar {
		width: 4px;
		height: 4px;
	}

	.recommend::-webkit-scrollbar-track {
	    background-color: rgba(60,60,65,1);
	    border-radius: 10px;
	}

	.recommend::-webkit-scrollbar-thumb {
	    background-color: #525254;
	    border-radius: 10px;
	}

</style>