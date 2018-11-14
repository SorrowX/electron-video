<template>
	<div class="record-content">
		<div class="record-list">
		    <dl v-for="(mediaArr, index) in records">
			    <dt>
			        {{ mediaArr['time'] }}
			        <span class="delete" @click="delectRecord(mediaArr['time'])"></span>
			    </dt>
		    	<base-lazy-load-img 
		    	    mode="default"
		            :time="300"
		            :done="true"
		            :position="{ top: 0, right: 0, bottom: 0, left: 0 }"
		    	    @success="handleImgSuccess" 
		    	    @error="handleImgError">
				    <dd 
				        class="dd-media" 
				        v-for="(media, index) in mediaArr" 
				        :key="media['filename']"
				        @click="playVideo(media)"
				    >
				    	<div class="cover">
				    		<img :src="defaultBgImg" :data-src="media['genImgPath']" alt="">
				    		<div class="progress-slot">
					    		<i class="progress" :style="{ width: getProgressPercentage(media['videoInfo']) }"></i>
				    		</div>
				    	</div>
				    	<p class="title">
				    		{{ media['filename'] }}
				    	</p>
				    	<p class="tag"> 观看时长至 {{ getTimeStrBySecond(media['videoInfo']['curTime']) }} </p>
				    </dd>
			    </base-lazy-load-img>
		    </dl>
		</div>

		<base-empty-tip 
		    v-show="records.length === 0"
		    :title="tipTitle"
		    :tips="tips"
		>
		</base-empty-tip>
	</div>
</template>

<script>
	import { ADD_VIDEO_RECORD, DELETE_VIDEO_RECORD_BY_KEY } from '@/store/mutation-types'
	import { extend, getTime, getTimeStrBySecond } from '@/util/index'
	import BaseLazyLoadImg from '@/components/base/base-lazy-load-img'
	import BaseEmptyTip from '@/components/base/base-empty-tip'
	import CommonMixin from '@/mixin/common-mixin'

	export default {
		name: 'RecordContent',
		components: { BaseLazyLoadImg, BaseEmptyTip },
		mixins: [ CommonMixin ],
		data() {
			return {
				records: [],
				tipTitle: '暂无播放记录',
				tips: [
				    '可以进入视频播放页面,播放即可',
				    '无视频资源的话,请进入 “快速查看” 页面,进行添加导航'
				]
			}
		},
		methods: {
			getTimeStrBySecond(second) {
				return getTimeStrBySecond(second)
			},
			getProgressPercentage(videoInfo) {
				if (videoInfo) {
					return Math.ceil(videoInfo['curTime']/videoInfo['duration']*100) + '%'
				} else {
					return '0%'
				}
			},
			getRenderData() {
				if (this.videoRecord.length === 0) {
					return this.records = []
				}
				let newkeys = []
				let keys = Object.keys(this.videoRecord)
				newkeys = keys.map((key) => {
					return new Date(key).getTime()
				})
				newkeys.sort((a, b) => b - a)
				this.records = newkeys.map((timerub) => {
					let arrMedia = this.videoRecord[getTime(timerub)].slice(0)
					arrMedia.time = getTime(timerub)
                    return arrMedia
				})
			},
			delectRecord(key) {
				this.deleteVideoRecordByKey(key)
			}
		},
		activated() {
            this.getRenderData()
		},
		mounted() {
			this.$store.subscribe((mutation, state) => {
			    if (
			    	mutation.type == ADD_VIDEO_RECORD ||
			    	mutation.type== DELETE_VIDEO_RECORD_BY_KEY
			    ) {
			    	this.getRenderData()
			    }
			})
		}
	}
</script>

<style scoped>
	/* 数据列表 样式 */
	.record-content {
		flex: 1;
		height: 100%;
		overflow: auto;
		background-color: rgba(27,34,38,1);
	}

	.record-list {
		padding-left: 22px;
		padding-right: 12px;
	}

	.record-list dl dt {
		height: 64px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: sticky;
		top: 0;
		z-index: 10;
		font-size: 16px;
		color: rgba(204,204,204,1);
		background-color: rgba(27,34,38,1);
	}

	.delete {
		width: 21px;
		height: 21px;
		margin-right: 10px;
		background-image: url(../../../../assets/Delete.png);
		background-size: contain;
	}

	.delete:hover {
		cursor: pointer;
	}

	.record-list dl dd {
		width: 180px;
		height: 167px;
		display: inline-block;
		margin-right: 10px;
		margin-bottom: 2px;
		overflow: hidden;
		border: 2px solid transparent;
	}

	.record-list dl dd:hover {
		border: 2px solid rgba(49,56,59,.8);
		cursor: pointer;
	}

	/* 封面样式 */
	.cover {
		width: 100%;
		height: 96px;
		overflow: hidden;
		position: relative;
	}

	.progress-slot {
		width: 100%;
		height: 2.5px;
		position: absolute;
		bottom: 0;
		left: 0;
		background-color: rgba(61,61,61,1);
	}

	.progress {
		display: block;
		width: 0%;
		height: 100%;
		background-color: rgba(11,190,6,1);
	}

	.cover img {
		width: 100%;
		height: 100%;
	}

	/* 文字样式 */
	.dd-media p {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.dd-media>.title {
		margin-top: 5px;
		font-size: 13px;
		font-weight: 300;
		color: rgba(204,204,204,1);
	}

	.dd-media>.tag {
		margin-top: 2px;
		font-size: 12px;
		font-weight: 300;
		color: rgba(137,137,138,1);
	}
</style>