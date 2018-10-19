<template>
	<div class="quick-view-nav">
		<div class="nav">
			<ul class="nav-ul" 
			    @mousewheel="handlerMouseWheel"
			    ref="navUlDom"
			>
				<li 
				    v-for="(item, index) in navArr"
				    :class="[ curIndex === index ? 'active' : '' ]"
				    @click="handlerClickNav(index, item)"
				>
				    {{ item.tag }}
				</li>
			</ul>
		</div>
		<div class="nav-operate">
			<i class="nav-operate-img"></i>
			添加
		</div>
	</div>
</template>

<script>
	export default {
		name: 'QuickViewNav',
		data() {
			return {
				curIndex: 0,
				navArr: [
				    {
				    	tag: '推荐',
				    	videoResourcePath: 'D:\\迅雷',
				    	genImgResourcePath: 'D:\\迅雷\\img'
				    },
				    {
				    	tag: 'http',
				    	videoResourcePath: 'D:\\http',
				    	genImgResourcePath: 'D:\\http\\img'
				    },
				    {
				    	tag: 'css',
				    	videoResourcePath: 'D:\\css',
				    	genImgResourcePath: 'D:\\css\\img'
				    }
				]
			}
		},
		methods: {
			handlerMouseWheel(evt) {
				let scrollDom = this.$refs.navUlDom
				let child = scrollDom.children[0]
				let diff = 35, curScrollLeft = 0
				let childrenWidth = parseInt(window.getComputedStyle(child, false)['width'])
				    + parseInt(window.getComputedStyle(child, false)['margin-left']) * 2
				let width = scrollDom.children.length * childrenWidth

				if (evt.wheelDelta > 0) { // 向上是正数 x轴向左
					curScrollLeft = scrollDom.scrollLeft - diff
					if (curScrollLeft <= 0) {
						curScrollLeft = 0
					}
				} else { // 表示向下是负数 x轴向右
					curScrollLeft = scrollDom.scrollLeft + diff
					if (curScrollLeft >= width) {
						curScrollLeft = width
					}
				}

				scrollDom.scrollTo(curScrollLeft, scrollDom.scrollTop)
			},
			handlerClickNav(index, data) {
				this.curIndex = index
				this.$emit('click-nav', data)
				this.$router.push({
					name: 'quick-main-content',
					params: {
						videopath: data.videoResourcePath,
						imgpath: data.genImgResourcePath,
					}
				})
			}
		},
		mounted() {
			this.$router.push({
				name: 'quick-main-content',
				params: {
					videopath: this.navArr[0].videoResourcePath,
					imgpath: this.navArr[0].genImgResourcePath,
				}
			})
		}
	}
</script>

<style scoped>
	.quick-view-nav {
		position: relative;
		width: 100%;
		height: 40px;
		background-color: var(--common-header-bg-color);
	}

	.nav {
        width: calc(100% - 80px);
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
	}

	.nav-operate {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 80px;
		height: 100%;
		position: absolute;
		top: 0;
		right: 0;
		font-size: 15px;
		color: rgba(11,190,6,1);
	}

	.nav-operate:hover {
		cursor: pointer;
	}

	.nav-ul {
		height: 100%;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		overflow-y: hidden;
	}

	/* 滚动条控制样式 */
	.nav-ul::-webkit-scrollbar {
		width: 4px;
		height: 2px;
		display: none;
	}

	.nav-ul li {
		flex-shrink: 0;
		margin: 0 20px;
		color: rgba(153,153,153,1);
		font-size: 15px;
		cursor: pointer;
	}

	.active {
		border-bottom: 2px solid rgba(11,190,6,1) !important;
		color: rgba(11,190,6,1) !important;
	}

	.nav-ul li:hover {
		color: rgba(11,190,6,1);
	}

	/* 添加导航 样式 */
	.nav-operate-img {
		/* display: block;
		width: 18px;
		height: 18px;
		background-image: url(../../../../assets/channel2.scale-200.png);
		background-size: contain;
		margin-right: 10px; */
	}

	.nav-operate-img {
		display: block;
		height: 2px;
		width: 18px;
		margin-right: 10px;
		position: relative;
		background: rgba(11,190,6,1);
	}

	.nav-operate-img::after {
		content: "";
		width: 2px;
		height: 18px;
		position: absolute;
		left: 8px;
		top: -8px;
		background: rgba(11,190,6,1);
	}
</style>