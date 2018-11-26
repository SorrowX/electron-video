<template>
	<transition>
		<div class="qucik-view-setting" v-show="show">
			<div class="back" @click="show=false"></div>
			<div class="main">
				<div class="setting">
					<h2 class="title">导航操作</h2>
					<ul class="nav-list-ul" v-show="navArr.length > 0">
						<li 
						    v-for="(nav, index) in navArr"
						    :key="nav['tag']"
						>
							{{ nav['tag'] }}
							<p>
								<input 
								    type="number" 
								    :value="index + 1"
								    @change="changeHandler(index, $event)" 
								>
								<span @click="updateNav(nav)">修改</span>
								<span @click="delNav(nav)">删除</span>
							</p>
						</li>
					</ul>
					<div v-show="navArr.length === 0" class="tip">
						<p>1. 当前暂无任务导航</p>
						<p>2. 如需添加导航, 请点击加号添加导航</p>
						<p>3. 或者拖入含有视频的目录文件夹</p>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import { 
    	QUICK_VIEW_NAV_SHOW_UI_MESSAGE, 
    	QUICK_VIEW_SETTING_NAV_SHOW_UI_MESSAGE 
    } from '@/constant/index'

	export default {
		name: 'QucikViewSetting',
		data() {
			return {
				show: false
			}
		},
		computed: {
			...mapState('quickView', ['navArr'])
		},
		methods: {
			delNav(nav) {
				this.deleteNavFromNavArr(nav['tag'])
			},
			updateNav(nav) {
				this.$root.$emit(QUICK_VIEW_NAV_SHOW_UI_MESSAGE, true, 'update', nav)
			},
			changeHandler(navIndex, evt) {
				let newIdx = Number(evt.target.value) - 1
				let oldIdx = navIndex
				let navArr = this.navArr
				if (newIdx < 0 || newIdx > navArr.length - 1) {
					evt.target.value = oldIdx + 1
					return
				}
				this.updateNavByIndex({oldIdx, newIdx})
			},
			...mapActions('quickView', ['deleteNavFromNavArr', 'updateNavByIndex'])
		},
		mounted() {
			this.$root.$on(QUICK_VIEW_SETTING_NAV_SHOW_UI_MESSAGE, (bool) => {
                this.show = bool
			})
		}
	}
</script>

<style scoped>
	.qucik-view-setting {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 99;
		overflow: hidden;
		background-color: rgba(52,62,70,.8);
	}

	.main {
		width: 50%;
		height: 60%;
		position: relative;
		border: 1px solid rgba(187,188,189,.3);
		overflow: auto;
		background-color: rgba(52,62,70,.8);
	}

	.setting {
		padding: 6% 10% 0 10%;
	}

	/* 标题设置 */
	.title {
		margin-bottom: 2%;
		text-align: center;
		color: rgba(76,174,80,.8);
		font-weight: 500;
		letter-spacing: 8px;
	}

    /* 导航列表样式 */
	.nav-list-ul li {
        width: 100%;
        height: 28px;
        line-height: 28px;
        padding: 0 30% 0 3%;
        position: relative;
        font-size: 13px;
        color: rgba(76,174,80,.8);
        border-bottom: 1px solid rgba(255,255,255,.1);
        overflow: hidden;
        text-overflow: ellipsis;
	}

	.nav-list-ul li p {
		height: 100%;
		width: 30%;
		position: absolute;
		right: 0;
		top: 0;
		text-align: center;
	}

	.nav-list-ul li span {
		font-size: 12px;
		color: rgba(76,174,80,.6);
	}

	.nav-list-ul li span:hover {
		cursor: pointer;
	}

	/* input 样式 */
	.nav-list-ul li p input {
		width: 50px;
		padding: 1px;
		border: 1px solid rgba(255,255,255,.1);
		background-color: transparent;
		color: rgba(76,174,80,.8);
	}

	/* 提示样式 */
	.tip {
        color: rgba(76,174,80,.8);
	}

	.tip p {
		margin-bottom: 2%;
	}

	/* 返回样式 */
	.back {
		position: absolute;
		left: calc(50% - 14px);
		top: 0;
		width: 0;
	    height: 0;
	    border-left: 14px solid transparent;
	    border-right: 14px solid transparent;
	    border-top: 14px solid rgba(27,34,38,1);
	}
	.back:hover {
		cursor: pointer;
	}
</style>