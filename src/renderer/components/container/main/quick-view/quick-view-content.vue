<template>
	<div class="quick-view-content">
		<div class="header">
			导入视频, 快速查看
		</div>
		<main class="quick-view-main">
			<ul class="ul-list" v-if="arrMedia.length > 0">
				<li v-for="(media, index) in arrMedia" @click="goPlayPage(media)">
					<a href="#"><img :src="media['imgUrl']"></a>
					<p>{{ media['filename'] }}</p>
				</li>
			</ul>
			<div class="empty" v-if="arrMedia.length === 0">
				<p>空空如也</p>
				<div class="course">
					<p>1. 进入设置中心 </p>
					<p>2. 点击 '进入操作页面' 旁边的 'Go' 按钮, 对选择好目录下的视频进行截图</p>
					<p>3. 然后回到 '导入视频,快速查看' 页面</p>
					<p>4. 选择视频资源文件夹内容即可</p>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
    import { loopGeneratImg } from '../../../../../api/api'

	export default {
		name: 'QuickViewContent',
		data() {
			return {
				arrMedia: []
			}
		},
		methods: {
			goPlayPage(media) {
				this.$root.$emit('window-bar-set-last-route-path', this.$route.fullPath)
                this.$router.push({
                	name: 'movie',
                	params: media
                })
			}
		},
		mounted() {
			loopGeneratImg({
				videoResourcePath: 'D:\\迅雷',
				genImgResourcePath: 'D:\\迅雷\\img',
				num: 20,
				delayRequest: 0,
				imgTimeout: 100,
				imgExtName: '.png'
			}).then((data) => {
				console.log('导入视频结果: ', data)
				this.arrMedia = data
			})
		}
	}
</script>

<style scoped>
	.quick-view-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		padding: 0 1% 0 2.5%; /* li含有右边maring的1.5,所以需要减去 */
        overflow: auto;
	}

	.header {
		height: 65px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-size: 15px;
		color: #fff;
	}

	.quick-view-main {
		height: 100%;
		flex-grow: 1;
	}

	.ul-list {
		display: flex;
		flex-wrap: wrap;
	}

	.ul-list li {
		display: block;
		width: 180px;
		margin-right: 1.5%;
		margin-bottom: 3%;
	}

	.ul-list li a {
		display: block;
		width: 100%;
		height: 100px;
		overflow: hidden;
	}

	.ul-list li img {
		transition: all .35s;
		width: 100%;
		height: 100%;
	}

	.ul-list li img:hover {
		transform: scale(1.2);
	}

	.ul-list li p {
		width: 100%;
		max-height: 40px;
		font-size: 13px;
		color: rgba(204,204,204,1);

		overflow: hidden;
		text-overflow: ellipsis;

		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical; /* 多行溢出出现省略号 */

		/*white-space: nowrap;*/ /* 单行溢出出现省略号 */
	}

	/* 内容为空的 样式 */
	.empty {
		width: 98.5%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: rgba(39,45,49,1);
	}

	.empty p {
		margin-bottom: 2%;
		font-size: 16px;
		color: #fff;
	}

	.empty .course p {
		margin-bottom: 2%;
		font-size: 12px;
		color: rgba(153,153,153,1);
	}
</style>