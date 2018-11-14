<template>
	<div class="collection-content">
		<div class="collection-list" v-show="arrData.length > 0">
			<base-lazy-load-img 
			    mode="default"
		        :time="300"
		        :done="true"
		        :position="{ top: 0, right: 0, bottom: 0, left: 0 }"
			    @success="handleImgSuccess" 
			    @error="handleImgError">
			    <ul>
    				<li 
    				    v-for="(media, index) in arrData" 
    				    :key="media['filename']"
    				    :class="[media['checked'] ? 'li-selected' : '']"
    				    @click="play(media, $event)"
    				>
    					<div class="cover">
    						<img :src="defaultBgImg" :data-src="media['genImgPath']" alt="">
    						<span>{{ getTime() }}</span>
    						<div 
    						    class="choice" 
    						    :class="[media['checked'] ? 'choice-select' : '']"
    						    v-show="showSelectUI"
    						>
    							<input 
    							    type="checkbox" 
    							    class="collection-checkbox"
    							    :id="media['filename']" 
    							    v-model="media['checked']"
    							>
    							<label 
    							    :for="media['filename']"
    							    :class="[media['checked'] ? 'active' : '']"
    							>
    							</label>
    						</div>
    					</div>
    					<p class="title"> {{ media['filename'] }} </p>
    					<p class="tag"> 推荐 </p>
    				</li>
    			</ul>
			</base-lazy-load-img>
		</div>
        <base-empty-tip 
            v-show="arrData.length === 0"
            :title="tipTitle"
            :tips="tips"
        >
        </base-empty-tip>
	</div>
</template>

<script>
	import CommonMixin from '../../../../mixin/common-mixin'
	import { extend } from '../../../../util/index'
	import BaseLazyLoadImg from '../../../base/base-lazy-load-img'
	import BaseEmptyTip from '../../../base/base-empty-tip'

	export default {
		name: 'CollectionContent',
		components: { BaseLazyLoadImg, BaseEmptyTip },
		mixins: [ CommonMixin ],
		data() {
			return {
				showSelectUI: false,
				arrData: [],
				tipTitle: '暂无收藏',
				tips: [
				    '可以进入视频播放页面,可以对其进行添加收藏',
				    '进入首页,也可以对视频进行收藏'
				]
			}
		},
		methods: {
            play(media, $event) {
            	if ($event.target.nodeName === 'IMG') {
	            	this.playVideo(media)
            	}
            },
            openSelectUI(bool) {
                this.showSelectUI = bool
                this.arrData.forEach((media) => {
            		media.checked = false
            	})
            },
            deleteCollectionVideo() {
            	let delArr = this.arrData.filter((media) => {
            		return media.checked == true
            	})
            	if (Array.isArray(delArr)) {
            		delArr.forEach((media) => {
                        this.operateVideo(media, false)
            		})
            	}
            },
            getRenderData() {
            	if (Object.keys(this.videoCollection).length === 0) {
            		return this.arrData = []
            	}
            	this.arrData = this.videoCollection.map((media) => {
            		let copy = extend({}, media)
            		copy.checked = false
            		return copy
            	})
            }
		},
		activated() {
            this.getRenderData()
		}
	}
</script>

<style scoped>
	/* 数据列表 样式 */
	.collection-content {
		flex: 1;
		height: 100%;
		overflow: auto;
		background-color: rgba(27,34,38,1);
	}

	.collection-list {
		padding-top: 22px;
		padding-left: 22px;
		padding-right: 12px;
	}

	.collection-list ul {
		display: flex;
		flex-wrap: wrap;
	}

	.collection-list ul li {
		width: 180px;
		height: 167px;
		margin-right: 10px;
		margin-bottom: 2px;
		overflow: hidden;
		border: 2px solid transparent;
	}

	.collection-list ul li:hover {
		border: 2px solid rgba(49,56,59,.8);
		cursor: pointer;
	}

	/* li边框变绿 */
	.li-selected {
		border: 2px solid rgba(11,190,6,1)!important;
	}

	/* 封面样式 */
	.cover {
		width: 100%;
		height: 96px;
		overflow: hidden;
		position: relative;
	}

	.cover img {
		width: 100%;
		height: 100%;
	}

	.cover span {
		width: 55px;
		height: 22px;
		line-height: 22px;
		display: block;
		position: absolute;
		right: 0;
		bottom: 0;
		background-color: rgba(11,190,6,1);
		color: rgba(255,255,255,1);
		text-align: center;
	}

	/* 复选框 样式 */
	.choice {
		width: 16px;
		height: 16px;
		position: absolute;
		right: 1px;
		top: 1px;
		background-color: rgba(31,31,31,1);
	}

	/* 选中后背景变绿 */
	.choice-select {
		background-color: rgba(11,190,6,1)!important;
	}

	.collection-checkbox {
		display: none;
	}

	.collection-checkbox+label {
	    padding: 8px;
	    position: relative;
	}

	.collection-checkbox:checked+label:after {
	    content: '\2714';
	    position: absolute;
	    top: 5px;
	    left: 2px;
	    font-size: 14px;
	    color: rgba(11,190,6,1);
	}

	/* 选中后字体变白 */
	.collection-checkbox:checked+label.active:after {
		color: #fff!important;
	}

	/* 文字样式 */
	.collection-list ul li p {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: left;
	}

	.collection-list ul li>.title {
		margin-top: 5px;
		font-size: 13px;
		font-weight: 300;
		color: rgba(204,204,204,1);
	}

	.collection-list ul li>.tag {
		margin-top: 2px;
		font-size: 12px;
		font-weight: 300;
		color: rgba(137,137,138,1);
	}
</style>