<template>
	<div class="base-nav">
		<div class="nav">
			<ul class="nav-list" 
			    @mousewheel="handlerMouseWheel"
			    ref="navUlDom"
			>
				<li 
				    v-for="(item, index) in navArrList"
				    :class="[ curIndex === index ? 'active' : '' ]"
				    @click.self.stop="handlerClickNav(index, item)"
				>
				    {{ item.tag }}
				</li>
			</ul>
		</div>
		<div class="custom-operate">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import CommonMixin from '@/mixin/common-mixin'

	export default {
		name: 'BaseNav',
		mixins: [ CommonMixin ],
		props: {
			navArrList: {
				type: Array,
				default: function() { return [] }
			}
		},
		data() {
			return {
				curIndex: 0
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
			handlerClickNav(index, item) {
				this.curIndex = index
				this.$emit('click-nav', index, item)
			},
			correctNavIndex(index) {
				this.curIndex = index
			}
		}
	}
</script>

<style scoped>
	.base-nav {
		flex: none;
		position: relative;
		width: 100%;
		height: 40px;
		background-color: var(--common-header-bg-color);
	}

	.base-nav .nav {
        width: calc(100% - 80px);
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
	}

	.base-nav .nav-list {
		height: 100%;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		overflow-y: hidden;
	}

	/* 滚动条控制样式 */
	.nav-list::-webkit-scrollbar {
		width: 4px;
		height: 2px;
		display: none;
	}

	.nav-list li {
		flex-shrink: 0;
		margin: 0 20px;
		color: rgba(153,153,153,1);
		font-size: 15px;
		cursor: pointer;
		border: 2px solid transparent;
	}

	.active {
		border-bottom: 2px solid rgba(11,190,6,1) !important;
		color: rgba(11,190,6,1) !important;
	}

	.nav-list li:hover {
		color: rgba(11,190,6,1);
	}

	.custom-operate {
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

	.custom-operate:hover {
		cursor: pointer;
	}
</style>