<template>
	<transition name="channel-fade">
		<div class="channel-content-movie" v-show="show">
			<main class="channel-content-movie-main">
				<channel-content-movie-header
				    ref="movieHeaderComp"
				>
				</channel-content-movie-header>

				<channel-content-movie-recommend
					:rows="1"
				    :rowsObjArr="recommendObjArr"
				>
				</channel-content-movie-recommend>
				
				<channel-content-movie-list
				    ref="movieListComp"
				>
				</channel-content-movie-list>

				<channel-content-movie-footer></channel-content-movie-footer>
			</main>
		</div>
	</transition>
</template>

<script>
    import ChannelContentMovieHeader from './channel-content-movie-header'
    import ChannelContentMovieRecommend from './channel-content-movie-recommend'
    import ChannelContentMovieList from './channel-content-movie-list'
    import ChannelContentMovieFooter from './channel-content-movie-footer'
    import CommonMixin from '@/mixin/common-mixin'
    import { getRandomItemFromArr } from '@/util/index'
    import { WINDOW_BAR_SHOW_BACK_ARROW_MESSAGE } from '@/constant/index'

    const components = { 
    	ChannelContentMovieHeader,
    	ChannelContentMovieRecommend,
    	ChannelContentMovieList,
    	ChannelContentMovieFooter
    }

    const delayTime = 1000

	export default {
		name: 'ChannelContentMovie',
		mixins: [ CommonMixin ],
		components,
		data() {
			return {
				show: false,
                recommendObjArr: []
			}
		},
		watch: {
			show(bool) {
				if (bool) {
					this.$root.$emit(WINDOW_BAR_SHOW_BACK_ARROW_MESSAGE, bool)
				}
			}
		},
		methods: {
			updateRecommendData() {
				let randomArr = getRandomItemFromArr(this.videoCollection, 20)
				this.recommendObjArr = [randomArr]
			},
			isShow(bool, tag, callback) {
				if (bool === true) {
					this.updateRenderData(tag).then(() => {
						setTimeout(() => {
							callback && callback()
							this.show = true
						}, delayTime)
					})
				} else {
					this.show = bool
				}
			},
			async updateRenderData(tag) {
                await this.$refs.movieHeaderComp.updateRenderData(tag) // 更新头部数据
                this.updateRecommendData() // 更新推荐数据
                await this.$refs.movieListComp.updateRenderData() // 更新列表数据
			}
		},
		mounted() {
			this.$root.channelMovieComponent = this
		}
	}
</script>

<style scoped>
	.channel-content-movie {
		position: absolute;
		width: 100%;
		height: 100%;
		overflow: auto;
		z-index: 1;
		background-color: rgba(27,34,38,1);
	}

	.channel-content-movie-main {
		width: 100%;
		height: 800px;
		padding-left: 22px;
		padding-right: 22px;
	}

	.channel-content-movie::-webkit-scrollbar {
		width: 3px;
		height: 4px;
	}

	.channel-fade-enter-active, 
	.channel-fade-leave-active {
	    transition: all .35s;
	}
	.channel-fade-enter, 
	.channel-fade-leave-to {
		transform: translate3d(100%, 0, 0);
	    opacity: 0;
	}
</style>