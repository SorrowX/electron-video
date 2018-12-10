import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home/home.vue'
import VideoList from '../components/video-list/video-list.vue'

Vue.use(Router)

const scrollBehavior = function (to, from, savedPosition) {
    if (savedPosition) {
        return savedPosition
    } else {
        const position = {}

        return new Promise(resolve => {
            if (to.matched.some(m => m.meta.scrollToTop)) {
                position.x = 0
                position.y = 0
            }

            this.app.$root.$once('triggerScroll', () => {
                resolve(position)
            })
        })
    }
}

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                hierarchy: 1 // 分层用的数据
            }
        },
        {
            path: '/video_list/:tag',
            name: 'video_list',
            component: () => import('../components/video-list/video-list.vue'),
            meta: { 
                scrollToTop: true, // 是否滚动到页面顶部
                hierarchy: 2
            }
        },
        {
            path: '/play',
            name: 'play',
            component: () => import('../components/play/play.vue'),
            meta: { 
                scrollToTop: true,
                hierarchy: 3
            }
        }
    ],
    scrollBehavior
})
