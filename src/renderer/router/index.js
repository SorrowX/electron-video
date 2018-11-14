import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '*',
            redirect: '/main'
        },
        {
            name: 'main',
            path: '/main',
            component: require('@/components/container/main/main').default,
            children: [
                {
                    path: '',
                    component: require('@/components/container/main/home/home').default
                },
                {
                    path: 'home',
                    component: require('@/components/container/main/home/home').default
                },
                {
                    path: 'channel',
                    component: require('@/components/container/main/channel/channel').default
                },
                {
                    path: 'subscribe',
                    component: require('@/components/container/main/subscribe/subscribe').default
                },
                {
                    path: 'record',
                    component: require('@/components/container/main/record/record').default
                },
                {
                    path: 'collection',
                    component: require('@/components/container/main/collection/collection').default
                },
                {
                    path: 'quick-view',
                    component: require('@/components/container/main/quick-view/quick-view').default,
                    children: [
                        {
                            name: 'quick-main-content',
                            path: 'quick-main-content/:videopath/:imgpath',
                            component: require('@/components/container/main/quick-view/quick-view-main/quick-view-main').default,
                            props: function(route) {
                                return {
                                    videoDirPath: route.params.videopath,
                                    imgDirPath: route.params.imgpath
                                }
                            }
                        }
                    ]
                },
                {
                    path: 'vip',
                    component: require('@/components/container/main/vip/vip').default
                },
                {
                    path: 'personal-center',
                    component: require('@/components/container/main/personal-center/personal-center').default
                },
                {
                    path: 'help-feedback',
                    component: require('@/components/container/main/help-feedback/help-feedback').default
                },
                {
                    path: 'set-up',
                    component: require('@/components/container/main/set-up/set-up').default
                }
            ]
        },
        {
            path: '/movie',
            name: 'movie',
            component: require('@/components/container/movie/movie').default
        }
    ]
})
