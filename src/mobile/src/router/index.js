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
            component: Home
        },
        {
            path: '/video_list',
            name: 'video_list',
            component: () => import('../components/video-list/video-list.vue'),
            meta: { scrollToTop: true }
        },
        {
            path: '/play',
            name: 'play',
            // route level code-splitting
            // this generates a separate chunk (play.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "play" */ '../components/play/play.vue')
        }
    ],
    scrollBehavior
})
