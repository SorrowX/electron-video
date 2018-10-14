import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'main',
            // component: require('@/components/container/main/main').default
        },
        {
            path: '*',
            redirect: '/'
        },
        {
            path: '/movie',
            name: 'movie',
            component: require('@/components/container/movie/movie').default
        }
    ]
})
