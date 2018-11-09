<template>
	<div class="channel-content-movie">
		<main class="channel-content-movie-main">
			<channel-content-movie-header></channel-content-movie-header>

			<channel-content-movie-recommend
				:rows="1"
			    :rowsObjArr="recommendObjArr"
			>
			</channel-content-movie-recommend>
			
			<channel-content-movie-list></channel-content-movie-list>
		</main>
	</div>
</template>

<script>
    import ChannelContentMovieHeader from './channel-content-movie-header'
    import ChannelContentMovieRecommend from './channel-content-movie-recommend'
    import ChannelContentMovieList from './channel-content-movie-list'
    import CommonMixin from '@/mixin/common-mixin'
    import { getRandomItemFromArr } from '@/util/index'

    const components = { 
    	ChannelContentMovieHeader,
    	ChannelContentMovieRecommend,
    	ChannelContentMovieList
    }

	export default {
		name: 'ChannelContentNav',
		mixins: [ CommonMixin ],
		components,
		data() {
			return {
                recommendObjArr: []
			}
		},
		methods: {
			getRecommendData() {
				let randomArr = getRandomItemFromArr(this.videoCollection, 7)
				this.recommendObjArr = [randomArr]
			}
		},
		mounted() {
			this.getRecommendData()
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
</style>