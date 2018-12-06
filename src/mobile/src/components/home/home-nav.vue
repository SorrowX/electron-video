<template>
	<div class="nav">
		<div class="nav-box">
			<ul>
				<li class="active">首页</li>
				<li>会员</li>
				<li>直播</li>
				<li>我的剧场</li>
				<li>剧集</li>
				<li>电影</li>
				<li>综艺</li>
				<li>音乐</li>
				<li>动漫</li>
				<li>少儿</li>
				<li>资源</li>
			</ul>
		</div>
		<div class="nav-arrow">
			<i class="nav-arrow-icon"></i>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'HomeNav',
	}
</script>

<style scoped>
	.nav {
		height: 44px;
		padding: 0 0.24rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #fff;
	}

    .nav-box {
    	flex: 1;
    	height: 100%;
    	display: flex;
    	align-items: center;
    	overflow: hidden;
    	overflow-x: auto;
    }
	.nav-box ul {
		/*border: 1px solid red;*/
		display: inline-flex;
	}
	.nav-box ul li {
		flex: none;
		margin: 0 12px;
	}
	.nav-box ul li:nth-child(1) {
		margin-left: 0;
	}
	.active {
		color: #2692FF;
		border-bottom: 2px solid #2692FF;
		font-weight: bold;
	}

	.nav-arrow {
		flex: none;
		width: 44px;
		height: 100%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		/*border: 1px solid green;*/
	}

	.nav-arrow-icon {
		display: flex;
		width: 22px;
		height: 22px;
		background-image: url(../../assets/arrow.png);
		background-size: contain;
	}
</style>