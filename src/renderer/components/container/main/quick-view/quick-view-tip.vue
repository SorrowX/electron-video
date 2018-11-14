<template>
	<div class="quick-view-tip" v-show="show">
		<div class="content">
			<p v-for="(tip, index) in tipArr">
			    {{ index + 1 }}: {{ tip }}
		    </p>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'QuickViewTip',
		props: {
			show: {
				type: Boolean,
				default: false
			},
			tipArr: {
				type: Array,
				default: function() {
					return [
					    '当前暂无导航数据',
					    '请点击右上角的 ‘添加’ 进行添加导航',
					    '导航需要的数据 导航名字, 视频资源文件路径, 图片资源文件路径',
					    '确保图片资源齐全,如无,请进入 ‘设置’ 页面,进行 ‘视频缩略图操作’'
					]
				}
			}
		}
	}
</script>

<style scoped>
	.quick-view-tip {
        flex: 1;
        display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: rgba(39,45,49,.5);
	}

	.content {
		width: 50%;
		height: 60%;
		border: 1px solid rgba(76,174,80,.2);
		padding: 4% 3%;
	}

	.content p {
		margin-bottom: 2%;
		font-size: 13px;
		color: rgba(76,174,80,.8);
	}
</style>