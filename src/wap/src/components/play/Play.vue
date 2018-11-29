<template>
    <div class="page has-navbar" v-nav="{ title: '视频播放', showBackButton: true, onBackButtonClick: back}">
        <div class="page-content">
            <div class="player">
                <video 
                    controls="controls"
                    width="100%" 
                    height="240"
                    :src="videoUrl" 
                    :poster="imgUrl"
                ></video>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                videoUrl: '',
                imgUrl: ''
            }
        },
        beforeRouteEnter (to, from, next) {
            next((vm) => {
                let { videoUrl, imgUrl } = vm.$route.params
                vm.videoUrl = videoUrl
                vm.imgUrl = imgUrl
                console.log('hi', vm.$route.params)
            })
        },
        beforeRouteLeave (to, from, next) {
            next()
        },
        methods: {
            back() {
                // $router.back('/')
                $router.go(-1)
            }
        }
    }
</script>

<style scoped>
    .player {
        width: 100%;
    }

    .page-content {
        padding-top: 32px !important;
    }
</style>
