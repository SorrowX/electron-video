<template>
	<div class="main-page">
	    <the-side-bar @click-side-bar-nav="handlerBarNav"></the-side-bar>
	    <div class="main-content">
	        <transition name="fade" mode="out-in">
	            <!-- 使用路由 切换各个组件-->
	            <keep-alive>
		            <router-view></router-view>
	            </keep-alive>
	        </transition>
	    </div>
	    <base-message></base-message>
	    <base-tip></base-tip>
	</div>
</template>

<script>
	import TheSideBar from '@/components/container/main/the-side-bar/the-side-bar'
	import BaseMessage from '@/components/base/base-message'
	import BaseTip from '@/components/base/base-tip'

	export default {
		name: 'Main',
		components: { TheSideBar, BaseMessage, BaseTip },
		methods: {
		    handlerBarNav(index, info) {
		        this.$router.push({ path: `/${info.cls}` })
		    }
		}
	}
</script>

<style scoped>
	.main-page {
	    flex: 1;
	    display: flex;
	    flex-direction: row;

	    width: 100%;
	    height: 100%;
	    position: absolute;
	    left: 0;
	    top: 0;
	}

	.main-content {
	    flex: 1;
	    display: flex;
	    flex-direction: column;
	    overflow: hidden;
	}

	.fade-enter-active, 
	.fade-leave-active {
	    transition: opacity .35s ease;
	}

	.fade-enter, 
	.fade-leave-to {
	    opacity: 0;
	}
</style>

















































<!-- <template>
	<div class="main-page">
	    <the-side-bar @click-side-bar-nav="handlerBarNav"></the-side-bar>
	    <div class="main-content">
	        <transition name="fade" mode="out-in">
	            <keep-alive>
	                <component :is="currentComponent"></component>
	            </keep-alive>
	        </transition>
	    </div>
	</div>
</template>

<script>
	import TheSideBar from '@/components/container/main/the-side-bar/the-side-bar'
    import Home from '@/components/container/main/home/home'
    import Channel from '@/components/container/main/channel/channel'
    import Subscribe from '@/components/container/main/subscribe/subscribe'
    import Record from '@/components/container/main/record/record'
    import Collection from '@/components/container/main/collection/collection'
    import QuickView from '@/components/container/main/quick-view/quick-view'
    import Vip from '@/components/container/main/vip/vip'
    import PersonalCenter from '@/components/container/main/personal-center/personal-center'
    import HelpFeedback from '@/components/container/main/help-feedback/help-feedback'
    import SetUp from '@/components/container/main/set-up/set-up'

    const otherComponents = { TheSideBar }
    const switchComponents = { Home, Channel, Subscribe, Record, Collection, QuickView, Vip, PersonalCenter, HelpFeedback, SetUp }

	export default {
		name: 'Main',
		components: Object.assign(otherComponents, switchComponents),
		data() {
		    return {
		        currentComponent: 'Home'
		    }
		},
		methods: {
		    handlerBarNav(index, info) {
		        this.currentComponent = switchComponents[info['name']]
		    }
		}
	}
</script>

<style scoped>
	.main-page {
	    flex: 1;
	    display: flex;
	    flex-direction: row;
	    
	    width: 100%;
	    height: 100%;
	    position: absolute;
	    left: 0;
	    top: 0;
	}

	.main-content {
	    flex: 1;
	    display: flex;
	    flex-direction: column;
	}

	.fade-enter-active, 
	.fade-leave-active {
	    transition: opacity .3s ease;
	}

	.fade-enter, 
	.fade-leave-to {
	    opacity: 0;
	}
</style> -->