<template>
	<transition>
		<div v-show="show" class="play-page">
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
	</transition>
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
				show: false,
				fadeName: 'movie-fade-right',
				videoUrl: '',
				videoPoster: ''
			}
		},
		methods: {
			isShow(bool) {
				this.show = bool
			},
			play(options) {
				let { videoUrl, videoPoster } = options
				this.isShow(true)
				this.videoUrl = videoUrl
				this.videoPoster = videoPoster
				this.$refs.moviePlayComponent.play()
			}
		},
		mounted() {
	        this.$root.appMovieComponent = this
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