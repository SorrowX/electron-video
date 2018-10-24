<template>
	<base-lazy-load-img 
	    mode="default"
        :time="300"
        :done="true"
        :position="{ top: 0, right: 0, bottom: 0, left: 0 }"
	    @success="handleImgsuccess" 
	    @error="handleImgerror">
	    <ul class="ul-list" v-if="arrMedia.length > 0">
			<li v-for="(media, index) in arrMedia" @click="goPlayPage(media)">
				<a href="#">
					<img :src="defaultBgImg" :data-src="media['imgUrl']" alt="">
				</a>
				<p>{{ media['filename'] }}</p>
			</li>
		</ul>
	</base-lazy-load-img>
</template>

<script>
    import BaseLazyLoadImg from '../../../../base/base-lazy-load-img'

    const defaultBgImg = require('../../../../../assets/bg/dark/hDefault.jpg')
    const errorBgImg = require('../../../../../assets/bg/dark/hDefault.jpg')

	export default {
		name: 'QuickViewMainContent',
		components: { BaseLazyLoadImg },
		props: {
			arrMedia: {
				type: Array,
				default: function() {
					return []
				}
			}
		},
		data() {
			return {
				defaultBgImg
			}
		},
		methods: {
			goPlayPage(media) {
				this.$root.$emit('window-bar-show-back-arrow', true)
				let movieComponent = this.$root.appMovieComponent
				movieComponent.play({
					videoUrl: media.videoUrl,
					videoPoster: media.imgUrl
				})
			},
			handleImgsuccess(el) {
				el.classList.add('img-success')
			},
			handleImgerror(el) {
				el.src = errorBgImg
			}
		}
	}
</script>

<style scoped>
	.ul-list {
		display: flex;
		flex-wrap: wrap;
	}

	.ul-list li {
		display: block;
		width: 180px;
		margin-right: 1.5%;
		margin-bottom: 3%;
	}

	.ul-list li a {
		display: block;
		width: 100%;
		height: 100px;
		overflow: hidden;
	}

	.ul-list li img {
		transition: all .35s;
		width: 100%;
		height: 100%;
	}
	
	.ul-list li img:hover {
		transform: scale(1.2);
	}

	.ul-list li p {
		width: 100%;
		max-height: 40px;
		font-size: 13px;
		color: rgba(204,204,204,1);

		overflow: hidden;
		text-overflow: ellipsis;

		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical; /* 多行溢出出现省略号 */

		/*white-space: nowrap;*/ /* 单行溢出出现省略号 */
	}
</style>