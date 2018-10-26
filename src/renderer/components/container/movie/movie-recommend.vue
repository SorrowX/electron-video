<template>
	<div class="movie-recommend">
		<div class="you-like">猜你喜欢</div>
		<div class="like-list">
			<base-lazy-load-img 
			    mode="default"
		        :time="300"
		        :done="true"
		        :position="{ top: 0, right: 0, bottom: 0, left: 0 }"
			    @success="handleImgsuccess" 
			    @error="handleImgerror">
				<ul v-if="arrMedia.length > 0">
					<li 
					    v-for="(media, index) in arrMedia" 
					    @click="play(media, index)" 
					    :class="{ 'active': curMediaIndex == index }"
					>
						<div class="like-thumb">
							<img :src="defaultBgImg" :data-src="media['imgUrl']" alt="">
							<div class="time">{{ getTime() }}</div>
						</div>
						<div class="like-info">
							<p>{{ media['filename'] }}</p>
							<p>热度: {{ Math.ceil(Math.random() * 10000) }}</p>
						</div>
					</li>
				</ul>
			</base-lazy-load-img>
		</div>
	</div>
</template>

<script>
	import BaseLazyLoadImg from '../../base/base-lazy-load-img'
	import CommonMixin from '@/mixin/common-mixin'

	export default {
		name: 'MovieRecommend',
		mixins: [ CommonMixin ],
		components: { BaseLazyLoadImg },
		data() {
			return {
				arrMedia: [],
				curMediaIndex: -1
			}
		},
		methods:{
			handleImgsuccess(el) {
				el.classList.add('img-success')
			},
			handleImgerror(el) {
				el.src = this.errorBgImg
			},
			play(data, index) {
				this.curMediaIndex = index
				data.videoPoster = data.imgUrl
				this.$parent.play(data)
			},
			getRandomNumber() {
				let arr = [0,1,2,3,4,5,6,7,8,9]
				return Math.floor(Math.random() * arr.length)
			},
			getTime() {
				return `${this.getRandomNumber()}${this.getRandomNumber()}:${this.getRandomNumber()}${this.getRandomNumber()}`
			},
			randomLoadData(navArr) {
				if (navArr.length === 0) return
				let nav = navArr[Math.floor(Math.random() * navArr.length)]
                this.loadVideoData(
                	nav['videoDirPath'], 
                	nav['imgDirPath'], 
                	(data) => {
                    	this.arrMedia = data
                    }
                )
			}
		},
		mounted() {
			this.$watch('navArr', (val) => {
				this.randomLoadData(val)
			})
			this.randomLoadData(this.navArr)
		}
	}
</script>

<style scoped>
	.movie-recommend {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.you-like,
	.like-list {
		padding: 0 20px 0 12px;
	}

	.you-like {
		flex: none;
		height: 55px;
		line-height: 55px;
		color: rgba(255,255,255,1);
		font-size: 22.5px;
	}

	.like-list {
		flex: 1;
		overflow: auto;
	}

	.like-list ul {
		display: flex;
		flex-direction: column;
	}

	.active div .time,
	.active .like-info p:nth-child(1),
	.active .like-info p:nth-child(2) {
		color: rgba(11,190,6,1);
	}

	.like-list ul li {
		display: flex;
		width: 100%;
		height: 80px;
		background-color: rgba(75,75,80,1);
		margin-bottom: 20px;
	}

	.like-list ul li:hover {
		cursor: pointer;
	}

	.like-thumb {
		width: 140px;
		height: 100%;
		flex: none;
		position: relative;
	}

	.like-thumb img {
		width: 100%;
		height: 100%;
	}

	.like-thumb .time {
		width: 42px;
		height: 24px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0,0,0,.6);
		position: absolute;
		right: 0;
		bottom: 0;
		color: #fff;
	}

	.like-info {
		flex: 1;
		padding: 5px 10px 5px 10px;
		overflow: hidden;
	}

	.like-info p:nth-child(1) {
		max-height: 52px;
		font-size: 12px;
		color: rgba(255,255,255,1);
		margin-bottom: 8px;

		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical; /* 多行溢出出现省略号 */
		overflow: hidden;
	}

	.like-info p:nth-child(2) {
		font-size: 11px;
		color: rgba(148,148,148,1);
	}
</style>