<template>
	<div class="container">
        <!-- 主页面/视频播放页面 -->
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import AppMain from '@/components/container/main/main'

	export default {
		name: 'Container',
        components: { AppMain },
        data() {
            return {
                transitionName: 'movie-fade-right'
            }
        }
	}
</script>

<style scoped>
    .container {
        flex: 1;
        display: flex;
        flex-direction: column;
        position: relative;
    	background-color: var(--container-bg-color);
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .35s ease;
    }

    .fade-enter, .fade-leave-active {
        opacity: 0
    }

    .movie-fade-right-enter-active, 
    .movie-fade-right-leave-active,
    .movie-fade-left-enter-active, 
    .movie-fade-left-leave-active {
        transition: all .35s;
    }

    .movie-fade-right-enter, 
    .movie-fade-right-leave-to {
        transform: translate3d(100%, 0, 0);
    }

    .movie-fade-left-enter, 
    .movie-fade-left-leave-to {
        transform: translate3d(-100%, 0, 0);
    }
</style>























































































<!-- <template>
    <div class="container">
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

        <transition :name="transitionName">
            <router-view></router-view>
        </transition>
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
    import Movie from '@/components/container/movie/movie'

    const otherComponents = { TheSideBar, Movie }
    const switchComponents = { Home, Channel, Subscribe, Record, Collection, QuickView, Vip, PersonalCenter, HelpFeedback, SetUp }

    export default {
        name: 'Container',
        components: Object.assign(otherComponents, switchComponents),
        data() {
            return {
                currentComponent: 'Home',
                transitionName: 'movie-fade-right'
            }
        },
        methods: {
            handlerBarNav(index, info) {
                this.currentComponent = switchComponents[info['name']]
            }
        },
        mounted() {
            // 根据视频播放页面的状态(进入还是离开)来决定使用哪个动画
            this.$root.$on('window-bar-show-back-ui', (bool) => {
                this.transitionName = bool == true ? 'movie-fade-right' : 'movie-fade-left'
            })
        }
    }
</script>

<style scoped>
    .container {
        flex: 1;
        display: flex;
        flex-direction: column;
        position: relative;
        background-color: var(--container-bg-color);
    }

    .main-page {
        flex: 1;
        display: flex;
        flex-direction: row;
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

    .movie-fade-right-enter-active, 
    .movie-fade-right-leave-active,
    .movie-fade-left-enter-active, 
    .movie-fade-left-leave-active {
        transition: all .35s;
    }

    .movie-fade-right-enter, 
    .movie-fade-right-leave-to {
        transform: translate3d(100%, 0, 0);
    }

    .movie-fade-left-enter, 
    .movie-fade-left-leave-to {
        transform: translate3d(-100%, 0, 0);
    }
</style> -->