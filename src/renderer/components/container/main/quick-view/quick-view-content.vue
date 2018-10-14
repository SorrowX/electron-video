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
                this.$router.push({
                	name: 'movie',
                	params: media
                })
			}
		},
		mounted() {
			loopGeneratImg({
				videoResourcePath: 'C:\\Code\\Code\\github\\TScroll\\file-server\\public\\media\\fine-quality\\love',
				genImgResourcePath: 'C:\\Code\\Code\\github\\TScroll\\file-server\\public\\media\\fine-quality\\love\\img',
				num: 2000,
				delayRequest: 0,
				imgTimeout: 0,
				imgExtName: '.jpg',
				errorImgPath: 'http://192.168.11.110:9420/C%3A%5CCode%5CCode%5Cgithub%5CTScroll%5Cfile-server%5Cpublic%5Cmedia%5Cfine-quality%5Clove%5Cimg%2F%E5%A4%8F%E7%9B%AE%E3%81%BF%E3%81%8F.mp4.png'
			}).then((data) => {
				console.log('导入视频结果: ', data)
				this.arrMedia = data
			})
		}
	}
</script>

<style scoped>
	.quick-view-content {
		width: 100%;
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

	.ul-list {
		display: flex;
		flex-wrap: wrap;
	}

	.ul-list li {
		display: block;
		width: 180px;
		margin-right: 1.5%;
		margin-bottom: 3%;
		transition: all .35s;
	}

	.ul-list li:hover {
		transform: scale(1.1);
	}

	.ul-list li a {
		display: block;
		width: 100%;
		height: 100px;
		overflow: hidden;
	}

	.ul-list li img {
		width: 100%;
		height: 100%;
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
</style>