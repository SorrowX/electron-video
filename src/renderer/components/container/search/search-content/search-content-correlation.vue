<template>
	<div class="search-content-correlation">
		<div class="correlation">
			<p>搜索相关</p>
			<ul>
				<li>寻梦环游记</li>
				<li>我能说</li>
				<li>至暗时刻</li>
				<li>勇往直前</li>
				<li>华盛顿邮报</li>
				<li>熊出没之雪岭熊风</li>
			</ul>
		</div>

		<div class="hot">
			<p>热门搜索</p>
			<ul>
				<li>
					<span class="one">1</span>
				    寻梦环游记
				</li>
				<li>
					<span class="two">2</span>
				    我能说
				</li>
				<li>
					<span class="three">3</span>
				    至暗时刻
				</li>
				<li>
					<span>4</span>
				    勇往直前
				</li>
				<li>
					<span>5</span>
				    华盛顿邮报
				</li>
				<li>
					<span>6</span>
				    熊出没之雪岭熊风
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'SearchContentCorrelation'
	}
</script>

<style scoped>
    .search-content-correlation {
		width: 33.5%;
		overflow: auto;
		padding-left: 2.5%;
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