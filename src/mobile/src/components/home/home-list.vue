<template>
	<div class="home-list">
        <base-lazy-load 
            mode="default"
            :time="300"
            :done="true"
            :position="{ top: 0, right: 0, bottom: 0, left: 0 }"
        >
		<ul>
			<li v-for="(video, index) in renderList" :key="video['filename']">
				<div class="cover">
                    <img :src="defaultBgImg" :data-src="video['imgUrl']">
                    <div class="identifier" v-if="isShowIdentifier">LOVE</div>
                    <div class="message">电影</div>         
                </div>
                <p class="title">{{ video['filename'] }}</p>
                <p class="info">{{ video['dir'] }}</p>
			</li>
		</ul>
        </base-lazy-load>
	</div>
</template>

<script>
    import BaseLazyLoad from '@/components/base/base-lazy-load-img'
    import { getRandomItemFromArr } from '@/common/js/util/index'
    const defaultBgImg = require('../../assets/video-defaultpic.png')

	export default {
		name: 'HomeList',
        components: { BaseLazyLoad },
        props: {
            videoList: { // 接口返回的视频对象数组
                type: Array,
                default: function() { return [] }
            },
            num: { // 显示几个视频
                type: Number,
                default: 2
            },
            isRandom: { // 是否从videoList中随机选取num个视频
                type: Boolean,
                default: true
            },
            isShowIdentifier: { // 是否显示标识符
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                defaultBgImg
            }
        },
        computed: {
            renderList() {
                let num = this.videoList.length >= this.num ? this.num : this.videoList.length
                return this.isRandom
                    ? getRandomItemFromArr(this.videoList, num)
                    : this.videoList.slice(0, num)
            }
        }
	}
</script>

<style scoped>
    .home-list {  }

    .home-list ul {
    	width: 100%;
    	display: flex;
    	flex-wrap: wrap;
    }

    .home-list ul li {
    	width: 50%;
    	overflow: hidden;
    }

    .home-list ul li>.cover {
        width: 100%;
        height: 2.1rem;
        background: #FAFAFA;
        overflow: hidden;
        position: relative;
    }

    .home-list ul li>.cover>img {
        width: 100%;
        height: 100%;
    }

    .home-list ul li>.title,
    .home-list ul li>.info {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0 0.12rem;
    }

    .home-list ul li>.title {
        min-height: 18px;
        margin-top: 0.2rem;
        font-size: 14px;
        color: #000;
    }

    .home-list ul li>.info {
        min-height: 16px;
        margin-bottom: 0.4rem;
        font-size: 12px;
        color: #999999;
    }

     /* 奇数 */
    .home-list ul li:nth-child(odd) .cover {
    	padding-right: 0.03rem;
    }

    /* 偶数 */
    .home-list ul li:nth-child(even) .cover {
    	padding-left: 0.03rem;
    }

    /* 标识符 */
    .identifier {
        width: 38px;
        height: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 5px;
        top: 5px;
        color: #fff;
        font-size: 12px;
        background-image: linear-gradient(46deg,rgba(255,147,19,0.8) 0%, rgba(255,102,00,0.8) 100%);
        box-shadow: 0 0 8px 0 rgba(255,110,0,0.20);
    }

    .message {
        position: absolute;
        right: 0.03rem;
        bottom: 0.03rem;
        font-size: 10px;
        color: #F2F2F2;
    }
    .home-list ul li:nth-child(odd) .message {
        right: 0.06rem;
    }
</style>