<template>
	<div class="channel-content-movie-recommend" ref="recommendDom">
		<ul 
		    ref="ulDom"
		    class="movie-list-ul"
		    @mouseenter="handleMouseEnter"
		    @mouseleave="handleMouseLeave"
		    @transitionend="handleTransitionEnd"
		    :style="{ transform: 'translate3d(-'+ translateX +'px,0,0)' }"
		    v-for="n in rows"
		    v-show="Array.isArray(rowsObjArr[n - 1]) ? true : false"
		>
			<li 
			    v-for="(media, index) in rowsObjArr[n - 1]"
			    @click="play(media)"
			>
				<img :src="media['genImgPath']" alt="">
				<i>11-06期-{{ n }}</i>
				<p>{{ media['filename'] }}</p>
				<span>{{ media['name'] }}</span>
			</li>
		</ul>
		<div 
		    class="bar left-bar" 
		    v-show="showLeftBar"
		    @click="scroll"
		    @mouseover="handleMouseOver"
		    @mouseout="handleMouseOut"
		>
			<i class="arrow left-arrow"></i>
		</div>
		<div 
		    class="bar right-bar" 
		    v-show="showRightBar"
		    @click="scroll"
		    @mouseover="handleMouseOver"
		    @mouseout="handleMouseOut"
		>
			<i class="arrow right-arrow"></i>
		</div>
	</div>
</template>

<script>
	import CommonMixin from '@/mixin/common-mixin'

	export default {
		name: 'ChannelContentMovieRecommend',
		mixins: [ CommonMixin ],
		props: {
			rows: {
				type: Number,
				default: 1
			},
			rowsObjArr: {
				type: Array,
				default: function() {
					return []
				}
			}
		},
		data() {
			return {
				translateX: 0,
				showLeftBar: false,
				showRightBar: false
			}
		},
		methods: {
			handleMouseEnter(evt) {
				this.initBar()
			},
			handleMouseLeave(evt) {
				if (this.hovering) return
				this.hiddenBar()
			},
			handleTransitionEnd() {
                this.hiddenBar()
			},
			handleMouseOver() {
				this.initBar()
				this.hovering = true
			},
			handleMouseOut() {
				this.hovering = false
			},
			initBar() {
				let ulDom = this.$refs['ulDom'][0]
				let recommendDom = this.$refs['recommendDom']
				let ulDomWidth = ulDom.offsetWidth
				let recommendDomWidth = recommendDom.offsetWidth
				if (recommendDomWidth < ulDomWidth) {
					if (this.translateX !== 0) {
						this.showRightBar = !(this.showLeftBar = true)
					} else {
						this.showLeftBar = !(this.showRightBar = true)
					}
				}
				this.diffTranslateX = this.translateX !== 0 ? 0 : ulDomWidth-recommendDomWidth
			},
			hiddenBar() {
				this.showRightBar = this.showLeftBar = false
			},
			scroll() {
				this.translateX = this.diffTranslateX
			},
			play(media) {
				this.playVideo(media)
			}
		}
	}
</script>

<style scoped>
	.channel-content-movie-recommend {
		width: 100%;
		overflow: hidden;
		position: relative;
	}

	/* 箭头样式 */
	.bar {
		width: 32px;
		height: 100%;
		background-color: rgba(0,0,0,.2);
		position: absolute;
		top: 0;
		transition: all .35s;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid transparent;
	}
	.bar:hover {
		background-color: rgba(255,255,255,.1);
		border: 1px solid rgba(255,255,255,.6);
		cursor: pointer;
	}
	.left-bar {
		left: 0;
	}
	.right-bar {
		right: 0;
	}
	.arrow {
		display: block;
		width: 18px;
		height: 18px;
		background-size: contain;
		background-image: url(../../../../../assets/nav_back.png);
	}
	.left-arrow {
		transform:rotate(0deg);
	}
	.right-arrow {
		transform:rotate(-180deg);
	}

	/* 列表样式 */
	.movie-list-ul {
		display: inline-flex;
		transition: all .35s;
		transform: translate3d(0,0,0);
	}
	.movie-list-ul:nth-child(even) {
		margin-top: 10px;
	}
	.movie-list-ul li {
		flex: none;
		width: 180px;
		min-height: 140px;
		display: inline-block;
		margin-right: 14px;
		position: relative;
	}
	.movie-list-ul li:hover {
		cursor: pointer;
	}
	.movie-list-ul>li>img {
		display: block;
		width: 180px;
		height: 95px;
		background-color: currentColor;
	}
	.movie-list-ul>li>i {
		display: flex;
		justify-content: center;
		align-items: center;
        position: absolute;
        height: 22px;
        width: 52px;
        background-color: rgba(0,0,0,.6);
        right: 0;
        top: 73px;
        color: #fff;
        font-style: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
	}
	.movie-list-ul>li>p {
        font-size: 14px;
        color: rgba(204,204,204,1);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        margin-bottom: 2px;
	}
	.movie-list-ul>li>span {
		display: block;
        color: rgba(102,102,102,1);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
	}
</style>