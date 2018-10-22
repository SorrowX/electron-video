<template>
	<div class="container">
        <app-main></app-main>
        <app-movie></app-movie>

        <!-- 主页面/视频播放页面 -->
        <!-- <transition name="fade" mode="out-in">
            <keep-alive exclude="Movie">
                <router-view></router-view>
            </keep-alive>
        </transition> -->
    </div>
</template>

<script>
    import AppMain from '@/components/container/main/main'
    import AppMovie from '@/components/container/movie/movie'

	export default {
		name: 'Container',
        components: { AppMain, AppMovie },
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
</style>