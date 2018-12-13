<template>
	<div class="nav-panel">
		<base-back :title="'导航'" :style="{ position: 'fixed' }">
			<span slot="operate" v-finger:tap="refreshNav">
		        重置
		    </span>
		</base-back>
		<div class="wrapper" v-if="myChannelList.length || allChannelList.length">
			<dl>
				<dt class="dt-channel">
					我的频道
				</dt>
				<dd>
					<nav-panel-list 
					    :list="myChannelList"
					    :type="0"
					    @tap-nav="handlerTapNav"
		                @double-tap-nav="handlerDoubleTapNav"
					>
					</nav-panel-list>
				</dd>
			</dl>
			<dl>
				<dt class="dt-channel">
					全部频道
				</dt>
				<dd>
		            <nav-panel-list 
		                :list="allChannelList"
		                :type="1"
		                @tap-nav="handlerTapNav"
		                @double-tap-nav="handlerDoubleTapNav"
		            >
		            </nav-panel-list>
				</dd>
			</dl>
		</div>
		<div class="empty" v-else>
			当前暂无导航数据
		</div>
		<div class="footer" v-show="showTip">
			重置可以恢复默认导航且和客户端同步
		</div>
	</div>
</template>

<script>
	import BaseBack from '@/components/base/base-back'
	import NavPanelList from './nav-panel-list'
	import { mapState, mapActions } from 'vuex'

	function filter(item) {}

	export default {
		name: 'NavPanel',
		components: { BaseBack, NavPanelList },
		data() {
			return {
			}
		},
		computed: {
			...mapState({
			    myChannelList: state => state.myChannelList,
			    allChannelList: state => state.allChannelList
			}),
			showTip() {
				if (
					this.myChannelList.length > 0 ||
					this.allChannelList.length > 0
				) {
					return true
				} else {
					return false
				}
			}
		},
		methods: {
			handlerTapNav(nav, type) {
				this.$router.push({ path: `/video_list/${nav.tag}` })
			},
			handlerDoubleTapNav(nav, type) {
				if (type === 0) { // 处理点击 我的频道
					this.addTagToAllChannelList(nav)
					this.removeTagFromMyChannelList(nav)
				} else if (type === 1) { // 处理点击 全部频道
					this.addTagToMyChannelList(nav)
					this.removeTagFromAllChannelList(nav)
				}
			},
			refreshNav() {
				this.$root.$emit('refresh-all-nav')
			},
			...mapActions([
				'addTagToMyChannelList',
				'removeTagFromMyChannelList',
				'addTagToAllChannelList',
				'removeTagFromAllChannelList',
			])
		}
	}
</script>

<style scoped>
	/* 导航面板 */
	.nav-panel {
		width: 100%;
		min-height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		z-index: 20;
		background: #fff;
	}

	.wrapper {
		position: relative;
		top: 44px;
		left: 0;
	}

	.wrapper dl {
		min-height: 4.8rem;
	}

	.dt-channel {
		height: 44px;
		display: flex;
		align-items: center;
		position: sticky;
		top: 44px;
		background: rgba(255, 255, 255, 1);
		padding-left: 5%;
		font-size: 15px;
		font-weight: bold;
		color: rgb(102, 102, 102);
	}

	.footer {
		height: 44px;
		width: 92%;
		margin-bottom: 20px;
		position: relative;
		left: 4%;
		bottom: -60px;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #fff;
		border-top: 1px solid #eee;
	}

	.empty {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 44px;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>