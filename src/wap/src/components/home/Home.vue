<template>
    <div class="page">
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
                height="160" 
                pager-color="#ea5a49" 
                pager-bg-color="#e5e4e3"
                hide-pager="false"
            >
                <swiper-item>
                    <div class="cover" @click="onClick()">
                        <img src="https://r1.ykimg.com/050C00005AB0949FAD881A05B80529DD" alt="">
                    </div>
                </swiper-item>

                <swiper-item>
                    <div class="cover">
                        <img src="https://r1.ykimg.com/050C00005AB0949FAD881A05B80529DD" alt="">
                    </div>
                </swiper-item>

                <swiper-item>
                    <div class="cover">
                        <img src="https://r1.ykimg.com/050C00005AB0949FAD881A05B80529DD" alt="">
                    </div>
                </swiper-item>
            </swiper>

            <div class="nav-cell">
                <cells id="cells" :items="entrances" :on-cell-click="jumpPage" row="1"></cells>
            </div>

            <div class="movie-list">
                <header>
                    <i class="dot"></i>
                    <span>咨询</span>
                </header>
                <ul>
                    <li>
                        <div>
                            <img src="https://r1.ykimg.com/050C00005B174B01ADC0B0718204E6F8" alt="">
                        </div>
                        <div class="info">
                            <p>九辫儿相爱相杀</p>
                            <span>德云三宝沈阳专场</span>
                        </div>
                    </li>

                    <li>
                        <div>
                            <img src="https://r1.ykimg.com/050C00005B174B01ADC0B0718204E6F8" alt="">
                        </div>
                        <div class="info">
                            <p>九辫儿相爱相杀</p>
                            <span>德云三宝沈阳专场</span>
                        </div>
                    </li>

                    <li>
                        <div>
                            <img src="https://r1.ykimg.com/050C00005B174B01ADC0B0718204E6F8" alt="">
                        </div>
                        <div class="info">
                            <p>九辫儿相爱相杀</p>
                            <span>德云三宝沈阳专场</span>
                        </div>
                    </li>

                    <li>
                        <div>
                            <img src="https://r1.ykimg.com/050C00005B174B01ADC0B0718204E6F8" alt="">
                        </div>
                        <div class="info">
                            <p>九辫儿相爱相杀</p>
                            <span>德云三宝沈阳专场</span>
                        </div>
                    </li>

                    <li>
                        <div>
                            <img src="https://r1.ykimg.com/050C00005B174B01ADC0B0718204E6F8" alt="">
                        </div>
                        <div class="info">
                            <p>九辫儿相爱相杀</p>
                            <span>德云三宝沈阳专场</span>
                        </div>
                    </li>

                    <li>
                        <div>
                            <img src="https://r1.ykimg.com/050C00005B174B01ADC0B0718204E6F8" alt="">
                        </div>
                        <div class="info">
                            <p>九辫儿相爱相杀</p>
                            <span>德云三宝沈阳专场</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                keywords: '',
                entrances: [
                    '<div class="entrance assertive"><i class="icon ion-ios-film"></i><br><span>频道</span></div>',
                    '<div class="entrance energized"><i class="icon ion-ios-heart"></i><br><span>收藏</span></div>',
                    '<div class="entrance balanced"><i class="icon ion-ios-time"></i><br><span>记录</span></div>'
                ]
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

            onClick() {
                console.log('点我干嘛')
            },

            jumpPage(index) {
                let routePath = ['/channel_list', '/collect_list', '/record_list']
                this.$router.push(routePath[index])
            }
        }
    }
</script>

<style>
    h2 {
        font-family: Candara,Calibri,Segoe,Segoe UI,Optima,Arial,sans-serif;
        color: #888;
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
        height: 170px;
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
    }

    .movie-list li>.info>span {
        color: #999999;
        font-size: 12px;  
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
