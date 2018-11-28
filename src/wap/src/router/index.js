import Home from '../components/home/Home.vue'
import NavList from '../components/video/NavList.vue'
import VideoList from '../components/video/VideoList.vue'
import CollectList from '../components/collect/CollectList.vue'
import RecordList from '../components/record/RecordList.vue'
import Play from '../components/play/Play.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/nav_list', component: NavList },
    { path: '/video_list', component: VideoList },
    { path: '/collect_list', component: CollectList },
    { path: '/record_list', component: RecordList },
    { path: '/play', component: Play }
]

export default routes