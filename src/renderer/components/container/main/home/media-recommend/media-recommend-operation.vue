<template>
	<div class="media-operation">
		<button class="media-library" @click="$emit('go-on-library')">进入片库</button>

        <div class="media-next" @click="$emit('next')">
            <i></i>
            下一个
        </div>

        <div class="media-play" @click="$emit('play')">
            <i></i>
            播放
        </div>

        <div class="media-collection" @click="collection">
            <i :class="[ isCollection === false ? 'cancel-collection' : 'collection' ]"></i>
            收藏
        </div>

		<button class="media-detail" @click="openDetail">
			详情
			<i :class="[ isOpenDetail === false ? 'arrow-down' : 'arrow-up' ]"></i>
		</button>
	</div>
</template>

<script>
	export default {
		name: 'MediaRecommendOperation',
		data() {
			return {
				isOpenDetail: false,
                isCollection: false
			}
		},
		methods: {
			openDetail() {
				this.isOpenDetail = !this.isOpenDetail
				this.$emit('open-detail', this.isOpenDetail)
			},
            collection() {
                this.isCollection = !this.isCollection
                this.$emit('collection', this.isCollection)
            }
		}
	}
</script>

<style scoped>

    /* 按钮通用样式 */
    .media-operation>button {
    	position: absolute;
    	right: 20px;
    	border: none;
    	outline: none;
    	color: #fff;
        font-style: normal;
    	background-color: rgba(221,221,221,.45);
    }

    /* 进入片库样式 */
	.media-library {
        /*top: 38px;*/
	    top: 8.5%;
	    padding: 4px 10px;
	    border-radius: 50px;
	    font-weight: 500;
	}
    
    /* .media-operation下的div 及 div下的i通用样式 */
    .media-operation>div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 20px;
        color: #fff;
        font-size: 10px;
    }

    .media-operation>div>i {
        display: block;
        width: 26px;
        height: 26px;
        margin-bottom: 4px;
        background-repeat: no-repeat;
        background-size: contain;
    }

    /* 下一个 样式 */
    .media-next {
        /*top: 120px;*/
        top: 27%;
    }

    .media-next>i {
        background-image: url(../../../../../assets/media-recommend/next.png);
    }

    /* 播放 样式 */
    .media-play {
        /*top: 190px;*/
        top: 43%;
        margin-right: 2.5px;
    }

    .media-play>i {
        background-image: url(../../../../../assets/media-recommend/play_count.png);
    }

    /* 收藏 样式 */
    .media-collection {
        /*top: 262px;*/
        top: 58%;
        margin-right: 3px;
    }

    .cancel-collection {
        background-image: url(../../../../../assets/media-recommend/fav.png);
    }

    .collection {
        background-image: url(../../../../../assets/media-recommend/faved.png);
    }

	/* 详情样式 */
    .media-detail {
    	display: flex;
    	justify-content: center;
    	align-items: center;
        /*bottom: 65px;*/
    	bottom: 14%;
    	padding: 4px 6px;
    }

    .media-detail>i {
    	display: inline-block;
    	width: 15px;
    	height: 15px;
    	background-size: contain;
    	background-repeat: no-repeat;
    }

    .arrow-down {
    	background-image: url(../../../../../assets/media-recommend/arrow_down.png);
    }

    .arrow-up {
    	background-image: url(../../../../../assets/media-recommend/arrow_up.png);
    }

    /* 手型 */
    .media-library:hover,
    .media-detail:hover,
    .media-next:hover,
    .media-play:hover,
    .media-collection:hover {
        cursor: pointer;
    }

    /* 媒体查询样式 */
    @media screen and (min-height: 768px) {
        /* 按钮通用样式 */
        .media-operation>button {
            right: 55px;
        }

        /* 进入片库样式 */
        .media-library {
            padding: 6px 15px;
            font-weight: 300;
            font-size: 17px;
        }
        
        /* .media-operation下的div 及 div下的i通用样式 */
        .media-operation>div {
            right: 55px;
        }

        .media-operation>div>i {
            width: 50px;
            height: 50px;
            margin-bottom: 6px;
        }

        /* 详情样式 */
        .media-detail {
            padding: 6px 8px;
            font-size: 14px;
        }
    }

</style>