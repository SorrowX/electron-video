<template>
	<div class="channel-content-movie-list" >
		<dl v-for="(obj, index) in listData">
			<dt>
				<span>{{ obj['tag'] }}</span>
				<i></i>
				<span 
				    class="more" 
				    v-show="obj['rows'] == 2"
				    @click.stop="jumpQuickViewComponent(obj['tag'])"
				>
			        更多
			    </span>
			</dt>
			<dd>
				<channel-content-movie-recommend
				    :rows="obj['rows']"
				    :rowsObjArr="obj['rowsObjArr']"
				></channel-content-movie-recommend>
			</dd>
		</dl>
	</div>
</template>

<script>
	import CommonMixin from '@/mixin/common-mixin'
	import { getRandomItemFromArr } from '@/util/index'
	import ChannelContentMovieRecommend from './channel-content-movie-recommend'
	import { 
		SWITCH_QUICK_VIEW_NAV_DATA_MESSAGE,
		WINDOW_BAR_SHOW_BACK_ARROW_MESSAGE
	} from '@/constant/index'

	const components = { ChannelContentMovieRecommend }

	export default {
		name: 'ChannelContentMovieList',
		components,
		mixins: [ CommonMixin ],
		data() {
			return {
				listData: []
			}
		},
		methods: {
			async updateRenderData() {
				let ret = []
				let navArr = this.navArr, 
				    i = 0, 
				    len = navArr.length,
				    num = 7
				;for (; i < len; i++) {
					let nav = navArr[i]
					let dataArr = await this.getVideoDataByTagPromise(nav['tag'])
					let obj = {}
					obj.tag = nav['tag']
					if (dataArr.length >= num * 2) {
						obj.rows = 2
						let randomArr = getRandomItemFromArr(dataArr, num * 2)
						obj.rowsObjArr = [ randomArr.slice(0, num), randomArr.slice(num) ]
					} else if (dataArr.length <= num) {
						obj.rows = 1
						obj.rowsObjArr = [ dataArr.slice(0) ]
					}
                    ret.push(obj)
				}
				return this.listData = ret
			},
			jumpQuickViewComponent(navName) {
				let navObj = this.navArr.find((nav) => {
					return nav['tag'] = navName
				})
				this.insideSwitchNav('QuickView')
				this.$root.$emit(SWITCH_QUICK_VIEW_NAV_DATA_MESSAGE, navObj)
				this.$parent.show = false
			}
			
		}
	}
</script>

<style scoped>
	.channel-content-movie-list {
		margin-top: 20px;
	}

	.channel-content-movie-list>dl {
		margin-top: 10px;
	}

	.channel-content-movie-list>dl>dt {
		height: 64px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: sticky;
		top: -1px;
		left: 0;
		z-index: 10;
		font-size: 16px;
		color: rgba(204,204,204,1);
		background-color: rgba(27,34,38,1);
	}

	.channel-content-movie-list>dl>dt>i {
		height: 1px;
		flex: 1;
		display: block;
		margin: 0 15px;
		background: rgba(39,45,49,1);
	}

	.channel-content-movie-list .more {
		font-size: 13px;
		color: rgba(102,102,102,1);
	}

	.channel-content-movie-list .more:hover {
		cursor: pointer;
	}

	.channel-content-movie-list>dl>dd {

	}
</style>