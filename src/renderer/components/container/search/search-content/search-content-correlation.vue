<template>
	<div class="search-content-correlation">
		<div class="correlation">
			<p>搜索相关</p>
			<ul>
				<li 
				    v-for="(media, index) in correlatArr"
				    @click="playVideo(media)"
				>
				    {{ media.filename }}
				</li>
			</ul>
		</div>

		<div class="hot">
			<p>热门搜索</p>
			<ul>
				<li 
				    v-for="(media, index) in hotArr"
				    @click="playVideo(media)"
				>
					<span :class="calcClass(index)">{{ index + 1 }}</span>
				    {{ media.filename }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import CommonMixin from '@/mixin/common-mixin'

	export default {
		name: 'SearchContentCorrelation',
		mixins: [ CommonMixin ],
		data() {
			return {
				correlatArr: [],
				hotArr: []
			}
		},
		methods: {
			async getRenderData() {
				let a = await this.getData()
				let b = await this.getData()
				if (a.length >= 6) {
					a.length = 6
				}
				if (b.length >= 6) {
					b.length = 6
				}
				this.correlatArr = a
				this.hotArr = b
			},
			getData() {
				return new Promise((resolve, reject) => {
					this.getRandomVideoData((data) => {
						return resolve(data)
					})
				})
			},
			calcClass(index) {
				switch(index) {
					case 0:
					    return 'one'
					case 1:
					    return 'two'
				    case 2:
				        return 'three'
				    default: 
				        return ''
				}
			}
		}
	}
</script>

<style scoped>
    .search-content-correlation {
		width: 33.5%;
		overflow: auto;
		padding: 0 2.5%;
		padding-bottom: 52px;
    }

    /* 滚动条控制样式 */
	.search-content-correlation::-webkit-scrollbar {
		display: none;
	}

	.correlation p,
	.hot p {
		margin-top: 32px;
		font-size: 17px;
		color: rgba(204,204,204,1);
	}

	.correlation ul li,
	.hot ul li {
		font-size: 12.5px;
		margin-top: 20px;
		color: rgba(148,148,148,1);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.correlation ul li:hover,
	.hot ul li:hover {
		cursor: pointer;
	}

	.hot ul li span {
		width: 18px;
		height: 18px;
		margin-right: 8px;
		line-height: 18px;
		text-align: center;
		display: inline-block;
		color: rgba(204,204,204,1);
		background: rgba(70,71,74,1);
	}

	.hot>ul>li>.one {
		background-image: linear-gradient(to top left, red, #e01111);
	}

	.hot>ul>li>.two {
		background-image: linear-gradient(to top left, #FF8901, #e01111);
	}

	.hot>ul>li>.three {
		background-image: linear-gradient(to top left, #46443c, #b1910c);
	}
</style>