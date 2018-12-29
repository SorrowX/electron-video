<template>
	<div 
	     class="the-side-bar" 
	     ref="sideBarDom" 
	     :style="{ width: sideBarDomWidth + 'px' }"
	>
        <div class="open">
            <div @click="openBar">
            	<i></i>
            </div>
        </div>
        <div class="nav">
        	<div class="nav-top">
        		<div 
        		    v-for="(item, index) in topNavArr"
        		    :key="item['title']"
                    :class="{ 'active': index === curNavIdx }"
                    @click="handlerClickNav('top', index)"
        		>
        			<i :class="item['cls']"></i>
        			<span v-show="isShowTitle">{{ item['title'] }}</span>
        		</div>
        	</div>
        	<div class="nav-bottom">
        		<div 
        		    v-for="(item, index) in bottomNavArr"
        		    :key="item['title']"
                    :class="{ 'active': index + topNavArr.length === curNavIdx }"
                    @click="handlerClickNav('bottom', index)"
        		>
        			<i :class="item['cls']"></i>
        			<span v-show="isShowTitle">{{ item['title'] }}</span>
        		</div>
        	</div>
        </div>
    </div>
</template>

<script>
    import { INSIDE_SWITCH_NAV_MESSAGE } from '@/constant/index'
	let sideBarDomMinWidth = 43, 
        sideBarDomMaxWidth = 183, 
        transitionTime = .4

	export default {
		name: 'TheSideBar',
        data() {
        	return {
        		isOpen: false,
        		sideBarDomWidth: sideBarDomMinWidth,
        		isShowTitle: false,
                curNavIdx: 0,
        		topNavArr: [
        		    {
        		    	cls: 'home',
        		    	title: '首页',
                        name: 'Home'
        		    },
        		    {
        		    	cls: 'channel',
        		    	title: '频道',
                        name: 'Channel'
        		    },
        		    {
        		    	cls: 'subscribe',
        		    	title: '订阅',
                        name: 'Subscribe'
        		    },
        		    {
        		    	cls: 'record',
        		    	title: '播放记录',
                        name: 'Record'
        		    },
        		    {
        		    	cls: 'collection',
        		    	title: '我的收藏',
                        name: 'Collection'
        		    },
        		    {
        		    	cls: 'quick-view',
        		    	title: '快速查看',
                        name: 'QuickView'
        		    }
        		],
        		bottomNavArr: [
        		    {
        		    	cls: 'vip',
        		    	title: 'VIP会员',
                        name: 'Vip'
        		    },
        		    {
        		    	cls: 'personal-center',
        		    	title: '个人中心',
                        name: 'PersonalCenter'
        		    },
        		    {
        		    	cls: 'photo-wall',
        		    	title: '照片墙',
                        name: 'PhotoWall'
        		    },
        		    {
        		    	cls: 'set-up',
        		    	title: '设置',
                        name: 'SetUp'
        		    }
        		]
        	}
        },
		methods: {
			openBar() {
				if (!this.isOpen) { // 展开
                    this.sideBarDomWidth = sideBarDomMaxWidth
                    setTimeout(() => { // 解决ui显示标题时,会挤在一起的问题
						this.isShowTitle = true
                    }, sideBarDomMinWidth / sideBarDomMaxWidth * transitionTime * 1000)
				} else { // 关闭
					this.isShowTitle = false
					this.sideBarDomWidth = sideBarDomMinWidth
				}
				this.isOpen = !this.isOpen
			},
            handlerClickNav(type, index) {
                if (type === 'top') {
                    this.curNavIdx = index
                    this.$emit('click-side-bar-nav', this.curNavIdx, this.topNavArr[index])
                } else {
                    this.curNavIdx = index + this.topNavArr.length
                    this.$emit('click-side-bar-nav', this.curNavIdx, this.bottomNavArr[index])
                }
            },
            insideSwitchNav(name) {
                let i
                i = this.topNavArr.findIndex((navObj) => {
                    return navObj['name'] == name
                })
                if (i != -1) {
                    return this.handlerClickNav('top', i)
                }
                i = this.topNavArr.findIndex((navObj) => {
                    return navObj['name'] == name
                })
                if (i != -1) {
                    return this.handlerClickNav('bottom', i)
                }
            }
		},
        mounted() {
            this.$root.$on(INSIDE_SWITCH_NAV_MESSAGE, (navName) => {
                this.insideSwitchNav(navName)
            })
        }
	}
</script>

<style scoped>
    .the-side-bar {
        flex: none;
    	display: flex;
    	flex-direction: column;
    	width: 43px; /* 43px 或者 183px */
    	transition: all .35s;
    	background-color: var(--the-side-bar-bg-color);
    }

    .open div, 
    .nav-top div, 
    .nav-bottom div {
    	cursor: pointer;
    }

    .open {
    	height: 39px;
    	border-bottom: 1px solid rgba(61,71,79,1);
    }

    .active, .open div:hover {
        background-color: var(--the-side-bar-select-bg-color) !important;
    }

    .open div {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 43px;
        height: 100%;
        padding-left: 12px;
    }

    .open div i {
    	display: block;
    	width: 16px;
    	height: 16px;
    	background-image: url(../../../../assets/navigation/thumbnail.png);
    	background-repeat: no-repeat;
    	background-size: contain;
    }

    .nav {
    	flex: 1;
    	display: flex;
    	flex-direction: column;
    	justify-content: space-between;
    }

    .nav-top, .nav-bottom {
    	display: flex;
    	flex-direction: column;
    	justify-content: flex-start;
    	align-items: center;
    }

    .nav-top div, .nav-bottom div {
    	display: flex;
    	justify-content: flex-start;
    	align-items: center;
    	width: 100%;
    	height: 40px;
    }

    .nav-top div span, .nav-bottom div span {
    	margin-left: 15px;
    	font-size: 12px;
    	color: #BBBCBD;
    }

    .nav-top div i, .nav-bottom div i {
    	display: block;
    	width: 16px;
    	height: 16px;
    	margin-left: 12px;
    	background-repeat: no-repeat;
    	background-size: contain;
    }

    .home {
    	background-image: url(../../../../assets/navigation/home.scale-200.png);
    }

    .channel {
    	background-image: url(../../../../assets/navigation/channel.scale-200.png);
    }

    .subscribe {
    	background-image: url(../../../../assets/navigation/subscribe.scale-200.png);
    }

    .record {
    	background-image: url(../../../../assets/navigation/record.scale-200.png);
    }

    .collection {
    	background-image: url(../../../../assets/navigation/favor.scale-200.png);
    }

    .quick-view {
    	background-image: url(../../../../assets/navigation/download.scale-200.png);
    }

    .vip {
    	background-image: url(../../../../assets/navigation/vip.scale-200.png);
    }

    .personal-center {
    	background-image: url(../../../../assets/navigation/center.scale-200.png);
    }

    .photo-wall {
    	background-image: url(../../../../assets/navigation/feedback.scale-200.png);
    }

    .set-up {
    	background-image: url(../../../../assets/navigation/settings.scale-200.png);
    }
</style>