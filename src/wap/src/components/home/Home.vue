<template>
    <div class="page" id="home-page">
        <div class="page-content text-center" v-nav="{ title: 'Home', hideNavbar: true}">
            <search 
                v-model="keywords" 
                placeholder="输入关键字" 
                :on-search="onSearch" 
                :on-cancel="onCancel">
            </search>

            <swiper 
                ref="swiper" 
                direction="horizontal" 
                width="100%" 
                height="165" 
                pager-color="#ea5a49" 
                pager-bg-color="#e5e4e3"
                hide-pager="false"
            >
                <swiper-item v-for="(media, index) in bannerList">
                    <div class="cover" @click="clickBanner(media)">
                        <img :src="media['imgUrl']" alt="">
                    </div>
                </swiper-item>
            </swiper>

            <div class="nav-cell">
                <cells id="cells" :items="entrances" :on-cell-click="jumpPage" row="1"></cells>
            </div>

            <div class="movie-list" v-for="(arr, tag) in movieMap">
                <header>
                    <i class="dot"></i>
                    <span @click="goVideoListPage(tag)">{{ tag }}</span>
                </header>
                <ul>
                    <li 
                        v-for="(media, index) in arr"
                        :key="media['filename']"
                        @click="play(media)"
                    >
                        <div>
                            <img :src="media['imgUrl']" alt="">
                        </div>
                        <div class="info">
                            <p>{{ media['filename'] }}</p>
                            <span>{{ media['dir'] }}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import { 
        getNavListFromApi,
        getVideoListByNavFromApi 
    } from '../../api/api'

    const maxNum = 6
    const defaultBannerImg = require('../../assets/hDefault_big.jpg')

    function defaultBannerArr() {
        let arr = []
        for (let i = 0; i < 8; i++) {
            arr.push({
                imgUrl: defaultBannerImg
            })
        }
        return arr
    }

    export default {
        data () {
            return {
                keywords: '',
                entrances: [
                    '<div class="entrance assertive"><i class="icon ion-ios-film"></i><br><span>频道</span></div>',
                    '<div class="entrance energized"><i class="icon ion-ios-heart"></i><br><span>收藏</span></div>',
                    '<div class="entrance balanced"><i class="icon ion-ios-time"></i><br><span>记录</span></div>'
                ],
                movieMap: {},
                bannerList: defaultBannerArr()
            }
        },
        methods: {
            onSearch(keywords) {
                console.log('onSearch', this.keywords)
            },

            onCancel() {
                this.keywords = ''
                console.log('onCancel', this.keywords)
            },

            clickBanner(media) {
                this.play(media)
            },

            jumpPage(index) {
                let routePath = ['/channel_list', '/collect_list', '/record_list']
                this.$router.push(routePath[index])
            },
            goVideoListPage(tag) {
                this.$router.push({
                    name: 'video-list',
                    params: {
                        tag
                    }
                })
            },
            async fetchData() {
                let navRet = await getNavListFromApi()
                let navList = [], ret = {}
                if (navRet.status == 200 && navRet.data.code === 0) {
                    navList = navRet.data.data
                }

                let i = 0, len = navList.length
                for (; i < len; i++) {
                    let tag = navList[i]['tag']
                    let videoRet = await getVideoListByNavFromApi({ tag })
                    if (videoRet.status === 200 && videoRet.data.code === 0) {
                        ret[tag] = videoRet.data.data
                    }
                }
                // console.log(123, ret)
                return ret
            },
            async getRenderData() {
                let ret = await this.fetchData()
                let newRet = {}, bannerList = []
                for (let tag in ret) {
                    let arr = ret[tag]
                    arr = arr.length >= maxNum ? (arr.splice(0, maxNum)) : arr
                    if (arr.length % 2 !== 0) {
                        arr.length = arr.length - 1
                    }
                    if (arr.length >= 2) {
                        newRet[tag] = arr
                        bannerList.push(arr[0])
                    }
                }
                this.movieMap = newRet
                this.bannerList = bannerList
                this.$nextTick(() => {
                    this.$refs.swiper.resize()
                })
                return newRet
            },

            play(media) {
                this.$router.push({
                    name: 'play',
                    params: media
                })
            }
        },
        mounted() {
            this.getRenderData()
        }
    }
</script>

<style>

    /* rem单位切换
    ---------------------------------------- */
    /* html根元素大小
    ---------------------------------------- */
     html {
        font-size: 20vw;
    }

    @media screen and (max-width: 320px) {
        html {
            font-size: 64px;
        }
    }

    @media screen and (min-width: 540px) {
        html {
            font-size: 108px;
        }
    }

    body {
        max-width: 540px;
        min-width: 320px;
        margin: 0 auto;
        position: absolute;
    } 

    #home-page {
    }

    .page.has-navbar .page-content {
        padding-top: 100px;
    }

    .cover {
        width: 100%;
        height: 100%;
    }

    .cover>img {
        width: 100%;
        height: 100%;
    }

    .nav-cell {
    }

    #cells {
        margin: 0;
    }

    #cells .row .col {
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .movie-list {
        display: flex;
        flex-direction: column;
        background-color: #fff;
    }

    .movie-list>header {
        height: 50px;
    }

    .movie-list>ul {
        display: inline-flex;
        flex-wrap: wrap;
    }

    .movie-list>ul>li {
        flex: none;
        width: 49%;
        height: 2.9rem;
    }
    .movie-list>ul>li:nth-child(odd) {
        margin-right: 0.5%;

    }
    .movie-list>ul>li:nth-child(even) {
        margin-left: 0.5%;
    }

    .movie-list>ul>li img {
        width: 100%;
        height: 100%;
    }

    .movie-list .info {
        display: flex;
        padding-left: 5%;
        flex-direction: column;
        align-items: flex-start;
    }

    .movie-list .info>p {
        color: #555;
        font-size: 15px;
        margin: 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 100%;
        text-align: left;
    }

    .movie-list li>.info>span {
        color: #999999;
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 100%;
        text-align: left;
    }

    .movie-list>header {
        padding-left: 3%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .movie-list>header>span {
        display: block;
        margin-left: 10px;
        color: #000000;
        font-size: 16px;
    }

    .dot {
        background-image: url(../../assets/dot.png);
        background-size: 14px 14px;
        width: 14px;
        height: 14px;
        display: block;
    }
</style>
