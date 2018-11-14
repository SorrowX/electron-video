<template>
	<div class="recommend-film">
		<div class="tag">推荐</div>
		<base-lazy-load-img 
	        mode="default"
            :time="300"
            :done="true"
            :position="{ top: 0, right: 0, bottom: 0, left: 0 }"
            :diy="{ backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center' }"
		    @success="handleImgSuccess" 
		    @error="handleImgError"
		>
		    <div class="content" v-show="filmsData.length > 0">
		    	<div class="movie" v-for="(film, index) in filmsData">
		    		<div>
		    			<img :src="defaultBgImg" :data-src="film['genImgPath']" @click="play(film)">
		    		</div>
		    		<p>{{ film['filename'] }}</p>
		    	</div>
		    </div>
		</base-lazy-load-img>
	</div>
</template>

<script>
	import CommonMixin from '@/mixin/common-mixin'
	import BaseLazyLoadImg from '@/components/base/base-lazy-load-img'

	export default {
		name: 'MediaRecommendInfoDetailsFilm',
		mixins: [ CommonMixin ],
		components: { BaseLazyLoadImg },
		props: {
		    show: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				films: []
			}
		},
		watch: {
			show(val) {
				if (val) {
					this.getRandomVideoData((data) => {
						this.films = data
					})
				} else {
					this.films = []
				}
			}
		},
        computed: {
        	filmsData() {
        		let arr = this.films.map((film) => {
        			return film
        		})
        		if (arr.length >= 6) {
        			arr.length = 6
        		}
        		return arr
        	}
        },
        methods: {
            play(film) {
            	this.playVideo(film)
            }
        }
	}
</script>

<style scoped>
	.recommend-film {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 16px 0 0 20px;
	}

	/* tag 样式 */
	.tag {
		height: 40px;
		margin-bottom: 12px;
		color: #fff;
		font-size: 21px;
		line-height: 40px;
	}

	.content {
		width: 100%;
		display: flex;
		flex-wrap: wrap;

		justify-content: space-between;
	}

	/* 推荐电影样式 */
	.movie {
		margin: 1% 4% 20px 0;
	}

	.movie>div {
		width: 180px;
		height: 100px;
		margin-bottom: 2%;
		overflow: hidden;
	}

	.movie>div>img {
		width: 100%;
		height: 100%;
	}

	.movie>div>img:hover {
		cursor: pointer;
	}

	.movie>p {
		width: 180px;
		overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    color: rgba(204,204,204,1);
	}

	/* 推荐电影 样式(这个和爱奇艺一样的ui,因为内容多,舍去) */
	.content .film:nth-child(even) {
		padding-left: 4%;
	}
	
	.film {
		width: 50%;
		height: 170px;
		display: flex;
		margin-bottom: 25px;
		/*border: 1px solid green;*/
	}

	/* 推荐电影封面 样式 */
	.film-cover {
		flex: none;
		width: 114px;
		height: 100%;
		overflow: hidden;
	}

	.film-cover>img {
		width: 100%;
		height: 100%;
	}

	.film-cover>img:hover {
		cursor: pointer;
	}

	/* 推荐电影信息 样式 */
	.film-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 0 15px 0px 15px;
		overflow: hidden;
	}

	.information {
		display: flex;
		align-items: center;
		margin-bottom: 8px;
	}

	.information span:nth-child(1) {
		display: block;
		min-width: 35%;
		padding-right: 8%;
	}

	.information span:nth-child(2) {
		display: block;
		align-self: flex-end;
	}

	.information span {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.title {
		color: #fff;
		font-size: 14px;
	}

	.performer {
		color: rgba(135,135,135,1);
		font-size: 10px;
	}

	/* 推荐电影介绍 样式 */
	.introduce {
		flex: 1;
		overflow: auto;
	}

	.introduce p {
		text-indent: 20px;
		color: rgba(135,135,135,1);
		font-size: 11px;
	}

	/* 隐藏滚动条 样式 */
	.introduce::-webkit-scrollbar {
		display: none;
	}
</style>