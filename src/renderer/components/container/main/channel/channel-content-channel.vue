<template>
	<div class="channel-content-channel">
		<main 
		    class="channel-content-channel-main" 
		    v-if="allChannel.length > 0 && navArr.length > 0"
		>
			<base-lazy-load-img 
			    mode="diy"
	            :time="300"
	            :done="true"
	            :position="{ top: 0, right: 0, bottom: 0, left: 0 }"
	            :diy="{ backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center' }"
			    @success="handleImgSuccess" 
			    @error="handleImgError">
			    <dl v-show="useChannel.length > 0">
    				<dt>常用频道</dt>
    				<dd 
    				    v-for="(channel, index) in useChannel"
    				    @click="showDetails(channel)"
    				    :key="channel['thumb']"
    				>
    					<img :src="defaultBgImg" :data-src="channel['thumb']">
    					<span>{{ channel['tag'] }}</span>
    				</dd>
    			</dl>
			</base-lazy-load-img>

			<base-lazy-load-img 
			    mode="diy"
	            :time="300"
	            :done="true"
	            :position="{ top: 0, right: 0, bottom: 0, left: 0 }"
	            :diy="{ backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center' }"
			    @success="handleImgSuccess" 
			    @error="handleImgError">
			    <dl>
    				<dt>全部频道</dt>
    				<dd 
    				    v-for="(channel, index) in allChannel"
    				    @click="showDetails(channel)"
    				>
    					<img :src="defaultBgImg" :data-src="channel['thumb']">
    					<span>{{ channel['tag'] }}</span>
    				</dd>
    			</dl>
			</base-lazy-load-img>
		</main>
		<base-loading 
		    v-show="loading"
		    size="min" 
		>
		</base-loading>
		<base-empty-tip 
		    v-show="navArr.length == 0"
		    :title="tipTitle"
		    :tips="tips"
		>
		</base-empty-tip>
	</div>
</template>

<script>
	import CommonMixin from '@/mixin/common-mixin'
	import { getRandomItemFromArr } from '@/util/index'
	import BaseLazyLoadImg from '@/components/base/base-lazy-load-img'
	import BaseLoading from '@/components/base/base-loading'
	import BaseEmptyTip from '@/components/base/base-empty-tip'

	export default {
		name: 'ChannelContentChannel',
		mixins: [ CommonMixin ],
		components: { BaseLazyLoadImg, BaseLoading, BaseEmptyTip },
		data() {
			return {
				allChannel: [],
				useChannel: [],
				loading: false,
				tipTitle: '暂无频道',
				tips: [
				    '进入‘快速查看’页面,对其进行添加导航'
				]
			}
		},
		methods: {
			async getAllChannelData() {
				this.loading = true
				let ret = []
				let navArr = this.navArr, 
				    i = 0, 
				    len = navArr.length
				;for (; i < len; i++) {
					let nav = navArr[i]
					let dataArr = await this.getVideoDataByTagPromise(nav['tag'])
					let obj = {}
					obj.tag = nav['tag']
					if (dataArr.length > 0) {
						let randomArr = getRandomItemFromArr(dataArr, 1)
						obj.thumb = randomArr[0]['genImgPath']
					} else {
						obj.thumb = defaultThumb
					}
                    ret.push(obj)
				}
				this.allChannel = ret
				this.loading = false
				// console.log('频道数据: ', ret)
			},
			showDetails(channel) {
				this.addUseChannel(channel)
				this.$emit('show-details', channel)
			},
			addUseChannel(channel) {
				let i = this.useChannel.findIndex((c) => {
					return c == channel
				})
				if (i === -1) {
					this.useChannel.push(channel)
				} else {
					this.useChannel.splice(i, 1)
					this.useChannel.unshift(channel)
				}
			}
		},
		mounted() {
			this.getAllChannelData()
		}
	}
</script>

<style scoped>
	.channel-content-channel {
		position: absolute;
		width: 100%;
		height: 100%;
		overflow: auto;
		z-index: 0;
	}

	.channel-content-channel-main {
		padding-left: 22px;
		padding-right: 12px;
	}

	.channel-content-channel-main dl {
	}

	.channel-content-channel-main dl dt {
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

	.channel-content-channel-main dl dd {
		width: 95px;
		height: 95px;
		display: inline-flex;
		margin-right: 10px;
		margin-bottom: 10px;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		transition: border .35s;
		border: 2px solid rgba(39,45,49,1);
		font-size: 12px;
		color: rgba(204,204,204,1);
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		letter-spacing: 5px;
		position: relative;
	}

	.channel-content-channel-main dl dd:hover {
		border: 2px solid rgba(10,190,5,1);
		cursor: pointer;
	}

	.channel-content-channel-main dl dd img {
		width: 80px;
		height: 80px;
		transition: all .35s;
	}

	.channel-content-channel-main dl dd img:hover {
		transform: scale(1.5);
	}

	.channel-content-channel-main dl dd span {
		display: block;
		width: 100%;
		height: 20px;
		position: absolute;
		bottom: 0;
		background-color: rgba(0,0,0,.5);
		line-height: 20px;
		text-align: center;
		color: rgba(51,190,9,1);
	}
</style>