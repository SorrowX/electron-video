<template>
	<div class="search-content-result">
		<div class="title" v-if="showResult">
			<p>相关</p>
		</div>

		<div class="result" v-if="showResult">
			<div class="cover">
				<img :src="renderData.result.genImgPath">
			</div>
			<div class="info">
				<p class="name">{{ renderData.result.filename }}</p>
				<p>目录: {{ renderData.result.dir }}</p>
				<p>路径: {{ renderData.result.name }}</p>
				<p>上映时间：2015</p>
				<p>来源<i class="source-logo"></i></p>
				<button @click="play(renderData.result)">立即观看</button>
			</div>
		</div>
		<div class="result-list" v-if="showResult">
            <base-lazy-load-img 
                mode="diy"
                :time="300"
                :done="true"
                :position="{ top: 0, right: 0, bottom: 0, left: 0 }"
                :diy="{ backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center' }"
                @success="handleImgSuccess" 
                @error="handleImgError">
                <ul>
                    <li 
                        v-for="(ret, index) in renderData.keyRet" 
                        @click="play(ret)"
                        :key="ret['filename']"
                    >
                        <div class="li-cover">
                            <img :src="ret.genImgPath" alt="">
                        </div>
                        <div class="li-info">
                            <p class="name">{{ ret.filename }}</p>
                            <p>来源: 爱奇艺</p>
                            <p>发布时间: 2018-07-15</p>
                        </div>
                    </li>
                </ul>
            </base-lazy-load-img>
		</div>

        <div class="nav-search-result" v-if="showNavRet">
        	<div class="nav-title">
        		以下是 <span @click="jumpNav(renderData.tag)">{{ renderData.tag }}</span> 导航中的数据来源
        	</div>

	       <div class="result-list">
                <base-lazy-load-img 
                    mode="diy"
                    :time="300"
                    :done="true"
                    :position="{ top: 0, right: 0, bottom: 0, left: 0 }"
                    :diy="{ backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center' }"
                    @success="handleImgSuccess" 
                    @error="handleImgError">
                    <ul>
                        <li 
                            v-for="(ret, index) in renderData.navRet" 
                            @click="play(ret)"
                            :key="ret['filename']"
                        >
                            <div class="li-cover">
                                <img :src="ret.genImgPath" alt="">
                            </div>
                            <div class="li-info">
                                <p class="name">{{ ret.filename }}</p>
                                <p>来源: 爱奇艺</p>
                                <p>发布时间: 2018-07-15</p>
                            </div>
                        </li>
                    </ul>
                </base-lazy-load-img>
            </div>
        </div>

        <div class="no-result" 
            v-if="showNoResult"
        >
            <i class="no-result-img"></i>
            <p>没搜到结果 哇 啊 啊 ...</p>
        </div>

        <footer class="search-footer">
        	<span>悦享品质</span>
        	<span>Always Fun, Always Fine</span>
        </footer>
	</div>
</template>

<script>
    import CommonMixin from '@/mixin/common-mixin'
    import BaseLazyLoadImg from '@/components/base/base-lazy-load-img'
    import { 
        SWITCH_QUICK_VIEW_NAV_DATA_MESSAGE
    } from '@/constant/index'

	export default {
		name: 'SearchContentResult',
        mixins: [ CommonMixin ],
        components: { BaseLazyLoadImg },
        computed: {
            showResult() {
                return this.renderData.result ? true : false
            },
            showNavRet() {
                return this.renderData.navRet.length > 0 ? true : false
            },
            showNoResult() {
                if (this.showResult || this.showNavRet) {
                    return false
                } else {
                    return true
                }
            }
        },
        data() {
            return {
                renderData: {
                    navRet: [],
                    keyRet: [],
                    result: null,
                    tag: ''
                }
            }
        },
        methods: {
            async getRenderData(key) {
                await this.searchResourcesByKey(key).then((ret) => {
                    this.renderData = ret
                })
            },
            play(media) {
                this.playVideo(media)
            },
            jumpNav(tag) {
                this.$root.windowBarComponent.goBack()
                this.insideSwitchNav('QuickView')
                
                let navObj = this.navArr.find((nav) => {
                    return nav['tag'] === tag
                })
                
                this.$root.$emit(SWITCH_QUICK_VIEW_NAV_DATA_MESSAGE, navObj)
            }
        }
	}
</script>

<style scoped>
    .search-content-result {
		width: 66.5%;
		overflow: auto;
		padding-left: 4%;
		font-family:"Microsoft YaHei";
    }

    /* 滚动条控制样式 */
	.search-content-result::-webkit-scrollbar {
		width: 3px;
	}

    .title {
    	height: 49px;
    	display: flex;
    	align-items: flex-end;
    	position: sticky;
    	top: 0;
    	background: rgba(27,34,38,1);
    }

    .title>p {
    	font-size: 21px;
    	color: rgba(11,190,6,1);
    }

    .result {
    	width: 100%;
    	display: flex;
    	padding: 28px 0;
    	overflow: hidden;
    }

    .result>.cover {
    	flex: none;
    	width: 144px;
    	height: 190px;
        overflow: hidden;
    }

    .result>.cover>img {
    	width: 100%;
    	height: 100%;
    	background-repeat: no-repeat;
        object-fit: cover;
    }

    .result>.info {
    	flex: 1;
    	display: flex;
    	flex-direction: column;
    	margin-left: 15px;
    	overflow: hidden;
    }

    .result>.info>.name {
    	font-size: 17px;
    	color: rgba(11,190,6,1);
    }

    .result>.info>p,
    .li-info p {
    	width: 90%;
    	font-size: 13px;
    	margin-bottom: 10px;
    	color: rgba(148,148,148,1);
    	text-overflow: ellipsis;
    	overflow: hidden;
    	white-space: nowrap;
    }

    .result>.info>p:nth-child(4) {
    	margin-bottom: 20px;
    }

    .result>.info>p:nth-child(5) {
    	display: flex;
    	align-items: center;
    	margin-bottom: 8px;
    }

    .result>.info>button {
    	width: 90px;
    	height: 30px;
    	border: 0;
    	outline: none;
    	color: #fff;
    	font-family:"Microsoft YaHei";
    	background-color: rgba(11,190,6,1);
    }

    .source-logo {
    	display: block;
    	width: 15px;
    	height: 13px;
    	margin-left: 6px;
    	background-size: contain;
    	background-repeat: no-repeat;
    	background-image: url(../../../../assets/min-logo.png);
    }

    /* 搜索列表结果 */
    .result-list {
    }

    .result-list ul {
    }

    .result-list ul li {
    	width: 100%;
        display: flex;
        margin-bottom: 20px;
    }

    .result-list ul li:hover {
        cursor: pointer;
    }

    .li-cover {
    	flex: none;
    	width: 144px;
    	height: 82px;
    }
    .li-cover img {
    	width: 100%;
    	height: 100%;
    }

    .li-info {
    	flex: 1;
    	margin-left: 15px;
    	overflow: hidden;
    }

    .li-info p {
    	font-size: 12px;
    }

    .li-info>.name {
    	font-size: 15px;
    	color: rgba(204,204,204,1);
    }

    /* 导航列表中搜索 样式 */
    .nav-title {
    	padding: 20px 0;
    	font-size: 17px;
    	color: rgba(11,190,6,1);
    }

    .nav-title>span {
        cursor: pointer;
        color: red;
    }

    /* 底部 */
    .search-footer {
        height: 120px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
	}

	.search-footer span {
		color: rgba(204,204,204,1);
	}

	.search-footer span:nth-child(1) {
		font-size: 16px;
		letter-spacing: 30px;
	}

	.search-footer span:nth-child(2) {
		font-size: 12px;
		letter-spacing: 1px;
		margin-left: -28px;
	}

    /* 没有结果的 样式 */
    .no-result {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: calc(100% - 120px); /* 减去底部高度 */
        font-size: 14px;
        color: rgba(183,174,168,1);
    }

    .no-result-img {
        margin-top: 30px;
        display: block;
        width: 120px;
        height: 120px;
        background-image: url(../../../../assets/waw.gif);
        background-size: contain;
    }
	
</style>