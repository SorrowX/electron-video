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

const router = new Router({
    // scrollBehavior,
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
            path: '/nav_panel',
            name: 'nav_panel',
            component: () => import('../components/nav-panel/nav-panel.vue'),
            meta: {
                hierarchy: 2
            }
        },
        {
            path: '/video_list/:tag',
            name: 'video_list',
            component: () => import('../components/video-list/video-list.vue'),
            props: true,
            meta: { 
                scrollToTop: true, // 是否滚动到页面顶部
                hierarchy: 3
            }
        },
        {
            path: '/play',
            name: 'play',
            component: () => import('../components/play/play.vue'),
            meta: {
                scrollToTop: true,
                hierarchy: 4
            }
        }
    ]
})

// 所有页面回到顶部
router.afterEach((to, from, next) => {
    window.scrollTo(0, 0)
})

export default router
