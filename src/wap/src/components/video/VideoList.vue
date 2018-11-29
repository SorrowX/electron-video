<template>
    <div class="page has-navbar" v-nav="{ title: tag , showBackButton: true, onBackButtonClick: back}">
        <div class="page-content text-center">
            <scroll 
                class="page-content"
                :on-refresh="refresh"
                :on-infinite="infinite"
            >
                <section 
                    class="video-section" 
                    v-for="(media, index) in videoList"
                    :key="media['filename']"
                    @click="play(media)"
                >
                    <div class="video-item">
                        <img class="video-thumb" :src="media['imgUrl']">
                        <div class="video-item-play"></div>
                        <div class="video-item-title">
                            <p>{{ media['filename'] }}</p>
                        </div>
                    </div>
                    <div class="video-item-footer">
                        <div class="head-sculpture"><img :src="media['imgUrl']" alt=""></div>
                        <span>{{ media['filename'] }}</span>
                    </div>
                </section>

                <div v-if="noData" slot="infinite" class="text-center">没有更多数据</div>
            </scroll>
        </div>
    </div>
</template>
<script>
    import { 
        getVideoListByNavFromApi 
    } from '../../api/api'

    export default {
        data() {
            return {
                videoList: [],
                noData: true,
                tag: '视频Tag'
            }
        },
        beforeRouteEnter (to, from, next) {
            next((vm) => {
                vm.tag = vm.$route.params.tag
                vm.getRenderDataList(vm.$route.params.tag, 0)
            })
        },
        beforeRouteLeave (to, from, next) {
            next()
        },
        methods: {
            back() {
                $router.back('/')
            },
            async getRenderDataList(tag, num, callback) {
                let videoRet = await getVideoListByNavFromApi({ tag, num })
                if (videoRet.status === 200 && videoRet.data.code === 0) {
                    console.log('视频数据: ', videoRet.data.data)
                    callback && callback(videoRet.data.data)
                    this.videoList = this.videoList.concat(videoRet.data.data)
                }
            },
            refresh(done) {
                console.log('refresh', done)
                done()
            },
            infinite(done) {
                if (!this._wait) {
                    return
                    console.log('infinite')
                    this._wait = true
                    this.getRenderDataList(this.tag, 10, (list) => {
                        if (list.length === 0) {
                            this.noData = true
                        }
                        this._wait = false
                        done()
                    })
                }
            },
            play(media) {
                this.$router.push({
                    name: 'play',
                    params: media
                })
            }
        },
        mounted() {
            
        }
    }
</script>

<style>
    .video-section {
        overflow: hidden;
        background: #fff;
    }

    .video-item {
        height: 3.6rem;
        overflow: hidden;
        position: relative;
    }

    .video-item img {
        width: 100%;
        height: 100%;
    }

    .video-item-title {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        padding-left: 3%;
        padding-top: 3%;
    }

    .video-item-title p {
        color: #fff;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        font-size: 16px;
        text-align: left;
        font-family: '-apple-system', "Helvetica Neue", "Roboto", "Segoe UI", sans-serif;
    }

    .video-item-play {
        width: 0.8rem;
        height: 0.8rem;
        position: absolute;
        left: 50%;
        top: 50%;
        background-image: url(../../assets/play.png);
        background-size: contain;
        transform: translate(-50%, -50%);
    }

    .video-item-footer {
        height: 0.6rem;
        line-height: 0.6rem;
        text-align: left;
        padding-left: 2%;
        display: flex;
        align-items: center;
    }

    .video-item-footer span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 80%;
    }

    .head-sculpture {
        width: .4rem;
        height: .4rem;
        overflow: hidden;
        border-radius: 50%;
        margin-right: 1.5%;
    }

    .head-sculpture img {
        width: 100%;
        height: 100%;
        background-size: contain;
    }
</style>
