<template>
	<transition>
		<div 
		    v-show="show"
		    @dblclick="show=false"
		    class="quick-view-add-or-update-nav" 
		>
			<div class="main">
				<div class="option">
					<h2 class="title">{{ calcTitleText }}</h2>

					<div class="tag-name">
						<input 
						    v-model.trim="tag" 
						    placeholder="请输入标签名" 
						    type="text" 
						>
						<button type="button" disabled="disabled">Tag 标签名</button>
					</div>

					<div class="video-path">
						<input 
						    v-model.trim="videoDirPath" 
						    placeholder="选择 视频资源文件夹的路径" 
						    type="text" 
						    readonly
						>
						<button @click="setPath('video')">浏览</button>
					</div>

					<div class="image-path">
						<input 
						    v-model.trim="imgDirPath" 
						    placeholder="选择 图片资源文件夹的路径" 
						    type="text" 
						    readonly
						>
						<button @click="setPath('image')">浏览</button>
					</div>

					<div class="add-or-update" @click="commit">
						<button>{{ calcCommitBtnText }}</button>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import { mapState, mapActions } from 'vuex'

	export default {
		name: 'QuickViewAddOrUpdateNav',
		data() {
			return {
				tag: '',
				videoDirPath: '',
				imgDirPath: '',
				show: false,
				operateType: 'add' // 操作类型 add|update
			}
		},
		computed: {
			calcTitleText() {
				return this.operateType === 'add' ? '添加导航' : '修改导航'
			},
			calcCommitBtnText() {
				return this.operateType === 'add' ? '添加' : '修改'
			}
		},
		methods: {
			initData(bool, operateType, nav) {
				this.show = bool
				this.operateType = operateType
				if (nav) {
					this.oldTag = this.tag = nav['tag']
					this.videoDirPath = nav['videoDirPath']
					this.imgDirPath = nav['imgDirPath']
				} else {
					this.tag = this.videoDirPath = this.imgDirPath = ''
				}
			},
			setPath(type) {
				let title = '选择路径', self = this
				type = type || 'video'
				const { dialog } = require('electron').remote
				dialog.showOpenDialog(
				    {
				        title,
				        properties: ['openDirectory', 'promptToCreate '],
				        filters: [
                            { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
					        { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] }
                        ]
				    },
				    function (filePath) {
				        if (type === 'video') {
				        	self.videoDirPath = filePath[0]
				        } else if (type === 'image') {
				        	self.imgDirPath = filePath[0]
				        }
				    }
				)
			},
			commit() {
				if (
					!this.tag || 
					!this.videoDirPath || 
					!this.imgDirPath
				) {
					alert('需要填写完整,才能提交!')
					return
				}

				let nav = {
					tag: this.tag,
					videoDirPath: this.videoDirPath,
					imgDirPath: this.imgDirPath
				}

				if (this.operateType === 'add') {
					this.addNavToNavArr(nav)
					this.$emit('update-quick-view-main-content', nav)
				} else {
					this.updateNav(Object.assign({
						oldTag: this.oldTag
					}, nav))
					this.$emit('update-quick-view-main-content', nav)
				}

				this.show = false
			},
			...mapActions('quickView', ['addNavToNavArr', 'updateNav'])
		},
		mounted() {
			// 监听 quick-view-nav.vue 组件发来的消息(是否显示该组件)
			this.$root.$on('quick-view-nav-show-ui', (bool, operateType, nav) => {
                this.initData(bool, operateType, nav)
			})
		}
	}
</script>

<style scoped>
	.quick-view-add-or-update-nav {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 100;
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

	.option {
		padding: 6% 10% 0 10%;
	}

	.option>div {
		margin-bottom: 5%;
	}

	/* 标题设置 */
	.title {
		margin-bottom: 10%;
		text-align: center;
		color: rgba(76,174,80,.8);
		font-weight: 500;
	}

	/* 路径选择 样式 */
	.tag-name,
	.video-path,
	.image-path {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.tag-name input,
	.video-path input,
	.image-path input {
		width: 75%;
		height: 24px;
		padding-left: 2%;
		border: none;
		outline: none;
		font-size: 10px;
		color: #fff;
		background-color: rgba(187,188,189,.2);
	}

	.tag-name input::-webkit-input-placeholder,
	.video-path input::-webkit-input-placeholder,
	.image-path input::-webkit-input-placeholder {
		color: rgba(76,174,80,.8);
	}

	.tag-name button,
	.video-path button,
	.image-path button {
		width: 20%;
		height: 24px;
		outline-color: rgba(187,188,189,1);
		border: none;
		font-size: 10px;
		border-radius: 3px;
		color: #ccc;
		background-color: rgba(76,174,80,1);
	}

	.tag-name button {
		cursor: default;
	}

	/* 添加或修改 按钮 样式 */
	.add-or-update {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 5%;
	}

	.add-or-update button {
		height: 24px;
		width: 55%;
		outline-color: rgba(187,188,189,1);
		border: none;
		font-size: 10px;
		border-radius: 3px;
		color: #ccc;
		background-color: rgba(76,174,80,.5);
	}
</style>