<template>
	<div class="nav-panel">
		<base-back :title="'导航'" :style="{ position: 'fixed' }"></base-back>
		<div class="wrapper">
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
		computed: mapState({
		    myChannelList: state => state.myChannelList,
		    allChannelList: state => state.allChannelList
		}),
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
		height: auto;
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

	.dt-channel {
		height: 44px;
		display: flex;
		align-items: center;
		position: sticky;
		top: 44px;
		background: rgba(255, 255, 255, .9);
		margin-left: 5%;
		font-size: 15px;
		font-weight: bold;
		color: rgb(102, 102, 102);
	}
</style>