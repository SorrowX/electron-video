<template>
	<div class="nav">
		<div class="nav-box" ref="wrapper">
			<ul ref="scroller">
				<li 
				    v-for="(nav, index) in navList"
				    :class="{ active: index === navCurIndex }"
				    :key="index"
				    v-finger:tap="tapNav(nav, index)"
				>
			        {{ nav.tag }}
			    </li>
			</ul>
		</div>
		<div
		    class="nav-arrow"
		    v-finger:tap="tapArrow"
		>
			<i :class="arrowClass"></i>
		</div>
	</div>
</template>

<script>
    import { getNavListFromApi } from '@/api/api'
    import { NAV_LIST } from '@/common/js/constants/index'
    import { sleep } from '@/common/js/util/index'
    import { mapActions } from 'vuex'
    import {
    	getMyChannelListDataFromCache,
    	getAllChannelListDataFromCache,
    	setMyChannelListDataToCache,
    	setAllChannelListDataToCache
    } from '@/store/cache'

    function getAllLiWidth(aLiDoms) {
    	let w = 0
    	let arr = Array.prototype.slice.call(aLiDoms)
    	arr.forEach((li) => {
    		let style = window.getComputedStyle(li, null)
    		let width = parseInt(style['width'])
    		let marginLeft = parseInt(style['marginLeft'])
    		let marginRight = parseInt(style['marginRight'])
    		w += (width + marginLeft + marginRight)
    	})
    	return  w
    }

	export default {
		name: 'HomeNav',
		data() {
			return {
				navList: [],
				navCurIndex: 0,
				showNavPanel: false
			}
		},
		computed: {
			arrowClass() {
				return {
					'nav-arrow-down-icon': !this.showNavPanel, 
					'nav-arrow-up-icon': this.showNavPanel
				}
			}
		},
		methods: {
			tapNav(nav, index) {
				return () => {
					this.navCurIndex = index
					this.$router.push({ path: `/video_list/${nav.tag}` })
				}
			},
			tapArrow() {
				this.showNavPanel = !this.showNavPanel
				this.$nextTick(() => {
					this.$router.push('/nav_panel')
				})
				this.$emit('open-menu', this.showNavPanel)
			},
			initTouch() {
				let target = this.$refs.scroller
				let wrapper = this.$refs.wrapper

				this.$nextTick(() => {
					if (!this.at) {
						this.Transform(target, true)
						this.at = new this.AlloyTouch({
				            touch: wrapper, //反馈触摸的dom
				            vertical: false, //不必需，默认是true代表监听竖直方向touch
				            target: target, //运动的对象
				            property: 'translateX',  //被运动的属性
				            sensitivity: 1, //不必需,触摸区域的灵敏度，默认值为1，可以为负数
				            min: getMin(), //不必需,滚动属性的最小值
				            max: 0,
				            change: function (v) {
				                // console.log(v)
				            },
				            animationEnd: function (value) {
				                // console.log('运动结束： ', value)
				            }
						})
					} else {
						this.at.min = getMin()
						this.at.to(0)
					}
				})
				
				function getMin() {
                	let allLiWidth = getAllLiWidth(target.children)
                	let ulWidth = parseInt(window.getComputedStyle(wrapper, null)['width'])
                	return ulWidth - allLiWidth > 0 ? 0 : ulWidth - allLiWidth
                }
			},
			async getNavList() {
				let myChannelList = getMyChannelListDataFromCache()
				if (myChannelList.length > 0) {
					this.navList = myChannelList
					this.setMyChannelListData(myChannelList)
					return myChannelList
				} else {
					this.navList = []
					let navRet = await getNavListFromApi()
					if (navRet.status === 200 && navRet.data.code === 0) {
						this.navList = navRet.data.data
					}
					this.navList = this.navList.concat(NAV_LIST) // 合并静态导航数据
					this.setMyChannelListData(this.navList)
					return this.navList
				}
			},
			async initNav(isRecovery) {
				if (isRecovery) {
					setMyChannelListDataToCache([])
			    	setAllChannelListDataToCache([])
			    	this.setMyChannelListData([])
			    	this.setAllChannelListData([])
			    	await sleep(550)
				}
				let navList = await this.getNavList()
				this.navList = navList

				let allChannelList = getAllChannelListDataFromCache()
				if (allChannelList.length > 0) {
					this.setAllChannelListData(allChannelList)
				} 

				if (!isRecovery) {
					this.initTouch()
				}
			},
			...mapActions(['setMyChannelListData', 'setAllChannelListData'])
		},

		mounted() {
			this.initNav()

			this.$root.$on('refresh-all-nav', () => {
				this.initNav(true)
			})
		},
		activated() {
			this.initTouch()
		}
	}
</script>

<style scoped>
	.nav {
		height: 44px;
		padding: 0 0.24rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
	}

    .nav-box {
    	flex: 1;
    	height: 100%;
    	display: flex;
    	align-items: center;
    	overflow: hidden;
    }
	.nav-box ul {
		/*border: 1px solid red;*/
		display: inline-flex;
	}
	.nav-box ul li {
		flex: none;
		margin: 0 12px;
		border-bottom: 2px solid transparent;
	}
	.nav-box ul li:nth-child(1) {
		margin-left: 0;
	}
	.nav-box ul li:last-child {
		margin-right: 5px;
	}
	.active {
		color: #2692FF;
		border-bottom: 2px solid #2692FF!important;
		/*font-weight: bold;*/
	}

	.nav-arrow {
		flex: none;
		width: 44px;
		height: 100%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		/*border: 1px solid green;*/
	}

	.nav-arrow-up-icon,
	.nav-arrow-down-icon {
		display: flex;
		width: 22px;
		height: 22px;
		background-size: contain;
	}
	.nav-arrow-up-icon {
		background-image: url(../../assets/arrow-up.png);
	}
	.nav-arrow-down-icon {
		background-image: url(../../assets/arrow-down.png);
	}
</style>