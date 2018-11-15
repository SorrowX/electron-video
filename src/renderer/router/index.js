import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: require('@/components/container/main/home/home').default
        },
        {
            path: '/channel',
            component: require('@/components/container/main/channel/channel').default
        },
        {
            path: '/subscribe',
            component: require('@/components/container/main/subscribe/subscribe').default
        },
        {
            path: '/record',
            component: require('@/components/container/main/record/record').default
        },
        {
            path: '/collection',
            component: require('@/components/container/main/collection/collection').default
        },
        {
            path: '/quick-view',
            component: require('@/components/container/main/quick-view/quick-view').default
        },
        {
            path: '/vip',
            component: require('@/components/container/main/vip/vip').default
        },
        {
            path: '/personal-center',
            component: require('@/components/container/main/personal-center/personal-center').default
        },
        {
            path: '/help-feedback',
            component: require('@/components/container/main/help-feedback/help-feedback').default
        },
        {
            path: '/set-up',
            component: require('@/components/container/main/set-up/set-up').default
        }
    ]
})
