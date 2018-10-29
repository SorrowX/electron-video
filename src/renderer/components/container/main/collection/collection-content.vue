<template>
	<div class="collection-content">
		<div class="collection-list">
			<base-lazy-load-img 
			    mode="default"
		        :time="300"
		        :done="true"
		        :position="{ top: 0, right: 0, bottom: 0, left: 0 }"
			    @success="handleImgSuccess" 
			    @error="handleImgError">
			    <ul>
    				<li v-for="(media, index) in videoCollection" @click="playVideo(media)">
    					<div class="cover">
    						<img :src="defaultBgImg" :data-src="media['genImgPath']" alt="">
    						<span>{{ getTime() }}</span>
    					</div>
    					<p class="title"> {{ media['filename'] }} </p>
    					<p class="tag"> 推荐 </p>
    				</li>
    			</ul>
			</base-lazy-load-img>
		</div>
	</div>
</template>

<script>
	import CommonMixin from '../../../../mixin/common-mixin'
	import BaseLazyLoadImg from '../../../base/base-lazy-load-img'

	export default {
		name: 'CollectionContent',
		components: { BaseLazyLoadImg },
		mixins: [ CommonMixin ],
		methods: {

		}
	}
</script>

<style scoped>
	/* 数据列表 样式 */
	.collection-content {
		flex: 1;
		height: 100%;
		overflow: auto;
		background-color: rgba(27,34,38,1);
	}

	.collection-list {
		padding-top: 22px;
		padding-left: 22px;
		padding-right: 12px;
	}

	.collection-list ul {
		display: flex;
		flex-wrap: wrap;
	}

	.collection-list ul li {
		width: 180px;
		height: 167px;
		margin-right: 10px;
		margin-bottom: 2px;
		overflow: hidden;
		border: 2px solid transparent;
	}

	.collection-list ul li:hover {
		border: 2px solid rgba(49,56,59,.8);
		cursor: pointer;
	}

	.cover {
		width: 100%;
		height: 96px;
		overflow: hidden;
		position: relative;
	}

	.cover img {
		width: 100%;
		height: 100%;
	}

	.cover span {
		width: 55px;
		height: 22px;
		line-height: 22px;
		display: block;
		position: absolute;
		right: 0;
		bottom: 0;
		background-color: rgba(11,190,6,1);
		color: rgba(255,255,255,1);
		text-align: center;
	}

	.collection-list ul li p {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: left;
	}

	.collection-list ul li>.title {
		margin-top: 5px;
		font-size: 13px;
		font-weight: 300;
		color: rgba(204,204,204,1);
	}

	.collection-list ul li>.tag {
		margin-top: 2px;
		font-size: 12px;
		font-weight: 300;
		color: rgba(137,137,138,1);
	}
</style>