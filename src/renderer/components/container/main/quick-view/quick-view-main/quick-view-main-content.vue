<template>
	<base-lazy-load-img 
	    mode="default"
        :time="300"
        :done="true"
        :position="{ top: 0, right: 0, bottom: 0, left: 0 }"
	    @before="handleImgbefore" 
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
    import { loopGeneratImg } from '../../../../../../api/api'

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
				this.$root.$emit('window-bar-set-last-route-path', this.$route.fullPath)
                this.$router.push({
                	name: 'movie',
                	params: media
                })
			},
			handleImgbefore() {
				console.log('handleImgbefore')
			},
			handleImgsuccess(el) {
				console.log('handleImgsuccess')
				el.classList.add('success')
			},
			handleImgerror(el) {
				console.log('handleImgerror')
				el.src = errorBgImg
			},
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

	.success {
	    animation: fadeIn 1s ease-out 0.1s 1 both;

	    /*animation: name duration timing-function delay iteration-count direction fill-mode play-state;*/
	    /*animation-name: keyframename|none; animation-name 属性为 @keyframes 动画指定名称。*/
	    /*animation-duration: time; animation-duration属性定义动画完成一个周期需要多少秒或毫秒。*/
	    /*animation-timing-function: value; animation-timing-function使用的数学函数，称为三次贝塞尔曲线，速度曲线*/
	    /*animation-delay: time; animation-delay 属性定义动画什么时候开始*/
	    /*animation-iteration-count: value; animation-iteration-count属性定义动画应该播放多少次。*/
	    /*animation-direction: normal|reverse|alternate|alternate-reverse|initial|inherit; animation-direction 属性定义是否循环交替反向播放动画。*/
	    /*animation-fill-mode: none|forwards|backwards|both|initial|inherit; animation-fill-mode 属性规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式。both: 动画遵循 forwards 和 backwards 的规则。也就是说，动画会在两个方向上扩展动画属性。*/
	    /*animation-play-state: paused|running; animation--play-state属性指定动画是否正在运行或已暂停。*/
	}

	@keyframes fadeIn {
	    from {
	        opacity: 0;
	    }
	    to {
	        opacity: 1;
	    }
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