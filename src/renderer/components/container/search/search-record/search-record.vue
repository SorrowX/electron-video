<template>
	<div class="search-record">
        <div class="record-operat">
            <p>最近搜索</p>
            <div 
                class="operat" v-show="!showEmptyUi"
                @click="clearSearchRecord"
            >
                <i class="clear"></i>
                清空
            </div>
        </div>
        <transition>
            <div class="record-list" v-if="!showEmptyUi">
                <span 
                    v-for="(key, index) in searchRecord"
                    @click="$emit('select-key', key)"
                >
                    {{ key }}
                </span>
            </div>
            <div class="record-list-empty" v-else>
                <i class="no-result-img"></i>
                当前暂无历史搜索纪录
            </div>
        </transition>
	</div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
	export default {
		name: 'SearchRecord',
        computed: {
            ...mapState(['searchRecord']),
            showEmptyUi() {
                if (!Array.isArray(this.searchRecord)) {
                    return true
                } else {
                    return this.searchRecord.length === 0 ? true : false
                }
            }
        },
        methods: {
            ...mapActions(['clearSearchRecord'])
        }
	}
</script>

<style scoped>
    .search-record {
        flex: 1;
        width: 100%;
        height: 100%;
    	padding: 30px 32px 0 32px;
    	font-family:"Microsoft YaHei";
        overflow: auto;
        display: flex;
        flex-direction: column;
    }

    /* 滚动条控制样式 */
    .search-record::-webkit-scrollbar {
        display: none;
    } 

    .record-operat {
    	display: flex;
    }

    .record-operat>p {
    	margin-right: 30px;
    	color: #fff;
    	font-size: 18px;
    	font-weight: 500;
    }

    .operat {
    	display: flex;
    	align-items: center;
    	color: rgba(153,153,153,1);
    	font-size: 13px;
    }

    .record-list>span,
    .operat:hover {
        cursor: pointer;
    }

    .clear {
    	display: block;
    	width: 21px;
    	height: 21px;
    	background-image: url(../../../../assets/Delete1.png);
    	background-size: contain;
    }

    .record-list {
    	padding-top: 20px;
    }

    .record-list>span {
    	display: inline-block;
    	padding: 4px 15px; 
    	margin-bottom: 15px;
    	margin-right: 15px;
    	border: 1px solid rgba(60,60,65,1);
    	border-radius: 25px;
    	background-color: rgba(60,60,65,1);
    	font-size: 13px;
    	color: rgba(204,204,204,1);
    }

    .record-list-empty {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: rgba(183,174,168,1);
        padding-bottom: 10%;
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